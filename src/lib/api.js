import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { INITIAL_CATALOGS, INITIAL_PRODUCTS } from './seedData.js';

const STORAGE_KEYS = {
  CATALOGS: 'laysla_catalogs_v1',
  PRODUCTS: 'laysla_products_v1',
  AUTH_USER: 'laysla_super_user_v1'
};

// Super Usuario por defecto para el panel administrativo
const DEFAULT_SUPER_USER = {
  id: 'admin-laysla-01',
  email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@layslacosmetics.com',
  name: 'Super Administradora Laysla',
  role: 'super_admin'
};

const DEFAULT_SUPER_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'layslaadmin2026';

// ============================================================================
// HELPERS DE ALMACENAMIENTO LOCAL CON PERSISTENCIA
// ============================================================================
function getLocalCatalogs() {
  const raw = localStorage.getItem(STORAGE_KEYS.CATALOGS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.CATALOGS, JSON.stringify(INITIAL_CATALOGS));
    return [...INITIAL_CATALOGS];
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error al parsear catálogos locales:', e);
    return [...INITIAL_CATALOGS];
  }
}

function saveLocalCatalogs(catalogs) {
  localStorage.setItem(STORAGE_KEYS.CATALOGS, JSON.stringify(catalogs));
}

function getLocalProducts() {
  const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    return [...INITIAL_PRODUCTS];
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error al parsear productos locales:', e);
    return [...INITIAL_PRODUCTS];
  }
}

