<script>
  import { appState } from '../lib/appState.svelte.js';
  import { PRESET_IMAGE_SUGGESTIONS } from '../lib/seedData.js';
  import { 
    X, ShieldCheck, Plus, Package, Layers, 
    Trash2, Edit, Save, RotateCcw, Check, Sparkles, AlertCircle 
  } from 'lucide-svelte';

  let activeTab = $state('products'); // 'products' | 'catalogs'

  // Formulario Producto
  let editingProductId = $state(null);
  let prodName = $state('');
  let prodCatalogId = $state('');
  let prodBenefitLegend = $state('');
  let prodIngredients = $state('');
  let prodCost = $state(25.00);
  let prodStock = $state(20);
  let prodImageUrl = $state(PRESET_IMAGE_SUGGESTIONS[0].url);
  let prodIsFeatured = $state(false);

  // Formulario Catálogo
  let catName = $state('');
  let catSlug = $state('');
  let catIcon = $state('🌸');
  let catBadge = $state('');
  let catDescription = $state('');

  // Sincronizar catálogo inicial si no está seleccionado
  $effect(() => {
    if (appState.catalogs.length > 0 && !prodCatalogId) {
      prodCatalogId = appState.catalogs[0].id;
    }
  });

  // Si se seleccionó un producto para editar desde fuera
  $effect(() => {
    if (appState.selectedProduct && !editingProductId) {
      startEditProduct(appState.selectedProduct);
    }
  });

  function startEditProduct(product) {
    editingProductId = product.id;
    prodName = product.name;
    prodCatalogId = product.catalogId;
    prodBenefitLegend = product.benefitLegend;
    prodIngredients = product.ingredients || '';
    prodCost = product.cost;
    prodStock = product.stock;
    prodImageUrl = product.imageUrl;
    prodIsFeatured = Boolean(product.isFeatured);
    activeTab = 'products';
  }

  function resetProductForm() {
    editingProductId = null;
    prodName = '';
    prodCatalogId = appState.catalogs[0]?.id || '';
    prodBenefitLegend = '';
    prodIngredients = '';
    prodCost = 25.00;
    prodStock = 20;
    prodImageUrl = PRESET_IMAGE_SUGGESTIONS[0].url;
    prodIsFeatured = false;
  }

  async function handleSaveProduct(e) {
    e.preventDefault();
    if (!prodName.trim() || !prodBenefitLegend.trim()) {
      appState.showToast('Completa el nombre y la leyenda del producto.', 'warning');
      return;
    }

    const currentCatalog = appState.catalogs.find(c => c.id === prodCatalogId) || appState.catalogs[0];
    const payload = {
      name: prodName.trim(),
      catalogId: currentCatalog?.id,
      catalogSlug: currentCatalog?.slug,
      benefitLegend: prodBenefitLegend.trim(),
      ingredients: prodIngredients.trim(),
      cost: Number(prodCost),
      stock: Number(prodStock),
      imageUrl: prodImageUrl.trim() || PRESET_IMAGE_SUGGESTIONS[0].url,
      isFeatured: prodIsFeatured
    };

    if (editingProductId) {
      await appState.updateProduct(editingProductId, payload);
    } else {
      await appState.createProduct(payload);
    }
    resetProductForm();
  }

  async function handleDeleteProduct(id, name) {
    if (confirm(`¿Estás segura de eliminar el cosmético "${name}" del almacén?`)) {
      await appState.deleteProduct(id);
      if (editingProductId === id) {
        resetProductForm();
      }
    }
  }

  async function handleQuickStock(productId, delta) {
    const prod = appState.products.find(p => p.id === productId);
    if (!prod) return;
    const newStock = Math.max(0, prod.stock + delta);
    await appState.updateProduct(productId, { stock: newStock });
  }

  // Guardar catálogo
  async function handleSaveCatalog(e) {
    e.preventDefault();
    if (!catName.trim()) {
      appState.showToast('El nombre del catálogo es requerido.', 'warning');
      return;
    }

    const payload = {
      name: catName.trim(),
      slug: catSlug.trim() || catName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      icon: catIcon.trim() || '🌸',
      badge: catBadge.trim(),
      description: catDescription.trim(),
      displayOrder: appState.catalogs.length + 1
    };

    await appState.createCatalog(payload);
    catName = '';
    catSlug = '';
    catIcon = '🌸';
    catBadge = '';
    catDescription = '';
  }

  async function handleDeleteCatalog(id, name) {
    if (confirm(`¿Eliminar el catálogo "${name}"? Los productos asociados permanecerán en el inventario.`)) {
      await appState.deleteCatalog(id);
    }
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) {
      appState.isAdminOpen = false;
    }
  }
