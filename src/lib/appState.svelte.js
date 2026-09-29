import { api } from './api.js';

// Estado global reactivo para Svelte 5
class AppStore {
  catalogs = $state([]);
  products = $state([]);
  selectedCatalogSlug = $state('todos');
  searchQuery = $state('');
  selectedProduct = $state(null);
  isDetailOpen = $state(false);
  
  // Carrito de compras
  cart = $state([]);
  isCartOpen = $state(false);

  // Super Usuario y Modales
  currentUser = $state(null);
  isLoginOpen = $state(false);
  isAdminOpen = $state(false);
  isLoading = $state(false);

  // Notificaciones Toast
  toasts = $state([]);

  constructor() {
    this.init();
  }

  async init() {
    this.isLoading = true;
    try {
      this.currentUser = api.checkSession();
      await this.loadCatalogs();
      await this.loadProducts();
      this.loadCartFromStorage();
    } catch (err) {
      console.error('Error inicializando tienda:', err);
    } finally {
      this.isLoading = false;
    }
  }

  // Carga de catálogos y productos
  async loadCatalogs() {
    this.catalogs = await api.getCatalogs();
  }

  async loadProducts() {
    this.products = await api.getProducts();
  }

  // Filtrado reactivo de productos
  get filteredProducts() {
    let list = this.products;

    // Filtro por catálogo
    if (this.selectedCatalogSlug && this.selectedCatalogSlug !== 'todos') {
      list = list.filter(p => p.catalogSlug === this.selectedCatalogSlug || p.catalogId === this.selectedCatalogSlug);
    }

    // Filtro por término de búsqueda (nombre, leyenda, ingredientes)
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        (p.benefitLegend && p.benefitLegend.toLowerCase().includes(q)) ||
        (p.ingredients && p.ingredients.toLowerCase().includes(q))
      );
    }

    return list;
  }

  // Selección de catálogo
  selectCatalog(slug) {
    this.selectedCatalogSlug = slug;
  }

  // Modal de detalle de producto
  openProductDetail(product) {
    this.selectedProduct = product;
    this.isDetailOpen = true;
  }

  closeProductDetail() {
    this.isDetailOpen = false;
    this.selectedProduct = null;
  }

  // Carrito
  addToCart(product, quantity = 1) {
    if (product.stock <= 0) {
      this.showToast(`Lo sentimos, "${product.name}" no tiene existencias en almacén.`, 'error');
      return;
    }

    const existingIndex = this.cart.findIndex(item => item.product.id === product.id);
    if (existingIndex !== -1) {
      const currentQty = this.cart[existingIndex].quantity;
      if (currentQty + quantity > product.stock) {
        this.showToast(`Solo quedan ${product.stock} unidades en almacén.`, 'warning');
        return;
      }
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({ product, quantity: Math.min(quantity, product.stock) });
    }

    this.saveCartToStorage();
    this.showToast(`🌸 ¡"${product.name}" se agregó a tu bolsa!`, 'success');
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.product.id !== productId);
    this.saveCartToStorage();
    this.showToast('Producto retirado de la bolsa', 'info');
  }

  updateCartQuantity(productId, delta) {
    const item = this.cart.find(i => i.product.id === productId);
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      this.removeFromCart(productId);
      return;
    }

    if (newQty > item.product.stock) {
      this.showToast(`Límite de stock en almacén: ${item.product.stock} piezas`, 'warning');
      return;
    }

    item.quantity = newQty;
    this.saveCartToStorage();
  }

  clearCart() {
    this.cart = [];
    this.saveCartToStorage();
  }

  get cartTotal() {
    return this.cart.reduce((sum, item) => sum + (item.product.cost * item.quantity), 0);
  }

  get cartCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  saveCartToStorage() {
    try {
      localStorage.setItem('laysla_cart_v1', JSON.stringify(this.cart));
    } catch (e) {
      console.warn('No se pudo guardar carrito en almacenamiento:', e);
    }
  }

  loadCartFromStorage() {
    try {
      const raw = localStorage.getItem('laysla_cart_v1');
      if (raw) {
        this.cart = JSON.parse(raw);
      }
    } catch {
      this.cart = [];
    }
  }

  // Autenticación de Super Usuario
  async login(email, password) {
    this.isLoading = true;
    try {
      const result = await api.loginSuperUser(email, password);
      this.currentUser = result.user;
      this.isLoginOpen = false;
      this.showToast(`✨ ¡Bienvenida, ${result.user.name}! Modo Super Usuario activado.`, 'success');
      return true;
    } catch (err) {
      this.showToast(err.message || 'Error de autenticación', 'error');
      throw err;
    } finally {
      this.isLoading = false;
    }
  }

  logout() {
    api.logoutSuperUser();
    this.currentUser = null;
    this.isAdminOpen = false;
    this.showToast('Sesión de Super Administrador cerrada', 'info');
  }

  // Operaciones CRUD de productos por Super Usuario
  async createProduct(productData) {
    try {
      const created = await api.createProduct(productData);
      await this.loadProducts();
      this.showToast(`🌸 Producto "${created.name}" guardado exitosamente.`, 'success');
      return created;
    } catch (err) {
      this.showToast('Error al crear producto: ' + err.message, 'error');
      throw err;
    }
  }

  async updateProduct(id, productData) {
    try {
      const updated = await api.updateProduct(id, productData);
      await this.loadProducts();
      this.showToast(`✨ Producto "${updated.name}" actualizado.`, 'success');
      return updated;
    } catch (err) {
      this.showToast('Error al actualizar: ' + err.message, 'error');
      throw err;
    }
  }

  async deleteProduct(id) {
    try {
      await api.deleteProduct(id);
      await this.loadProducts();
      this.showToast('Producto eliminado del inventario.', 'info');
      return true;
    } catch (err) {
      this.showToast('Error al eliminar: ' + err.message, 'error');
      throw err;
    }
  }

  // Operaciones CRUD de catálogos
  async createCatalog(catalogData) {
    try {
      const created = await api.createCatalog(catalogData);
      await this.loadCatalogs();
      this.showToast(`🎀 Catálogo "${created.name}" creado.`, 'success');
      return created;
    } catch (err) {
      this.showToast('Error al crear catálogo: ' + err.message, 'error');
      throw err;
    }
  }

  async deleteCatalog(id) {
    try {
      await api.deleteCatalog(id);
      await this.loadCatalogs();
      this.showToast('Catálogo eliminado correctamente.', 'info');
      return true;
    } catch (err) {
      this.showToast('Error al eliminar catálogo: ' + err.message, 'error');
      throw err;
    }
  }

  // Restablecer datos de muestra
  async resetDemoData() {
    api.resetToDefaultSeed();
    await this.loadCatalogs();
    await this.loadProducts();
    this.showToast('Datos de demostración restaurados.', 'info');
  }

  // Toasts
  showToast(message, type = 'info') {
    const id = Date.now() + Math.random();
    this.toasts.push({ id, message, type });
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }, 4000);
  }

  removeToast(id) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
}

export const appState = new AppStore();
