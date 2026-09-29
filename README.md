# 🌸 Laysla Cosmetics - Tienda de Cosméticos Boutique

Una moderna y elegante tienda web de cosméticos desarrollada con **Svelte 5** y **Vite**, con una estética en **blanco y rosado pastel**, **tipografía cursiva suave y editorial**, navegación por catálogos, leyenda explicativa de beneficios en cada cosmético, costos, control de stock en almacén en tiempo real, autenticación de **Super Usuario** y arquitectura lista para conectar con **Supabase**.

---

## ✨ Características Principales

1. **Paleta de Colores Blanco & Rosado Pastel**:
   - Fondos luminosos en blanco puro y crema perlado (`#FFFFFF`, `#FFF8F9`).
   - Tonos rosados pastel seleccionados (`#FFE6ED`, `#FFD4DF`, `#FBAEC2`, acento `#E65A84`).
   - Efectos de desenfoque *glassmorphism*, bordes suaves y sombras con destello rosado.

2. **Tipografía Cursiva y Elegante**:
   - Tipografía cursiva de acento: *Alex Brush* y *Dancing Script* de Google Fonts para nombres de marca, títulos y leyendas especiales.
   - Tipografía editorial: *Playfair Display* para encabezados y precios.
   - Tipografía sans-serif: *Plus Jakarta Sans* para una lectura limpia de ingredientes y descripciones.

3. **Navegación y Filtros por Catálogos**:
   - Pestañas dinámicas para navegar por colecciones: *Cuidado Facial*, *Labios & Brillos*, *Ojos & Mirada*, *Rostro & Iluminación*, *Cuidado Corporal* y *Brumas & Fragancias*.
   - Contador de productos disponibles en cada catálogo en tiempo real.
   - Buscador predictivo por nombre, leyenda de beneficios o ingredientes.

4. **Información Detallada por Producto**:
   - **Leyenda del por qué sirve**: Explicación clara de qué beneficios aporta a la piel o cómo embellece.
   - **Costo / Precio**: Mostrado en formato destacado con tipografía serif.
   - **Cantidad en Almacén**: Badge visual dinámico (*Disponible*, *Pocas unidades*, *Agotado en almacén*) sincronizado con el inventario.
   - Modal interactivo para visualizar ingredientes, beneficios botánicos y seleccionar cantidades.

5. **Panel y Login de Super Usuario**:
   - Modal de autenticación con acceso rápido de demostración.
   - Carga y publicación de **nuevos productos** (nombre, catálogo, leyenda de por qué sirve, costo, cantidad en almacén, foto con presets y checkbox de favorito).
   - Creación y gestión de **nuevos catálogos** con nombre, icono/emoji, insignia y descripción.
   - Ajuste rápido de existencias en almacén con botones directos `+` y `-`.
   - Modificación y eliminación de productos existentes.

6. **Bolsa de Compras Interactiva**:
   - Panel lateral deslizable con cálculo de subtotal.
   - Beneficio de envío gratuito al superar compras de $45.
   - Simulación de confirmación de pedido que actualiza el inventario.

7. **Preparado para Conexión con Supabase**:
   - Módulo cliente `src/lib/supabaseClient.js` listo para leer variables de entorno.
   - Capa de servicio `src/lib/api.js` con soporte dual: trabaja de forma local y persistente con `localStorage`, y se conecta automáticamente a Supabase si se configuran las variables.
   - Archivo SQL `supabase_schema.sql` con la definición de tablas `catalogs` y `products`, políticas de seguridad RLS y datos iniciales.

---

## 🔑 Credenciales del Super Usuario por Defecto

Para acceder al panel de administración:
- **Correo:** `admin@layslacosmetics.com`
- **Contraseña:** `layslaadmin2026`
- *(También puedes presionar el botón "Usar credenciales de demostración" dentro de la ventana de login)*.

---

## 📁 Arquitectura por Componentes (Svelte)

```text
laysla-shop/
├── src/
│   ├── components/
│   │   ├── Navbar.svelte           # Barra superior, marca cursiva, búsqueda, estado y carrito
│   │   ├── HeroBanner.svelte       # Banner boutique con títulos cursivos y sellos botánicos
│   │   ├── CatalogSelector.svelte  # Selector y filtros por catálogos dinámicos
│   │   ├── ProductCard.svelte      # Tarjeta: foto, leyenda del por qué sirve, costo y almacén
│   │   ├── ProductModal.svelte     # Modal de vista completa e ingredientes
│   │   ├── CartDrawer.svelte       # Bolsa de compras lateral
│   │   ├── LoginModal.svelte       # Modal de acceso del Super Usuario
│   │   ├── AdminPanel.svelte       # Panel administrativo (CRUD de catálogos y productos)
│   │   ├── Footer.svelte           # Pie de página y suscripción al Club Rosa
│   │   └── Toast.svelte            # Notificaciones emergentes
│   ├── lib/
│   │   ├── api.js                  # Capa de servicio preparada para Supabase y LocalStorage
│   │   ├── appState.svelte.js      # Estado global reactivo con Runes de Svelte 5
│   │   ├── seedData.js             # Datos iniciales realistas con fotos cosméticas
│   │   └── supabaseClient.js       # Cliente inicializador de Supabase
│   ├── app.css                     # Sistema de diseño con paleta rosado pastel y cursivas
│   ├── App.svelte                  # Componente raíz ensamblador
│   └── main.js                     # Punto de entrada de la aplicación
├── .env.example                    # Plantilla de variables para Supabase
├── supabase_schema.sql             # Script SQL completo para crear la base de datos
└── package.json
```

---

## 🚀 Cómo Ejecutar el Proyecto

1. **Instalar dependencias** (si no se han instalado):
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre tu navegador en `http://localhost:5173`.

3. **Construir para producción**:
   ```bash
   npm run build
   ```

---

## ⚡ Conexión Futura con Supabase

Cuando desees conectar la tienda a una base de datos Supabase en la nube:

1. Crea un proyecto gratuito en [supabase.com](https://supabase.com).
2. Entra en la sección **SQL Editor** en el panel de Supabase.
3. Copia todo el contenido del archivo [`supabase_schema.sql`](file:///c:/laysla-shop/supabase_schema.sql) y haz clic en **Run**.
4. Crea un archivo `.env` en la raíz del proyecto con tus credenciales:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-clave-anon-publica
   VITE_ADMIN_EMAIL=admin@layslacosmetics.com
   VITE_ADMIN_PASSWORD=layslaadmin2026
   ```
5. Reinicia `npm run dev`. La tienda detectará la conexión y sincronizará en tiempo real con Supabase.
