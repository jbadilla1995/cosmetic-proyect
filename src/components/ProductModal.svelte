<script>
  import { appState } from '../lib/appState.svelte.js';
  import { X, ShoppingBag, Sparkles, Check, Package, ShieldCheck, Heart } from 'lucide-svelte';

  let quantity = $state(1);

  let product = $derived(appState.selectedProduct);

  function increment() {
    if (product && quantity < product.stock) {
      quantity++;
    }
  }

  function decrement() {
    if (quantity > 1) {
      quantity--;
    }
  }

  function handleAddToCart() {
    if (product) {
      appState.addToCart(product, quantity);
      appState.closeProductDetail();
      quantity = 1;
    }
  }

  function closeOnBackdrop(e) {
    if (e.target === e.currentTarget) {
      appState.closeProductDetail();
      quantity = 1;
    }
  }
</script>

{#if appState.isDetailOpen && product}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-backdrop" onclick={closeOnBackdrop}>
    <div class="modal-content product-modal-wrap" role="dialog" aria-modal="true">
      <!-- Botón de Cerrar -->
      <button class="modal-close-btn" onclick={() => { appState.closeProductDetail(); quantity = 1; }} aria-label="Cerrar ventana">
        <X size={20} />
      </button>

      <div class="modal-grid">
        <!-- Columna Izquierda: Imagen del Producto -->
        <div class="modal-gallery">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            class="modal-main-img" 
            onerror={(e) => { e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'; }}
          />
          <div class="modal-badges-float">
            {#if product.isFeatured}
              <span class="badge-featured font-cursive">
                <Sparkles size={14} /> Colección Exclusiva
              </span>
            {/if}
          </div>
        </div>

        <!-- Columna Derecha: Información Completa -->
        <div class="modal-details">
          <div class="modal-category">
            <span>{product.catalogSlug ? product.catalogSlug.replace('-', ' ').toUpperCase() : 'COSMÉTICO'}</span>
            <div class="stars">★★★★★ <span>({product.rating || '5.0'})</span></div>
          </div>

          <h2 class="modal-product-title">{product.name}</h2>

          <!-- PRECIO Y DISPONIBILIDAD EN ALMACÉN -->
          <div class="price-stock-banner">
            <div class="price-col">
              <span class="sub-label">Costo unitario</span>
              <span class="price-highlight">${Number(product.cost).toFixed(2)}</span>
            </div>

            <div class="stock-col">
              <span class="sub-label">Cantidad en Almacén</span>
              <div class="stock-indicator">
                <Package size={17} class="package-icon" />
                <span class="stock-number">
                  {#if product.stock > 0}
                    <strong>{product.stock}</strong> unidades disponibles
                  {:else}
                    <strong style="color: var(--stock-red);">Sin stock</strong>
                  {/if}
                </span>
              </div>
            </div>
          </div>

          <!-- LEYENDA DEL POR QUÉ SIRVE -->
          <div class="benefit-card">
            <div class="benefit-card-title">
              <Sparkles size={16} class="benefit-icon" />
              <span class="font-cursive benefit-headline">¿Para qué sirve este cosmético?</span>
            </div>
            <p class="benefit-card-text">
              {product.benefitLegend}
            </p>
          </div>

          <!-- INGREDIENTES Y MODO DE USO -->
          {#if product.ingredients}
            <div class="ingredients-section">
              <h4 class="section-subtitle">Fórmula & Componentes Clave:</h4>
              <p class="ingredients-content">{product.ingredients}</p>
            </div>
          {/if}

          <!-- VENTAJAS BOTÁNICAS -->
          <div class="perks-row">
            <div class="perk-pill">
              <Check size={14} class="check-icon" /> No comedogénico
            </div>
            <div class="perk-pill">
              <Check size={14} class="check-icon" /> Hipoalergénico
            </div>
            <div class="perk-pill">
              <Check size={14} class="check-icon" /> Cruelty Free
            </div>
          </div>

          <!-- SELECTOR DE CANTIDAD Y BOTÓN DE COMPRA -->
          <div class="purchase-actions">
            {#if product.stock > 0}
              <div class="qty-counter">
                <button class="qty-btn" onclick={decrement} disabled={quantity <= 1}>-</button>
                <span class="qty-val">{quantity}</span>
                <button class="qty-btn" onclick={increment} disabled={quantity >= product.stock}>+</button>
              </div>

              <button class="btn-primary modal-buy-btn" onclick={handleAddToCart}>
                <ShoppingBag size={18} />
                <span>Agregar a la Bolsa (${(product.cost * quantity).toFixed(2)})</span>
              </button>
            {:else}
              <div class="out-of-stock-alert">
                <span>Este producto se encuentra temporalmente agotado en almacén.</span>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .product-modal-wrap {
    max-width: 820px;
    position: relative;
    padding: 0;
    overflow: hidden;
  }

  .modal-close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: #FFFFFF;
    border: 1px solid var(--pink-200);
    border-radius: 50%;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-dark);
    cursor: pointer;
    z-index: 10;
    transition: var(--transition-smooth);
    box-shadow: var(--shadow-sm);
  }

  .modal-close-btn:hover {
    background-color: var(--pink-100);
    color: var(--pink-600);
    transform: rotate(90deg);
  }

  .modal-grid {
    display: grid;
    grid-template-columns: 1fr 1.25fr;
  }

  .modal-gallery {
    position: relative;
    background-color: var(--pink-50);
    height: 100%;
    min-height: 420px;
  }

  .modal-main-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .modal-badges-float {
    position: absolute;
    top: 16px;
    left: 16px;
  }

  .badge-featured {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255, 255, 255, 0.95);
    color: var(--pink-600);
    padding: 5px 14px;
    border-radius: var(--radius-full);
    font-size: 1.1rem;
    font-weight: 700;
    box-shadow: var(--shadow-sm);
  }

  .modal-details {
    padding: 32px 30px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .modal-category {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.76rem;
    letter-spacing: 1px;
    color: var(--pink-500);
    font-weight: 700;
  }

  .stars {
    color: #F6AD55;
    font-size: 0.85rem;
  }

  .stars span {
    color: var(--text-muted);
    font-size: 0.75rem;
  }

  .modal-product-title {
    font-family: var(--font-serif);
    font-size: 1.65rem;
    color: var(--text-dark);
    line-height: 1.25;
  }

  /* Banner de precio y almacén */
  .price-stock-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(135deg, #FFF5F7 0%, #FFEBF1 100%);
    border: 1px solid var(--pink-200);
    border-radius: var(--radius-md);
    padding: 12px 18px;
  }

  .sub-label {
    display: block;
    font-size: 0.72rem;
    color: var(--text-muted);
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 2px;
  }

  .price-highlight {
    font-family: var(--font-serif);
    font-size: 1.65rem;
    font-weight: 700;
    color: var(--pink-600);
    line-height: 1;
  }

  .stock-indicator {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .stock-indicator :global(.package-icon) {
    color: var(--pink-500);
  }

  .stock-number {
    font-size: 0.88rem;
    color: var(--text-dark);
  }

  /* Tarjeta de beneficio / ¿Por qué sirve? */
  .benefit-card {
    background: #FFFFFF;
    border: 1.5px solid var(--pink-200);
    border-radius: var(--radius-md);
    padding: 14px 16px;
    box-shadow: 0 4px 12px rgba(244, 135, 164, 0.08);
  }

  .benefit-card-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
    color: var(--pink-600);
  }

  .benefit-card-title :global(.benefit-icon) {
    color: var(--pink-500);
  }

  .benefit-headline {
    font-size: 1.35rem;
    font-weight: 700;
    line-height: 1;
  }

  .benefit-card-text {
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text-body);
  }

  /* Sección de Ingredientes */
  .ingredients-section {
    padding: 2px 0;
  }

  .section-subtitle {
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .ingredients-content {
    font-size: 0.82rem;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .perks-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .perk-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background-color: var(--pink-50);
    color: var(--pink-700);
    border: 1px solid var(--pink-200);
    padding: 4px 10px;
    border-radius: var(--radius-full);
    font-size: 0.74rem;
    font-weight: 600;
  }

  .perk-pill :global(.check-icon) {
    color: var(--pink-500);
  }

  /* Acciones de compra */
  .purchase-actions {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 8px;
    padding-top: 14px;
    border-top: 1px solid var(--border-delicate);
  }

  .qty-counter {
    display: flex;
    align-items: center;
    background-color: var(--pink-50);
    border: 1.5px solid var(--pink-200);
    border-radius: var(--radius-full);
    padding: 4px 8px;
  }

  .qty-btn {
    background: none;
    border: none;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--pink-600);
    cursor: pointer;
    border-radius: 50%;
    transition: var(--transition-smooth);
  }

  .qty-btn:hover:not(:disabled) {
    background-color: var(--pink-200);
  }

  .qty-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .qty-val {
    font-size: 0.95rem;
    font-weight: 700;
    min-width: 28px;
    text-align: center;
    color: var(--text-dark);
  }

  .modal-buy-btn {
    flex: 1;
    padding: 12px 20px;
    font-size: 0.95rem;
  }

  .out-of-stock-alert {
    width: 100%;
    background-color: var(--stock-red-bg);
    color: var(--stock-red);
    border: 1px solid rgba(229, 62, 62, 0.3);
    padding: 10px 16px;
    border-radius: var(--radius-md);
    text-align: center;
    font-size: 0.88rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .modal-grid {
      grid-template-columns: 1fr;
    }

    .modal-gallery {
      height: 250px;
      min-height: unset;
    }

    .modal-details {
      padding: 20px;
    }
  }
</style>