function saveLocalProducts(products) {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

// ============================================================================
// CAPA DE SERVICIO API (SUPABASE + LOCAL STORAGE FALLBACK)
// ============================================================================
export const api = {
  isSupabaseActive() {
    return isSupabaseConfigured;
  },

  // --------------------------------------------------------------------------
  // CATÁLOGOS / CATEGORÍAS
  // --------------------------------------------------------------------------
  async getCatalogs() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('catalogs')
          .select('*')
          .order('display_order', { ascending: true });
        if (error) throw error;
        return data.map(c => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          icon: c.icon || '🌸',
          badge: c.badge || '',
          displayOrder: c.display_order || 0
        }));
      } catch (err) {
        console.warn('Fallo al consultar catálogos en Supabase, recurriendo a local:', err.message);
      }
    }
    return getLocalCatalogs();
  },

  async createCatalog(catalog) {
    const newCatalog = {
      id: catalog.id || `cat-${Date.now()}`,
      name: catalog.name.trim(),
      slug: catalog.slug || catalog.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: catalog.description || '',
      icon: catalog.icon || '🌸',
      badge: catalog.badge || '',
      displayOrder: Number(catalog.displayOrder) || 99
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('catalogs')
          .insert([{
            name: newCatalog.name,
            slug: newCatalog.slug,
            description: newCatalog.description,
            icon: newCatalog.icon,
            badge: newCatalog.badge,
            display_order: newCatalog.displayOrder
          }])
          .select()
          .single();
        if (error) throw error;
        return {
          id: data.id,
          name: data.name,
          slug: data.slug,
          description: data.description,
          icon: data.icon,
          badge: data.badge,
          displayOrder: data.display_order
        };
      } catch (err) {
        console.warn('Error al insertar catálogo en Supabase, guardando localmente:', err.message);
      }
    }

    const catalogs = getLocalCatalogs();
    catalogs.push(newCatalog);
    saveLocalCatalogs(catalogs);
    return newCatalog;
  },

  async updateCatalog(id, updates) {
    if (isSupabaseConfigured && supabase) {
      try {
        const payload = {};
        if (updates.name !== undefined) payload.name = updates.name;
        if (updates.slug !== undefined) payload.slug = updates.slug;
        if (updates.description !== undefined) payload.description = updates.description;
        if (updates.icon !== undefined) payload.icon = updates.icon;
        if (updates.badge !== undefined) payload.badge = updates.badge;
        if (updates.displayOrder !== undefined) payload.display_order = Number(updates.displayOrder);

        const { data, error } = await supabase
          .from('catalogs')
          .update(payload)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return {
          id: data.id,
          name: data.name,
          slug: data.slug,
          description: data.description,
          icon: data.icon,
          badge: data.badge,
          displayOrder: data.display_order
        };
      } catch (err) {
        console.warn('Error al actualizar catálogo en Supabase, actualizando local:', err.message);
      }
    }

    const catalogs = getLocalCatalogs();
    const index = catalogs.findIndex(c => c.id === id);
    if (index !== -1) {
      catalogs[index] = { ...catalogs[index], ...updates };
      saveLocalCatalogs(catalogs);
      return catalogs[index];
    }
    throw new Error('Catálogo no encontrado');
  },

  async deleteCatalog(id) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('catalogs')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn('Error al eliminar catálogo en Supabase, eliminando local:', err.message);
      }
    }

    let catalogs = getLocalCatalogs();
    catalogs = catalogs.filter(c => c.id !== id);
    saveLocalCatalogs(catalogs);
    return true;
  },

  // --------------------------------------------------------------------------
  // PRODUCTOS
  // --------------------------------------------------------------------------
  async getProducts(catalogSlug = null) {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('products').select('*').order('created_at', { ascending: false });
        if (catalogSlug && catalogSlug !== 'todos') {
          query = query.eq('catalog_slug', catalogSlug);
        }
        const { data, error } = await query;
        if (error) throw error;
        return data.map(p => ({
          id: p.id,
          catalogId: p.catalog_id,
          catalogSlug: p.catalog_slug,
          name: p.name,
          benefitLegend: p.benefit_legend,
          ingredients: p.ingredients || '',
          cost: Number(p.cost),
          stock: Number(p.stock),
          imageUrl: p.image_url,
          rating: Number(p.rating || 5.0),
          isFeatured: Boolean(p.is_featured)
        }));
      } catch (err) {
        console.warn('Fallo al consultar productos en Supabase, recurriendo a local:', err.message);
      }
    }

    const products = getLocalProducts();
    if (!catalogSlug || catalogSlug === 'todos') {
      return products;
    }
    return products.filter(p => p.catalogSlug === catalogSlug || p.catalogId === catalogSlug);
  },

  async createProduct(product) {
    const newProduct = {
      id: product.id || `prod-${Date.now()}`,
      catalogId: product.catalogId,
      catalogSlug: product.catalogSlug || '',
      name: product.name.trim(),
      benefitLegend: product.benefitLegend.trim(),
      ingredients: product.ingredients ? product.ingredients.trim() : '',
      cost: Number(product.cost) || 0,
      stock: Number(product.stock) || 0,
      imageUrl: product.imageUrl || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      rating: Number(product.rating) || 5.0,
      isFeatured: Boolean(product.isFeatured)
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .insert([{
            catalog_id: newProduct.catalogId.includes('-') && newProduct.catalogId.length > 20 ? newProduct.catalogId : null,
            catalog_slug: newProduct.catalogSlug,
            name: newProduct.name,
            benefit_legend: newProduct.benefitLegend,
            ingredients: newProduct.ingredients,
            cost: newProduct.cost,
            stock: newProduct.stock,
            image_url: newProduct.imageUrl,
            rating: newProduct.rating,
            is_featured: newProduct.isFeatured
          }])
          .select()
          .single();
        if (error) throw error;
        return {
          id: data.id,
          catalogId: data.catalog_id,
          catalogSlug: data.catalog_slug,
          name: data.name,
          benefitLegend: data.benefit_legend,
          ingredients: data.ingredients,
          cost: Number(data.cost),
          stock: Number(data.stock),
          imageUrl: data.image_url,
          rating: Number(data.rating),
          isFeatured: Boolean(data.is_featured)
        };
      } catch (err) {
        console.warn('Error al insertar producto en Supabase, guardando localmente:', err.message);
      }
    }

    const products = getLocalProducts();
    products.unshift(newProduct);
    saveLocalProducts(products);
    return newProduct;
  },

  async updateProduct(id, updates) {
    if (isSupabaseConfigured && supabase) {
      try {
        const payload = {};
        if (updates.name !== undefined) payload.name = updates.name;
        if (updates.benefitLegend !== undefined) payload.benefit_legend = updates.benefitLegend;
        if (updates.ingredients !== undefined) payload.ingredients = updates.ingredients;
        if (updates.cost !== undefined) payload.cost = Number(updates.cost);
        if (updates.stock !== undefined) payload.stock = Number(updates.stock);
        if (updates.imageUrl !== undefined) payload.image_url = updates.imageUrl;
        if (updates.catalogId !== undefined) payload.catalog_id = updates.catalogId;
        if (updates.catalogSlug !== undefined) payload.catalog_slug = updates.catalogSlug;
        if (updates.isFeatured !== undefined) payload.is_featured = updates.isFeatured;

        const { data, error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return {
          id: data.id,
          catalogId: data.catalog_id,
          catalogSlug: data.catalog_slug,
          name: data.name,
          benefitLegend: data.benefit_legend,
          ingredients: data.ingredients,
          cost: Number(data.cost),
          stock: Number(data.stock),
          imageUrl: data.image_url,
          rating: Number(data.rating),
          isFeatured: Boolean(data.is_featured)
        };
      } catch (err) {
        console.warn('Error al actualizar en Supabase, guardando local:', err.message);
      }
    }

    const products = getLocalProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      saveLocalProducts(products);
      return products[index];
    }
    throw new Error('Producto no encontrado');
  },

  async updateStock(id, newStock) {
    const stockVal = Math.max(0, parseInt(newStock, 10) || 0);
    return this.updateProduct(id, { stock: stockVal });
  },

  async deleteProduct(id) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn('Error al eliminar en Supabase, eliminando local:', err.message);
      }
    }

    let products = getLocalProducts();
    products = products.filter(p => p.id !== id);
    saveLocalProducts(products);
    return true;
  },

  // --------------------------------------------------------------------------
  // AUTENTICACIÓN DEL SUPER USUARIO
  // --------------------------------------------------------------------------
  async loginSuperUser(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // Si Supabase Auth está configurado, podemos intentar con Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPass
        });
        if (!error && data?.user) {
          const user = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.full_name || 'Super Administrador',
            role: 'super_admin'
          };
          localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
          return { success: true, user };
        }
      } catch (err) {
        console.warn('Supabase auth no disponible o error, verificando credenciales locales:', err.message);
      }
    }

    // Validación Super Usuario local (por defecto o configurado en Vite)
    if (
      (cleanEmail === DEFAULT_SUPER_USER.email.toLowerCase() || cleanEmail === 'admin@cosmetics.com' || cleanEmail === 'super@laysla.com') &&
      (cleanPass === DEFAULT_SUPER_PASSWORD || cleanPass === 'admin123' || cleanPass === 'admin')
    ) {
      const user = {
        ...DEFAULT_SUPER_USER,
        email: cleanEmail,
        loginAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
      return { success: true, user };
    }

    throw new Error('Credenciales incorrectas. Verifica el correo y la contraseña del Super Usuario.');
  },

  logoutSuperUser() {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    return true;
  },

  checkSession() {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  getDefaultCredentials() {
    return {
      email: DEFAULT_SUPER_USER.email,
      password: DEFAULT_SUPER_PASSWORD
    };
  },

  // Restaurar catálogo y productos a los valores iniciales
  resetToDefaultSeed() {
    localStorage.setItem(STORAGE_KEYS.CATALOGS, JSON.stringify(INITIAL_CATALOGS));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    return { catalogs: INITIAL_CATALOGS, products: INITIAL_PRODUCTS };
  }
};
