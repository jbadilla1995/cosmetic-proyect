<script>
  import { appState } from '../lib/appState.svelte.js';
  import { ShoppingBag, Lock, ShieldCheck, Search, Sparkles, X, Menu } from 'lucide-svelte';

  let mobileMenuOpen = $state(false);

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function handleSearchInput(e) {
    appState.searchQuery = e.target.value;
  }

  function clearSearch() {
    appState.searchQuery = '';
  }
</script>

<header class="navbar-wrapper">
  <!-- Barra superior delicada -->
  <div class="top-announcement">
    <div class="announcement-content">
      <Sparkles size={14} class="sparkle-icon" />
      <span class="font-cursive announcement-text">Envío gratis en compras mayores a $45 • Fórmulas Botánicas & Cruelty Free</span>
      <Sparkles size={14} class="sparkle-icon" />
    </div>
  </div>

  <nav class="main-navbar">
    <div class="nav-container">
      <!-- Marca y Logotipo -->
      <a href="#catalogo-section" class="brand-logo" onclick={(e) => { e.preventDefault(); appState.selectCatalog('todos'); }}>
        <span class="logo-script">Laysla</span>
        <span class="logo-sub">COSMETICS</span>
      </a>

      <!-- Buscador de productos -->
      <div class="search-container">
        <Search size={18} class="search-icon" />
        <input 
          type="text" 
          placeholder="Buscar por beneficio, serum, labial..."
          value={appState.searchQuery}
          oninput={handleSearchInput}
          class="search-input"
        />
        {#if appState.searchQuery}
          <button class="clear-search-btn" onclick={clearSearch} aria-label="Limpiar búsqueda">
            <X size={15} />
          </button>
        {/if}
      </div>

      <!-- Acciones de cabecera -->
      <div class="nav-actions">
        <!-- Botón Login / Admin -->
        {#if appState.currentUser}
          <button 
            class="admin-btn active" 
            onclick={() => appState.isAdminOpen = true}
            title="Panel de Administración"
          >
            <ShieldCheck size={18} class="admin-icon" />
            <span class="admin-label">Panel Admin</span>
          </button>
        {:else}
          <button 
            class="admin-btn" 
            onclick={() => appState.isLoginOpen = true}
            title="Iniciar Sesión"
          >
            <Lock size={16} />
            <span class="admin-label">Login</span>
          </button>
        {/if}

        <!-- Botón Bolsa de Compras -->
        <button 
          class="cart-btn" 
          onclick={() => appState.isCartOpen = true}
          aria-label="Abrir bolsa de compras"
        >
          <div class="cart-icon-wrap">
            <ShoppingBag size={20} />
            {#if appState.cartCount > 0}
              <span class="cart-badge">{appState.cartCount}</span>
            {/if}
          </div>
          <span class="cart-amount">${appState.cartTotal.toFixed(2)}</span>
        </button>

        <!-- Toggle móvil -->
        <button class="mobile-toggle" onclick={toggleMobileMenu} aria-label="Menu móvil">
          {#if mobileMenuOpen}
            <X size={22} />
          {:else}
            <Menu size={22} />
          {/if}
        </button>
      </div>
    </div>

    <!-- Menú móvil desplegable -->
    {#if mobileMenuOpen}
      <div class="mobile-menu-drawer">
        <div class="mobile-search">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Buscar productos..."
            value={appState.searchQuery}
            oninput={handleSearchInput}
            class="form-input"
          />
        </div>
        <div class="mobile-actions">
          {#if appState.currentUser}
            <button class="btn-primary" style="width: 100%;" onclick={() => { appState.isAdminOpen = true; mobileMenuOpen = false; }}>
              <ShieldCheck size={18} /> Panel de Administración
            </button>
            <button class="btn-secondary" style="width: 100%;" onclick={() => { appState.logout(); mobileMenuOpen = false; }}>
              Cerrar Sesión
            </button>
          {:else}
            <button class="btn-secondary" style="width: 100%;" onclick={() => { appState.isLoginOpen = true; mobileMenuOpen = false; }}>
              <Lock size={16} /> Login
            </button>
          {/if}
        </div>
      </div>
    {/if}
  </nav>
</header>

<style>
  .navbar-wrapper {
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 20px rgba(244, 135, 164, 0.1);
  }

  .top-announcement {
    background: linear-gradient(90deg, #FFE6ED 0%, #FFD4DF 50%, #FFE6ED 100%);
    padding: 6px 16px;
    border-bottom: 1px solid var(--pink-200);
    text-align: center;
  }

  .announcement-content {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--pink-600);
    font-size: 0.95rem;
  }

  .announcement-text {
    font-size: 1.15rem;
    letter-spacing: 0.5px;
  }

  .top-announcement :global(.sparkle-icon) {
    color: var(--pink-500);
    animation: pulse 2s infinite ease-in-out;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.6; transform: scale(0.9); }
    50% { opacity: 1; transform: scale(1.15); }
  }

  .main-navbar {
    background-color: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-delicate);
  }

  .nav-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .brand-logo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-decoration: none;
    line-height: 1;
    user-select: none;
  }

  .logo-script {
    font-family: var(--font-cursive-accent);
    font-size: 2.8rem;
    color: var(--pink-600);
    letter-spacing: 1px;
    line-height: 0.85;
  }

  .logo-sub {
    font-family: var(--font-serif);
    font-size: 0.68rem;
    letter-spacing: 4px;
    color: var(--text-muted);
    font-weight: 600;
    padding-left: 4px;
    margin-top: 4px;
  }

  .search-container {
    position: relative;
    flex: 1;
    max-width: 440px;
    display: flex;
    align-items: center;
  }

  .search-container :global(.search-icon) {
    position: absolute;
    left: 14px;
    color: var(--pink-400);
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 9px 38px 9px 40px;
    border-radius: var(--radius-full);
    border: 1.5px solid var(--pink-200);
    background-color: var(--pink-50);
    font-size: 0.88rem;
    color: var(--text-dark);
    transition: var(--transition-smooth);
    outline: none;
  }

  .search-input:focus {
    background-color: #FFFFFF;
    border-color: var(--pink-400);
    box-shadow: 0 0 0 4px rgba(244, 135, 164, 0.15);
  }

  .clear-search-btn {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    display: flex;
    padding: 2px;
  }

  .clear-search-btn:hover {
    color: var(--pink-600);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .admin-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background-color: #FFFFFF;
    color: var(--text-dark);
    border: 1.5px solid var(--pink-200);
    padding: 7px 15px;
    border-radius: var(--radius-full);
    font-size: 0.84rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .admin-btn:hover {
    background-color: var(--pink-50);
    border-color: var(--pink-400);
    color: var(--pink-600);
  }

  .admin-btn.active {
    background: linear-gradient(135deg, #FFE6ED 0%, #FFD4DF 100%);
    border-color: var(--pink-400);
    color: var(--pink-700);
  }

  .admin-btn :global(.admin-icon) {
    color: var(--pink-600);
  }

  .cart-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #FBAEC2 0%, #E65A84 100%);
    color: #FFFFFF;
    border: none;
    padding: 8px 18px;
    border-radius: var(--radius-full);
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 3px 12px rgba(230, 90, 132, 0.28);
    transition: var(--transition-smooth);
  }

  .cart-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(230, 90, 132, 0.38);
  }

  .cart-icon-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .cart-badge {
    position: absolute;
    top: -8px;
    right: -10px;
    background-color: #FFFFFF;
    color: var(--pink-600);
    font-size: 0.7rem;
    font-weight: 800;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }

  .cart-amount {
    font-size: 0.85rem;
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    padding-left: 9px;
  }

  .mobile-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--text-dark);
    cursor: pointer;
    padding: 4px;
  }

  .mobile-menu-drawer {
    display: none;
    padding: 16px 24px;
    background: #FFFFFF;
    border-top: 1px solid var(--pink-200);
    flex-direction: column;
    gap: 14px;
  }

  @media (max-width: 860px) {
    .search-container {
      display: none;
    }

    .admin-label {
      display: none;
    }

    .cart-amount {
      display: none;
    }

    .mobile-toggle {
      display: block;
    }

    .mobile-menu-drawer {
      display: flex;
    }
  }
</style>
