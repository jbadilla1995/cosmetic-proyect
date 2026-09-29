<script>
  import { appState } from '../lib/appState.svelte.js';
  import { Sparkles, PlusCircle } from 'lucide-svelte';

  function getProductCountForCatalog(slug) {
    if (slug === 'todos') {
      return appState.products.length;
    }
    return appState.products.filter(p => p.catalogSlug === slug || p.catalogId === slug).length;
  }
</script>

<div class="catalog-section" id="catalogo-section">
  <div class="catalog-header">
    <div class="header-pre">
      <Sparkles size={16} class="pre-icon" />
      <span class="font-cursive pre-text">Selecciona tu ritual favorito</span>
    </div>
    <h2 class="catalog-heading">
      Explora por <span class="heading-cursive">Catálogos Exclusivos</span>
    </h2>
    <p class="catalog-sub">
      Descubre fórmulas seleccionadas para cada paso de tu rutina de belleza y cuidado personal.
    </p>
  </div>

  <div class="catalog-tabs-container">
    <div class="catalog-tabs-scroll">
      <!-- Opción: Todos los productos -->
      <button 
        class="catalog-tab {appState.selectedCatalogSlug === 'todos' ? 'active' : ''}"
        onclick={() => appState.selectCatalog('todos')}
      >
        <span class="tab-icon">✨</span>
        <span class="tab-title">Todos</span>
        <span class="tab-counter">{getProductCountForCatalog('todos')}</span>
      </button>

      <!-- Cada catálogo dinámico -->
      {#each appState.catalogs as cat (cat.id)}
        {@const count = getProductCountForCatalog(cat.slug)}
        <button 
          class="catalog-tab {appState.selectedCatalogSlug === cat.slug ? 'active' : ''}"
          onclick={() => appState.selectCatalog(cat.slug)}
        >
          <span class="tab-icon">{cat.icon || '🌸'}</span>
          <div class="tab-info">
            <span class="tab-title">{cat.name}</span>
            {#if cat.badge}
              <span class="tab-badge font-cursive">{cat.badge}</span>
            {/if}
          </div>
          <span class="tab-counter">{count}</span>
        </button>
      {/each}

      <!-- Acceso rápido para Super Usuario para añadir catálogo -->
      {#if appState.currentUser}
        <button 
          class="catalog-tab tab-add-btn" 
          onclick={() => appState.isAdminOpen = true}
          title="Gestionar o agregar catálogo"
        >
          <PlusCircle size={18} />
          <span class="tab-title">Nuevo Catálogo</span>
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .catalog-section {
    padding: 30px 24px 10px;
    max-width: 1240px;
    margin: 0 auto;
  }

  .catalog-header {
    text-align: center;
    margin-bottom: 28px;
  }

  .header-pre {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--pink-600);
    margin-bottom: 6px;
  }

  .header-pre :global(.pre-icon) {
    color: var(--pink-500);
  }

  .pre-text {
    font-size: 1.35rem;
    font-weight: 700;
  }

  .catalog-heading {
    font-family: var(--font-serif);
    font-size: clamp(1.8rem, 3.2vw, 2.6rem);
    color: var(--text-dark);
    margin-bottom: 8px;
  }

  .heading-cursive {
    font-family: var(--font-cursive);
    color: var(--pink-600);
    font-size: 1.2em;
    display: inline-block;
  }

  .catalog-sub {
    font-size: 0.95rem;
    color: var(--text-muted);
    max-width: 580px;
    margin: 0 auto;
  }

  .catalog-tabs-container {
    position: relative;
    padding: 4px 0 16px;
  }

  .catalog-tabs-scroll {
    display: flex;
    align-items: center;
    gap: 12px;
    overflow-x: auto;
    padding: 8px 4px 14px;
    scrollbar-width: thin;
    scrollbar-color: var(--pink-200) transparent;
  }

  .catalog-tabs-scroll::-webkit-scrollbar {
    height: 5px;
  }

  .catalog-tabs-scroll::-webkit-scrollbar-thumb {
    background: var(--pink-200);
    border-radius: 10px;
  }

  .catalog-tab {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    background: #FFFFFF;
    border: 1.5px solid var(--pink-200);
    border-radius: var(--radius-full);
    cursor: pointer;
    font-family: var(--font-sans);
    color: var(--text-body);
    font-size: 0.92rem;
    font-weight: 600;
    white-space: nowrap;
    transition: var(--transition-smooth);
    box-shadow: 0 2px 6px rgba(244, 135, 164, 0.08);
  }

  .catalog-tab:hover {
    border-color: var(--pink-400);
    background-color: var(--pink-50);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(244, 135, 164, 0.15);
  }

  .catalog-tab.active {
    background: linear-gradient(135deg, #FFE6ED 0%, #FFD4DF 100%);
    border-color: var(--pink-500);
    color: var(--pink-700);
    box-shadow: 0 4px 16px rgba(230, 90, 132, 0.22);
  }

  .tab-icon {
    font-size: 1.25rem;
    line-height: 1;
  }

  .tab-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .tab-title {
    line-height: 1.1;
  }

  .tab-badge {
    font-size: 0.85rem;
    color: var(--pink-600);
    font-weight: 700;
  }

  .tab-counter {
    background: #FFFFFF;
    color: var(--pink-600);
    font-size: 0.75rem;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: var(--radius-full);
    border: 1px solid var(--pink-200);
  }

  .catalog-tab.active .tab-counter {
    background: var(--pink-500);
    color: #FFFFFF;
    border-color: var(--pink-500);
  }

  .tab-add-btn {
    border-style: dashed;
    border-color: var(--pink-400);
    color: var(--pink-600);
    background-color: var(--pink-50);
  }

  .tab-add-btn:hover {
    background-color: var(--pink-100);
  }
</style>
