<script>
  import { appState } from '../lib/appState.svelte.js';
  import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Heart } from 'lucide-svelte';

  function handleCheckout() {
    if (appState.cart.length === 0) return;
    
    // Simular procesamiento del pedido actualizando el stock simulado
    appState.cart.forEach(item => {
      const prod = appState.products.find(p => p.id === item.product.id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });

    const totalSpent = appState.cartTotal.toFixed(2);
    appState.clearCart();
    appState.isCartOpen = false;
    appState.showToast(`✨ ¡Pedido confirmado con éxito por $${totalSpent}! Gracias por elegir Laysla Cosmetics.`, 'success');
  }
</script>

{#if appState.isCartOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="cart-backdrop" onclick={() => appState.isCartOpen = false}>
    <div class="cart-drawer" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
      <!-- Encabezado del Carrito -->
      <div class="cart-header">
        <div class="header-title-box">
          <ShoppingBag size={22} class="cart-header-icon" />
          <div>
            <h3 class="cart-title">Tu Bolsa de Belleza</h3>
            <span class="font-cursive cart-sub">{appState.cartCount} {appState.cartCount === 1 ? 'cosmético' : 'cosméticos'} seleccionados</span>
          </div>
        </div>
        <button class="close-drawer-btn" onclick={() => appState.isCartOpen = false} aria-label="Cerrar bolsa">
          <X size={20} />
        </button>
      </div>

      <!-- Lista de Ítems -->
      <div class="cart-items-scroll">
        {#if appState.cart.length === 0}
          <div class="empty-cart-state">
            <div class="empty-icon">🌸</div>
            <h4 class="empty-title">Tu bolsa está vacía</h4>
            <p class="empty-desc">Explora nuestros catálogos y descubre el producto perfecto para consentir tu piel hoy.</p>
            <button class="btn-primary" onclick={() => appState.isCartOpen = false}>
              Ir a Explorar
            </button>
          </div>
        {:else}
          {#each appState.cart as item (item.product.id)}
            <div class="cart-item-card">
              <img 
                src={item.product.imageUrl} 
                alt={item.product.name} 
                class="cart-item-thumb" 
                onerror={(e) => { e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'; }}
              />

              <div class="cart-item-info">
                <h4 class="item-name">{item.product.name}</h4>
                <div class="item-cost">${Number(item.product.cost).toFixed(2)} c/u</div>

                <!-- Controles de cantidad -->
                <div class="item-qty-row">
                  <div class="qty-pills">
                    <button 
                      class="qty-control-btn" 
                      onclick={() => appState.updateCartQuantity(item.product.id, -1)}
                      aria-label="Restar una unidad"
                    >-</button>
                    <span class="qty-display">{item.quantity}</span>
                    <button 
                      class="qty-control-btn" 
                      onclick={() => appState.updateCartQuantity(item.product.id, 1)}
                      disabled={item.quantity >= item.product.stock}
                      aria-label="Sumar una unidad"
                    >+</button>
                  </div>

                  <span class="item-subtotal">${(item.product.cost * item.quantity).toFixed(2)}</span>

                  <button 
                    class="remove-item-btn" 
                    onclick={() => appState.removeFromCart(item.product.id)}
                    title="Eliminar de la bolsa"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>

      <!-- Pie del Carrito con Resumen -->
      {#if appState.cart.length > 0}
        <div class="cart-footer">
          <div class="footer-summary-row">
            <span class="summary-label">Subtotal estimado:</span>
            <span class="summary-val">${appState.cartTotal.toFixed(2)}</span>
          </div>
          <div class="footer-summary-row shipping-row">
            <span class="summary-label">Envío:</span>
            <span class="shipping-tag font-cursive">
              {appState.cartTotal >= 45 ? '¡Gratis por compra mayor a $45!' : '$4.99'}
            </span>
          </div>

          <div class="total-row">
            <span class="total-label">Total a Pagar:</span>
            <span class="total-amount">
              ${(appState.cartTotal + (appState.cartTotal >= 45 ? 0 : 4.99)).toFixed(2)}
            </span>
          </div>

          <button class="btn-primary checkout-btn" onclick={handleCheckout}>
            <Sparkles size={18} />
            <span>Confirmar Pedido</span>
            <ArrowRight size={18} />
          </button>

          <button class="clear-cart-link" onclick={() => appState.clearCart()}>
            Vaciar bolsa de compras
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .cart-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(60, 40, 50, 0.45);
    backdrop-filter: blur(5px);
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
    animation: fadeIn 0.25s ease-out;
  }

  .cart-drawer {
    width: 100%;
    max-width: 440px;
    height: 100%;
    background: #FFFFFF;
    box-shadow: -8px 0 30px rgba(244, 135, 164, 0.2);
    display: flex;
    flex-direction: column;
    animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  .cart-header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--pink-200);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(135deg, #FFF5F7 0%, #FFEBF1 100%);
  }

  .header-title-box {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .header-title-box :global(.cart-header-icon) {
    color: var(--pink-600);
  }

  .cart-title {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    color: var(--text-dark);
    line-height: 1.1;
  }

  .cart-sub {
    font-size: 1.05rem;
    color: var(--pink-600);
    font-weight: 700;
  }

  .close-drawer-btn {
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
    transition: var(--transition-smooth);
  }

  .close-drawer-btn:hover {
    background-color: var(--pink-100);
    color: var(--pink-600);
  }

  .cart-items-scroll {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .empty-cart-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    padding: 40px 20px;
  }

  .empty-icon {
    font-size: 3.5rem;
    margin-bottom: 14px;
  }

  .empty-title {
    font-family: var(--font-serif);
    font-size: 1.35rem;
    color: var(--text-dark);
    margin-bottom: 8px;
  }

  .empty-desc {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin-bottom: 22px;
  }

  .cart-item-card {
    display: flex;
    gap: 14px;
    padding: 12px;
    background: var(--pink-50);
    border: 1px solid var(--pink-200);
    border-radius: var(--radius-md);
  }

  .cart-item-thumb {
    width: 72px;
    height: 72px;
    border-radius: var(--radius-sm);
    object-fit: cover;
    background: #FFFFFF;
    border: 1px solid var(--pink-200);
    flex-shrink: 0;
  }

  .cart-item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .item-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-dark);
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .item-cost {
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .item-qty-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 6px;
  }

  .qty-pills {
    display: inline-flex;
    align-items: center;
    background: #FFFFFF;
    border: 1px solid var(--pink-200);
    border-radius: var(--radius-full);
    padding: 2px 6px;
  }

  .qty-control-btn {
    background: none;
    border: none;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 700;
    color: var(--pink-600);
    cursor: pointer;
  }

  .qty-control-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .qty-display {
    font-size: 0.82rem;
    font-weight: 700;
    min-width: 20px;
    text-align: center;
  }

  .item-subtotal {
    font-family: var(--font-serif);
    font-size: 1rem;
    font-weight: 700;
    color: var(--pink-600);
  }

  .remove-item-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    transition: var(--transition-smooth);
  }

  .remove-item-btn:hover {
    color: var(--stock-red);
    background-color: var(--pink-100);
  }

  .cart-footer {
    padding: 20px 24px;
    border-top: 1px solid var(--pink-200);
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.88rem;
    color: var(--text-body);
  }

  .shipping-tag {
    color: var(--pink-600);
    font-weight: 700;
    font-size: 1rem;
  }

  .total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    border-top: 1px dashed var(--pink-200);
  }

  .total-label {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-dark);
  }

  .total-amount {
    font-family: var(--font-serif);
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--pink-600);
  }

  .checkout-btn {
    width: 100%;
    padding: 13px;
    font-size: 1rem;
  }

  .clear-cart-link {
    background: none;
    border: none;
    font-size: 0.78rem;
    color: var(--text-muted);
    text-decoration: underline;
    cursor: pointer;
    align-self: center;
  }

  .clear-cart-link:hover {
    color: var(--pink-600);
  }
</style>
