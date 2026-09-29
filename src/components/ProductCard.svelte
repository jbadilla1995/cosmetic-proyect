<script>
  import { appState } from '../lib/appState.svelte.js';
  import { ShoppingBag, Eye, Sparkles, Check, AlertCircle, Edit3 } from 'lucide-svelte';

  let { product } = $props();

  function getStockStatus(stock) {
    if (stock <= 0) return { label: 'Agotado en Almacén', class: 'stock-low', canBuy: false };
    if (stock <= 5) return { label: `¡Solo ${stock} en almacén!`, class: 'stock-medium', canBuy: true };
    return { label: `${stock} disponibles en almacén`, class: 'stock-high', canBuy: true };
  }

  let stockInfo = $derived(getStockStatus(product.stock));

  function handleAddToCart(e) {
    e.stopPropagation();
    appState.addToCart(product, 1);
  }

  function handleOpenDetail() {
    appState.openProductDetail(product);
  }

  function handleEditAdmin(e) {
    e.stopPropagation();
    appState.selectedProduct = product;
    appState.isAdminOpen = true;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<article class="product-card" onclick={handleOpenDetail}>
  <!-- Contenedor de Imagen -->
  <div class="card-image-wrap">
    <img 
      src={product.imageUrl} 
      alt={product.name} 
      class="product-image" 
      loading="lazy" 
      onerror={(e) => { e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'; }}
    />
    
    <!-- Badges flotantes -->
    <div class="image-overlay-top">
      {#if product.isFeatured}
        <span class="badge-featured font-cursive">
          <Sparkles size={13} /> Favorito
        </span>
      {:else}
        <span></span>
      {/if}

      <!-- Indicador de almacén -->
      <span class="stock-badge {stockInfo.class}">
        <span class="stock-dot"></span>
        {stockInfo.label}
      </span>
    </div>

    <!-- Botón rápido ver detalle -->
    <div class="hover-action">
      <button class="quick-view-btn" onclick={(e) => { e.stopPropagation(); handleOpenDetail(); }} title="Ver descripción y fórmula">
        <Eye size={16} /> Ver Fórmula & Detalles
      </button>
    </div>
  </div>

  <!-- Contenido de la Tarjeta -->
  <div class="card-body">
    <!-- Categoría -->
    <div class="product-meta">
      <span class="category-name">{product.catalogSlug ? product.catalogSlug.replace('-', ' ').toUpperCase() : 'COSMÉTICA'}</span>
      <div class="rating-stars">★★★★★ <span>({product.rating || '5.0'})</span></div>
    </div>

    <!-- Nombre del producto -->
    <h3 class="product-name">{product.name}</h3>

    <!-- LEYENDA OBLIGATORIA: ¿Por qué sirve? -->
    <div class="benefit-box">
      <div class="benefit-header">
        <span class="benefit-title font-cursive">¿Por qué te encantará?</span>
      </div>
      <p class="benefit-text">
        {product.benefitLegend}
      </p>
    </div>

    <!-- Ingredientes destacados resumidos -->
    {#if product.ingredients}
      <div class="ingredients-hint">
        <strong>Fórmula:</strong> {product.ingredients}
      </div>
    {/if}

    <!-- Pie de tarjeta: Costo, Stock en Almacén y Botón de Compra -->
    <div class="card-footer">
      <div class="price-block">
        <span class="price-label">Costo:</span>
        <span class="price-amount">${Number(product.cost).toFixed(2)}</span>
      </div>

      <div class="actions-block">
        {#if appState.currentUser}
          <button 
            class="admin-edit-badge" 
            onclick={handleEditAdmin} 
            title="Editar en Panel Admin"
          >
            <Edit3 size={15} />
          </button>
        {/if}

        <button 
          class="btn-primary buy-btn" 
          onclick={handleAddToCart}
          disabled={!stockInfo.canBuy}
          title={stockInfo.canBuy ? 'Agregar a la bolsa' : 'Sin existencias en almacén'}
        >
          <ShoppingBag size={17} />
          <span>{stockInfo.canBuy ? 'Añadir' : 'Agotado'}</span>
        </button>
      </div>
    </div>
  </div>
</article>

<style>
  .product-card {
    background: #FFFFFF;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-delicate);
    box-shadow: 0 4px 18px rgba(244, 135, 164, 0.08);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: var(--transition-smooth);
    position: relative;
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 30px rgba(244, 135, 164, 0.18);
    border-color: var(--pink-300);
  }

  .card-image-wrap {
    position: relative;
    width: 100%;
    height: 240px;
    background-color: var(--pink-50);
    overflow: hidden;
  }

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .product-card:hover .product-image {
    transform: scale(1.06);
  }

  .image-overlay-top {
    position: absolute;
    top: 12px;
    left: 12px;
    right: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
    z-index: 2;
  }

  .badge-featured {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(255, 255, 255, 0.95);
    color: var(--pink-600);
    padding: 3px 12px;
    border-radius: var(--radius-full);
    font-size: 1.05rem;
    font-weight: 700;
    box-shadow: var(--shadow-sm);
  }

  .stock-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
    display: inline-block;
  }

  .hover-action {
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    opacity: 0;
    transform: translateY(10px);
    transition: var(--transition-smooth);
    z-index: 3;
  }

  .product-card:hover .hover-action {
    opacity: 1;
    transform: translateY(0);
  }

  .quick-view-btn {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(4px);
    border: 1px solid var(--pink-200);
    color: var(--pink-700);
    font-size: 0.82rem;
    font-weight: 600;
    padding: 8px 18px;
    border-radius: var(--radius-full);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: var(--transition-smooth);
  }

  .quick-view-btn:hover {
    background-color: var(--pink-500);
    color: #FFFFFF;
    border-color: var(--pink-500);
  }

  .card-body {
    padding: 20px 20px 18px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .product-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .category-name {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--pink-500);
  }

  .rating-stars {
    color: #F6AD55;
    font-size: 0.8rem;
  }

  .rating-stars span {
    color: var(--text-muted);
    font-size: 0.72rem;
  }

  .product-name {
    font-family: var(--font-serif);
    font-size: 1.15rem;
    color: var(--text-dark);
    line-height: 1.3;
    margin-bottom: 12px;
  }

  /* Cuadro estilizado de Leyenda / Por qué sirve */
  .benefit-box {
    background-color: var(--pink-50);
    border: 1px dashed var(--pink-200);
    border-radius: var(--radius-md);
    padding: 10px 12px;
    margin-bottom: 12px;
  }

  .benefit-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
  }

  .benefit-title {
    color: var(--pink-600);
    font-size: 1.15rem;
    font-weight: 700;
    line-height: 1;
  }

  .benefit-text {
    font-size: 0.83rem;
    color: var(--text-body);
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .ingredients-hint {
    font-size: 0.76rem;
    color: var(--text-muted);
    margin-bottom: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .ingredients-hint strong {
    color: var(--text-dark);
  }

  /* Pie de tarjeta */
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid var(--border-delicate);
  }

  .price-block {
    display: flex;
    flex-direction: column;
  }

  .price-label {
    font-size: 0.72rem;
    color: var(--text-muted);
    text-transform: uppercase;
    font-weight: 600;
  }

  .price-amount {
    font-family: var(--font-serif);
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--pink-600);
    line-height: 1.1;
  }

  .actions-block {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .admin-edit-badge {
    background-color: var(--pink-100);
    border: 1px solid var(--pink-300);
    color: var(--pink-700);
    padding: 7px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-smooth);
  }

  .admin-edit-badge:hover {
    background-color: var(--pink-200);
    transform: scale(1.08);
  }

  .buy-btn {
    padding: 8px 16px;
    font-size: 0.88rem;
  }
</style>
