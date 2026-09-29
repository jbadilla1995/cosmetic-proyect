<script>
  import { appState } from './lib/appState.svelte.js';
  import Navbar from './components/Navbar.svelte';
  import HeroBanner from './components/HeroBanner.svelte';
  import CatalogSelector from './components/CatalogSelector.svelte';
  import ProductCard from './components/ProductCard.svelte';
  import ProductModal from './components/ProductModal.svelte';
  import CartDrawer from './components/CartDrawer.svelte';
  import LoginModal from './components/LoginModal.svelte';
  import AdminPanel from './components/AdminPanel.svelte';
  import Footer from './components/Footer.svelte';
  import Toast from './components/Toast.svelte';
  import { Sparkles, SlidersHorizontal, PackageOpen, Plus, ShieldCheck } from 'lucide-svelte';

  let currentCatalogObj = $derived(
    appState.selectedCatalogSlug === 'todos'
      ? { name: 'Colección Completa', icon: '✨', description: 'Todos nuestros cosméticos formulados para el cuidado y resplandor de tu piel.' }
      : appState.catalogs.find(c => c.slug === appState.selectedCatalogSlug) || { name: 'Catálogo Seleccionado', icon: '🌸', description: '' }
  );
</script>

<div class="app-root">
  <!-- Barra de Navegación -->
  <Navbar />

  <!-- Banner Hero Romántico & Pastel -->
  <HeroBanner />

  <main class="store-main">
    <!-- Selector Dinámico de Catálogos -->
    <CatalogSelector />

    <!-- Sección de Productos -->
    <section class="products-section">
      <div class="section-container">
        <!-- Encabezado de la Sección de Productos -->
        <div class="products-grid-header">
          <div class="header-left">
            <span class="active-cat-icon">{currentCatalogObj.icon}</span>
            <div>
              <h2 class="active-cat-title">
                {currentCatalogObj.name}
              </h2>
              <p class="active-cat-desc font-cursive">
                {appState.searchQuery ? `Resultados para "${appState.searchQuery}"` : currentCatalogObj.description}
              </p>
            </div>
          </div>

          <div class="header-right">
            <span class="count-badge">
              <strong>{appState.filteredProducts.length}</strong> cosméticos disponibles
            </span>

            {#if appState.currentUser}
              <button 
                class="btn-secondary add-prod-quick-btn" 
                onclick={() => { appState.selectedProduct = null; appState.isAdminOpen = true; }}
              >
                <Plus size={16} /> Cargar Cosmético
              </button>
            {/if}
          </div>
        </div>

        <!-- Cuadrícula de Productos -->
        {#if appState.filteredProducts.length > 0}
          <div class="products-grid">
            {#each appState.filteredProducts as product (product.id)}
              <ProductCard {product} />
            {/each}
          </div>
        {:else}
          <!-- Estado Vacío si no hay coincidencias -->
          <div class="empty-products-box">
            <div class="empty-sparkle">🌸</div>
            <h3 class="empty-title">No encontramos cosméticos en esta sección</h3>
            <p class="empty-desc">
              {#if appState.searchQuery}
                No hay productos que coincidan con la búsqueda "<strong>{appState.searchQuery}</strong>". Intenta con otro término como <em>serum</em>, <em>labial</em> o <em>crema</em>.
              {:else}
                Aún no se han cargado productos en este catálogo.
              {/if}
            </p>
            <div class="empty-actions">
              <button class="btn-primary" onclick={() => { appState.selectedCatalogSlug = 'todos'; appState.searchQuery = ''; }}>
                Ver Todos los Cosméticos
              </button>
              {#if appState.currentUser}
                <button class="btn-secondary" onclick={() => appState.isAdminOpen = true}>
                  <ShieldCheck size={16} /> Cargar nuevo cosmético
                </button>
              {/if}
            </div>
          </div>
        {/if}
      </div>
    </section>
  </main>

  <!-- Modales y Elementos Superpuestos -->
  <ProductModal />
  <CartDrawer />
  <LoginModal />
  <AdminPanel />
  <Toast />

  <!-- Pie de Página -->
  <Footer />
</div>

<style>
  .app-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .store-main {
    flex: 1;
  }

  .products-section {
    padding: 20px 24px 70px;
  }

  .section-container {
    max-width: 1240px;
    margin: 0 auto;
  }

  .products-grid-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 28px;
    padding-bottom: 16px;
    border-bottom: 1.5px solid var(--pink-200);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .active-cat-icon {
    font-size: 2rem;
    background: #FFFFFF;
    border: 1px solid var(--pink-200);
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-sm);
  }

  .active-cat-title {
    font-family: var(--font-serif);
    font-size: 1.6rem;
    color: var(--text-dark);
    line-height: 1.1;
  }

  .active-cat-desc {
    font-size: 1.15rem;
    color: var(--pink-600);
    font-weight: 600;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .count-badge {
    background: #FFFFFF;
    border: 1px solid var(--pink-200);
    padding: 6px 14px;
    border-radius: var(--radius-full);
    font-size: 0.82rem;
    color: var(--text-muted);
  }

  .count-badge strong {
    color: var(--pink-600);
  }

  .add-prod-quick-btn {
    padding: 6px 16px;
    font-size: 0.84rem;
  }

  /* Grid responsivo de productos */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    gap: 26px;
  }

  /* Estado Vacío */
  .empty-products-box {
    background: #FFFFFF;
    border: 1.5px dashed var(--pink-300);
    border-radius: var(--radius-lg);
    padding: 60px 24px;
    text-align: center;
    max-width: 600px;
    margin: 40px auto;
  }

  .empty-sparkle {
    font-size: 3rem;
    margin-bottom: 12px;
  }

  .empty-title {
    font-family: var(--font-serif);
    font-size: 1.45rem;
    color: var(--text-dark);
    margin-bottom: 8px;
  }

  .empty-desc {
    font-size: 0.92rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin-bottom: 24px;
  }

  .empty-actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  @media (max-width: 680px) {
    .products-grid-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .products-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