</script>

{#if appState.isAdminOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-backdrop" onclick={handleBackdrop}>
    <div class="modal-content admin-modal-wrap" role="dialog" aria-modal="true">
      <!-- Encabezado del Panel -->
      <div class="admin-top-bar">
        <div class="admin-title-group">
          <div class="super-shield">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 class="admin-main-title">Panel de Super Usuario</h2>
            <div class="admin-badge-sub font-cursive">
              Carga & Control de Cosméticos Laysla
            </div>
          </div>
        </div>

        <div class="admin-header-actions">
          <button class="logout-btn" onclick={() => appState.logout()} title="Cerrar sesión de Super Usuario">
            Cerrar Sesión
          </button>
          <button class="close-admin-btn" onclick={() => appState.isAdminOpen = false} aria-label="Cerrar panel">
            <X size={20} />
          </button>
        </div>
      </div>

      <!-- Navegación por pestañas -->
      <div class="admin-tabs">
        <button 
          class="tab-btn {activeTab === 'products' ? 'active' : ''}" 
          onclick={() => activeTab = 'products'}
        >
          <Package size={17} />
          <span>Gestión de Productos ({appState.products.length})</span>
        </button>

        <button 
          class="tab-btn {activeTab === 'catalogs' ? 'active' : ''}" 
          onclick={() => activeTab = 'catalogs'}
        >
          <Layers size={17} />
          <span>Gestión de Catálogos ({appState.catalogs.length})</span>
        </button>
      </div>

      <div class="admin-body">
        <!-- ============================================================ -->
        <!-- PESTAÑA 1: GESTIÓN DE PRODUCTOS -->
        <!-- ============================================================ -->
        {#if activeTab === 'products'}
          <div class="products-tab-layout">
            <!-- Formulario para Cargar / Modificar Producto -->
            <div class="product-form-card">
              <div class="form-title-row">
                <h3 class="form-card-title">
                  {editingProductId ? '✏️ Modificar Cosmético' : '🌸 Cargar Nuevo Producto'}
                </h3>
                {#if editingProductId}
                  <button class="cancel-edit-btn" onclick={resetProductForm}>
                    Cancelar edición
                  </button>
                {/if}
              </div>

              <form onsubmit={handleSaveProduct} class="admin-grid-form">
                <!-- Nombre y Catálogo -->
                <div class="form-row-2">
                  <div class="form-group">
                    <label class="form-label" for="p-name">Nombre del Producto *</label>
                    <input 
                      id="p-name"
                      type="text" 
                      class="form-input" 
                      placeholder="Ej. Serum Iluminador de Peonías"
                      bind:value={prodName}
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="p-cat">Catálogo / Categoría *</label>
                    <select id="p-cat" class="form-select" bind:value={prodCatalogId} required>
                      {#each appState.catalogs as cat}
                        <option value={cat.id}>{cat.icon} {cat.name}</option>
                      {/each}
                    </select>
                  </div>
                </div>

                <!-- LEYENDA OBLIGATORIA: ¿Por qué sirve? -->
                <div class="form-group">
                  <label class="form-label" for="p-legend">
                    Leyenda: ¿Para qué sirve? (Beneficios explicados) *
                  </label>
                  <textarea 
                    id="p-legend"
                    class="form-textarea" 
                    placeholder="Explica a tus clientas por qué este producto es ideal, cómo beneficia la piel o realza su belleza..."
                    bind:value={prodBenefitLegend}
                    rows="3"
                    required
                  ></textarea>
                </div>

                <!-- Costo y Cantidad en Almacén -->
                <div class="form-row-2">
                  <div class="form-group">
                    <label class="form-label" for="p-cost">Costo / Precio ($ USD) *</label>
                    <input 
                      id="p-cost"
                      type="number" 
                      step="0.01" 
                      min="0"
                      class="form-input" 
                      bind:value={prodCost}
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="p-stock">Cantidad en Almacén (Stock) *</label>
                    <input 
                      id="p-stock"
                      type="number" 
                      min="0"
                      class="form-input" 
                      bind:value={prodStock}
                      required
                    />
                  </div>
                </div>

                <!-- Ingredientes Clave -->
                <div class="form-group">
                  <label class="form-label" for="p-ingredients">Ingredientes Clave o Modo de Empleo</label>
                  <input 
                    id="p-ingredients"
                    type="text" 
                    class="form-input" 
                    placeholder="Ej. Ácido Hialurónico, Extracto de Rosa de Damasco, Niacinamida"
                    bind:value={prodIngredients}
                  />
                </div>

                <!-- URL de Imagen & Presets estéticos -->
                <div class="form-group">
                  <label class="form-label" for="p-img">URL de Imagen del Producto</label>
                  <input 
                    id="p-img"
                    type="url" 
                    class="form-input" 
                    placeholder="https://images.unsplash.com/..."
                    bind:value={prodImageUrl}
                    required
                  />

                  <!-- Presets rápidos estéticos -->
                  <div class="presets-container">
                    <span class="presets-label">Fotos de alta resolución recomendadas:</span>
                    <div class="preset-chips">
                      {#each PRESET_IMAGE_SUGGESTIONS as preset}
                        <button 
                          type="button" 
                          class="preset-chip {prodImageUrl === preset.url ? 'active' : ''}"
                          onclick={() => prodImageUrl = preset.url}
                        >
                          {preset.label}
                        </button>
                      {/each}
                    </div>
                  </div>
                </div>

                <!-- Destacado -->
                <div class="form-checkbox-row">
                  <label class="checkbox-label">
                    <input type="checkbox" bind:checked={prodIsFeatured} />
                    <span>Marcar como cosmético favorito destacado en portada</span>
                  </label>
                </div>

                <div class="form-submit-row">
                  <button type="submit" class="btn-primary" style="width: 100%;">
                    <Save size={18} />
                    <span>{editingProductId ? 'Guardar Cambios del Cosmético' : 'Publicar Cosmético en el Catálogo'}</span>
                  </button>
                </div>
              </form>
            </div>

            <!-- Tabla de inventario actual -->
            <div class="products-inventory-list">
              <div class="inventory-header">
                <h3 class="inventory-title">Inventario en Almacén ({appState.products.length})</h3>
                <button class="reset-link" onclick={() => appState.resetDemoData()} title="Restaurar productos y catálogos iniciales">
                  <RotateCcw size={14} /> Restaurar Semilla
                </button>
              </div>

              <div class="table-responsive">
                <table class="inventory-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Catálogo</th>
                      <th>Costo</th>
                      <th>En Almacén</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {#each appState.products as p (p.id)}
                      <tr class="{editingProductId === p.id ? 'row-editing' : ''}">
                        <td>
                          <div class="table-prod-info">
                            <img 
                              src={p.imageUrl} 
                              alt={p.name} 
                              class="table-thumb" 
                              onerror={(e) => { e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'; }}
                            />
                            <div>
                              <div class="table-name">{p.name}</div>
                              <div class="table-legend-snippet">{p.benefitLegend}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span class="badge-pill badge-pink">{p.catalogSlug || 'General'}</span>
                        </td>
                        <td class="font-serif cost-cell">${Number(p.cost).toFixed(2)}</td>
                        <td>
                          <!-- Control rápido de stock -->
                          <div class="stock-quick-controls">
                            <button class="stock-mini-btn" onclick={() => handleQuickStock(p.id, -1)} aria-label="Restar">-</button>
                            <span class="stock-val-display {p.stock <= 5 ? 'low' : ''}">{p.stock}</span>
                            <button class="stock-mini-btn" onclick={() => handleQuickStock(p.id, 1)} aria-label="Sumar">+</button>
                          </div>
                        </td>
                        <td>
                          <div class="table-actions">
                            <button 
                              class="table-btn edit" 
                              onclick={() => startEditProduct(p)}
                              title="Editar producto"
                            >
                              <Edit size={15} />
                            </button>
                            <button 
                              class="table-btn delete" 
                              onclick={() => handleDeleteProduct(p.id, p.name)}
                              title="Eliminar producto"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        {/if}

        <!-- ============================================================ -->
        <!-- PESTAÑA 2: GESTIÓN DE CATÁLOGOS -->
        <!-- ============================================================ -->
        {#if activeTab === 'catalogs'}
          <div class="catalogs-tab-layout">
            <!-- Formulario para Cargar Catálogo -->
            <div class="catalog-form-box">
              <h3 class="form-card-title">🌸 Agregar Nuevo Catálogo / Sección</h3>
              <p class="form-card-sub">Crea categorías para organizar tus productos (ej. Cuidado Facial, Labiales, Fragancias...)</p>

              <form onsubmit={handleSaveCatalog} class="catalog-form">
                <div class="form-row-3">
                  <div class="form-group" style="flex: 2;">
                    <label class="form-label" for="c-name">Nombre del Catálogo *</label>
                    <input 
                      id="c-name"
                      type="text" 
                      class="form-input" 
                      placeholder="Ej. Tratamientos Anti-Edad"
                      bind:value={catName}
                      required
                    />
                  </div>

                  <div class="form-group" style="flex: 1;">
                    <label class="form-label" for="c-icon">Icono / Emoji</label>
                    <input 
                      id="c-icon"
                      type="text" 
                      class="form-input" 
                      placeholder="🌸"
                      bind:value={catIcon}
                    />
                  </div>

                  <div class="form-group" style="flex: 1;">
                    <label class="form-label" for="c-badge">Insignia (Opcional)</label>
                    <input 
                      id="c-badge"
                      type="text" 
                      class="form-input" 
                      placeholder="Nuevo, Spa..."
                      bind:value={catBadge}
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label" for="c-desc">Descripción del Catálogo</label>
                  <textarea 
                    id="c-desc"
                    class="form-textarea" 
                    placeholder="Breve reseña sobre qué cosméticos agrupa este catálogo..."
                    bind:value={catDescription}
                    rows="2"
                  ></textarea>
                </div>

                <button type="submit" class="btn-primary">
                  <Plus size={18} />
                  <span>Crear y Publicar Catálogo</span>
                </button>
              </form>
            </div>

            <!-- Listado de Catálogos Existentes -->
            <div class="catalogs-grid">
              {#each appState.catalogs as cat (cat.id)}
                {@const prodCount = appState.products.filter(p => p.catalogSlug === cat.slug || p.catalogId === cat.id).length}
                <div class="catalog-manage-card">
                  <div class="cat-card-header">
                    <span class="cat-card-icon">{cat.icon || '🌸'}</span>
                    {#if cat.badge}
                      <span class="badge-pill badge-pink font-cursive">{cat.badge}</span>
                    {/if}
                  </div>
                  <h4 class="cat-card-name">{cat.name}</h4>
                  <p class="cat-card-desc">{cat.description || 'Sin descripción asignada.'}</p>
                  
                  <div class="cat-card-footer">
                    <span class="cat-count-pill">{prodCount} cosméticos</span>
                    <button 
                      class="table-btn delete" 
                      onclick={() => handleDeleteCatalog(cat.id, cat.name)}
                      title="Eliminar catálogo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .admin-modal-wrap {
    max-width: 1100px;
    height: 92vh;
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  .admin-top-bar {
    padding: 18px 26px;
    background: linear-gradient(135deg, #FFF5F7 0%, #FFEBF1 100%);
    border-bottom: 1px solid var(--pink-200);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .admin-title-group {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .super-shield {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FBAEC2 0%, #E65A84 100%);
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(230, 90, 132, 0.3);
  }

  .admin-main-title {
    font-family: var(--font-serif);
    font-size: 1.4rem;
    color: var(--text-dark);
    line-height: 1.1;
  }

  .admin-badge-sub {
    font-size: 1.15rem;
    color: var(--pink-600);
    font-weight: 700;
  }

  .admin-header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logout-btn {
    background: #FFFFFF;
    border: 1px solid var(--pink-200);
    color: var(--pink-600);
    padding: 7px 16px;
    border-radius: var(--radius-full);
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .logout-btn:hover {
    background-color: var(--pink-100);
  }

  .close-admin-btn {
    background: #FFFFFF;
    border: 1px solid var(--pink-200);
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    cursor: pointer;
  }

  .close-admin-btn:hover {
    background-color: var(--pink-100);
    color: var(--pink-600);
  }

  .admin-tabs {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-delicate);
    padding: 0 24px;
    background-color: #FFFFFF;
    overflow-x: auto;
  }

  .tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 20px;
    background: none;
    border: none;
    border-bottom: 2.5px solid transparent;
    font-family: var(--font-sans);
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-muted);
    cursor: pointer;
    white-space: nowrap;
    transition: var(--transition-smooth);
  }

  .tab-btn:hover {
    color: var(--pink-600);
  }

  .tab-btn.active {
    color: var(--pink-600);
    border-bottom-color: var(--pink-500);
  }

  .admin-body {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    background-color: var(--bg-secondary);
  }

  /* Layout de pestaña productos */
  .products-tab-layout {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .product-form-card {
    background: #FFFFFF;
    border: 1px solid var(--pink-200);
    border-radius: var(--radius-lg);
    padding: 24px;
    box-shadow: var(--shadow-sm);
  }

  .form-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-delicate);
  }

  .form-card-title {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    color: var(--text-dark);
  }

  .cancel-edit-btn {
    background: var(--pink-50);
    border: 1px solid var(--pink-200);
    color: var(--pink-600);
    padding: 5px 12px;
    border-radius: var(--radius-full);
    font-size: 0.8rem;
    cursor: pointer;
  }

  .form-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .form-row-3 {
    display: flex;
    gap: 16px;
  }

  .presets-container {
    margin-top: 8px;
  }

  .presets-label {
    font-size: 0.74rem;
    color: var(--text-muted);
    display: block;
    margin-bottom: 4px;
  }

  .preset-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .preset-chip {
    background: var(--pink-50);
    border: 1px solid var(--pink-200);
    border-radius: var(--radius-full);
    padding: 4px 10px;
    font-size: 0.74rem;
    color: var(--pink-700);
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .preset-chip:hover, .preset-chip.active {
    background: var(--pink-200);
    border-color: var(--pink-400);
  }

  .form-checkbox-row {
    margin-bottom: 16px;
  }

  .checkbox-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.86rem;
    color: var(--text-dark);
    cursor: pointer;
  }

  /* Inventario */
  .products-inventory-list {
    background: #FFFFFF;
    border: 1px solid var(--pink-200);
    border-radius: var(--radius-lg);
    padding: 24px;
    box-shadow: var(--shadow-sm);
  }

  .inventory-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .inventory-title {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    color: var(--text-dark);
  }

  .reset-link {
    background: none;
    border: 1px dashed var(--pink-300);
    color: var(--pink-600);
    padding: 5px 12px;
    border-radius: var(--radius-full);
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .reset-link:hover {
    background-color: var(--pink-50);
  }

  .table-responsive {
    overflow-x: auto;
  }

  .inventory-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.88rem;
  }

  .inventory-table th {
    text-align: left;
    padding: 10px 12px;
    font-size: 0.78rem;
    text-transform: uppercase;
    color: var(--text-muted);
    border-bottom: 1.5px solid var(--border-delicate);
  }

  .inventory-table td {
    padding: 12px;
    border-bottom: 1px solid var(--pink-100);
    vertical-align: middle;
  }

  .row-editing {
    background-color: var(--pink-50);
  }

  .table-prod-info {
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 320px;
  }

  .table-thumb {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-sm);
    object-fit: cover;
    border: 1px solid var(--pink-200);
    flex-shrink: 0;
  }

  .table-name {
    font-weight: 600;
    color: var(--text-dark);
    line-height: 1.2;
  }

  .table-legend-snippet {
    font-size: 0.74rem;
    color: var(--text-muted);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .cost-cell {
    font-weight: 700;
    color: var(--pink-600);
    font-size: 1.05rem;
  }

  .stock-quick-controls {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--pink-50);
    padding: 3px 8px;
    border-radius: var(--radius-full);
    border: 1px solid var(--pink-200);
  }

  .stock-mini-btn {
    background: #FFFFFF;
    border: 1px solid var(--pink-200);
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--pink-600);
    cursor: pointer;
  }

  .stock-val-display {
    font-weight: 700;
    min-width: 24px;
    text-align: center;
  }

  .stock-val-display.low {
    color: var(--stock-red);
  }

  .table-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .table-btn {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--pink-200);
    background: #FFFFFF;
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .table-btn.edit {
    color: var(--pink-600);
  }

  .table-btn.edit:hover {
    background: var(--pink-100);
  }

  .table-btn.delete {
    color: var(--stock-red);
  }

  .table-btn.delete:hover {
    background: var(--stock-red-bg);
  }

  /* Catálogos tab */
  .catalogs-tab-layout {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .catalog-form-box {
    background: #FFFFFF;
    border: 1px solid var(--pink-200);
    border-radius: var(--radius-lg);
    padding: 24px;
    box-shadow: var(--shadow-sm);
  }

  .form-card-sub {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 16px;
  }

  .catalogs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .catalog-manage-card {
    background: #FFFFFF;
    border: 1px solid var(--pink-200);
    border-radius: var(--radius-md);
    padding: 18px;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-sm);
  }

  .cat-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .cat-card-icon {
    font-size: 1.5rem;
  }

  .cat-card-name {
    font-family: var(--font-serif);
    font-size: 1.15rem;
    color: var(--text-dark);
    margin-bottom: 4px;
  }

  .cat-card-desc {
    font-size: 0.82rem;
    color: var(--text-muted);
    line-height: 1.4;
    margin-bottom: 16px;
    flex: 1;
  }

  .cat-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid var(--pink-100);
  }

  .cat-count-pill {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--pink-600);
    background: var(--pink-50);
    padding: 3px 10px;
    border-radius: var(--radius-full);
  }

  @media (max-width: 860px) {
    .form-row-2, .form-row-3 {
      grid-template-columns: 1fr;
      flex-direction: column;
    }
  }
</style>
