-- ====================================================================
-- ESQUEMA SQL PARA SUPABASE - TIENDA DE COSMÉTICOS LAYSLA
-- ====================================================================
-- Instrucciones de uso:
-- 1. Inicia sesión en tu panel de Supabase (https://app.supabase.com)
-- 2. Dirígete a la sección "SQL Editor" en el menú lateral
-- 3. Crea una "New Query", pega este código completo y presiona "Run"
-- ====================================================================

-- 1. TABLA DE CATÁLOGOS / CATEGORÍAS
CREATE TABLE IF NOT EXISTS public.catalogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(20) DEFAULT '✨',
    badge VARCHAR(50),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABLA DE PRODUCTOS
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    catalog_id UUID REFERENCES public.catalogs(id) ON DELETE SET NULL,
    catalog_slug VARCHAR(100),
    name VARCHAR(200) NOT NULL,
    benefit_legend TEXT NOT NULL,          -- Leyenda de por qué sirve y sus beneficios
    ingredients TEXT,                      -- Ingredientes destacados o modo de uso
    cost NUMERIC(10, 2) NOT NULL DEFAULT 0.00, -- Costo o precio unitario
    stock INT NOT NULL DEFAULT 0,          -- Cantidad disponible en almacén
    image_url TEXT,                        -- Enlace a la imagen del producto
    rating NUMERIC(2, 1) DEFAULT 4.9,      -- Calificación promedio
    is_featured BOOLEAN DEFAULT false,     -- Destacado en portada
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para optimizar búsquedas por catálogo y stock
CREATE INDEX IF NOT EXISTS idx_products_catalog_id ON public.products(catalog_id);
CREATE INDEX IF NOT EXISTS idx_products_catalog_slug ON public.products(catalog_slug);
CREATE INDEX IF NOT EXISTS idx_products_stock ON public.products(stock);

-- 3. POLÍTICAS DE SEGURIDAD A NIVEL DE FILAS (Row Level Security - RLS)
ALTER TABLE public.catalogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Política de lectura pública: Cualquier visitante puede ver catálogos y productos
CREATE POLICY "Permitir lectura publica de catalogos"
    ON public.catalogs FOR SELECT
    USING (true);

CREATE POLICY "Permitir lectura publica de productos"
    ON public.products FOR SELECT
    USING (true);

-- Política de modificación: Solo usuarios autenticados (Super Usuarios) pueden insertar, actualizar o eliminar
CREATE POLICY "Permitir gestion de catalogos para administradores"
    ON public.catalogs FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Permitir gestion de productos para administradores"
    ON public.products FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ====================================================================
-- DATOS INICIALES (SEMILLA / SEED)
-- ====================================================================

INSERT INTO public.catalogs (id, name, slug, description, icon, badge, display_order)
VALUES 
    ('c1111111-1111-1111-1111-111111111111', 'Cuidado Facial', 'cuidado-facial', 'Serums, tónicos y cremas hidratantes para un cutis de porcelana', '🌸', 'Más Popular', 1),
    ('c2222222-2222-2222-2222-222222222222', 'Labios & Brillos', 'labios-brillos', 'Bálsamos reparadores, tintas y gloss voluminizadores sedosos', '💄', 'Tendencia', 2),
    ('c3333333-3333-3333-3333-333333333333', 'Ojos & Mirada', 'ojos-mirada', 'Paletas de sombras tonos rosa, delineadores y máscaras de pestañas', '✨', 'Nuevo', 3),
    ('c4444444-4444-4444-4444-444444444444', 'Rostro & Iluminación', 'rostro-iluminacion', 'Rubores aterciopelados, iluminadores perlados y polvos traslúcidos', '🎀', 'Favoritos', 4),
    ('c5555555-5555-5555-5555-555555555555', 'Cuidado Corporal', 'cuidado-corporal', 'Mantecas corporales, exfoliantes de azúcar rosada y cremas de manos', '🛁', 'Spa', 5),
    ('c6666666-6666-6666-6666-666666666666', 'Brumas & Fragancias', 'brumas-fragancias', 'Mists refrescantes con extracto de peonías y vainilla suave', '🌷', 'Edición Rosa', 6)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (catalog_id, catalog_slug, name, benefit_legend, ingredients, cost, stock, image_url, rating, is_featured)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'cuidado-facial', 'Serum Iluminador de Rosas & Niacinamida', '¿Para qué sirve? Revitaliza la piel apagada, unifica el tono y reduce poros visibles aportando un resplandor rosado natural sin acabado grasoso.', 'Agua de Rosas de Damasco, Niacinamida al 5%, Ácido Hialurónico vegetal y Vitamina E.', 28.50, 24, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', 5.0, true),
    ('c1111111-1111-1111-1111-111111111111', 'cuidado-facial', 'Crema Hidratante Cloud Mousse de Peonía', '¿Para qué sirve? Hidrata durante 48 horas continuas, sellando la barrera cutánea con una textura ligera como una nube que calma el enrojecimiento.', 'Extracto de Peonía blanca, Ceramidas 1, 3 y 6-II, Manteca de Karité batida.', 34.00, 15, 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', 4.9, true),
    ('c1111111-1111-1111-1111-111111111111', 'cuidado-facial', 'Tónico Facial Calmante Lotus & Manzanilla', '¿Para qué sirve? Equilibra el pH tras la limpieza, calma pieles reactivas y prepara los poros para absorber mejor los tratamientos posteriores.', 'Extracto de flor de loto, Hidrolato de manzanilla orgánica, Alantoína.', 19.90, 30, 'https://images.unsplash.com/photo-1608248597359-54876383637e?auto=format&fit=crop&w=800&q=80', 4.8, false),
    ('c2222222-2222-2222-2222-222222222222', 'labios-brillos', 'Lip Oil Voluminizador Pétalo Rosé', '¿Para qué sirve? Brinda volumen instantáneo con efecto espejo, nutriendo profundamente los labios secos o agrietados con un suave tono rosado translúcido.', 'Aceite de Jojoba prensado en frío, Péptidos de volumen y Vitamina E pura.', 16.50, 42, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80', 5.0, true),
    ('c2222222-2222-2222-2222-222222222222', 'labios-brillos', 'Bálsamo Labial Reparador Velvet Strawberry', '¿Para qué sirve? Regenera la piel de los labios mientras duermes o de día, dejando una capa protectora con aroma dulce a fresas silvestres.', 'Cera de abejas orgánica, Extracto de fresa silvestre, Manteca de Cacao.', 12.00, 18, 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=800&q=80', 4.7, false),
    ('c3333333-3333-3333-3333-333333333333', 'ojos-mirada', 'Paleta de Sombras Pastel Dream 9 Tonos', '¿Para qué sirve? Permite crear looks románticos de alta fijación, desde nudes satinados hasta rosas pasteles y destellos champaña que iluminan la mirada.', 'Pigmentos minerales micronizados, Mica natural de comercio ético, Sílice.', 32.00, 12, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80', 4.9, true),
    ('c4444444-4444-4444-4444-444444444444', 'rostro-iluminacion', 'Rubor Líquido Soft Flush tono Blossom', '¿Para qué sirve? Otorga un rubor natural y fresco de larga duración (12h) que se funde como una segunda piel sin mover la base de maquillaje.', 'Pigmentos hidratantes, Escualano vegetal, Extracto de Rosa Mosqueta.', 22.00, 28, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80', 5.0, true),
    ('c5555555-5555-5555-5555-555555555555', 'cuidado-corporal', 'Exfoliante Corporal de Azúcar Rosa & Hibisco', '¿Para qué sirve? Elimina células muertas y asperezas, mejorando la textura corporal y dejando la piel ultra suave, aterciopelada y perfumada.', 'Cristales finos de azúcar de caña, Extracto de flor de hibisco, Aceite de almendras dulces.', 25.00, 9, 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', 4.8, false),
    ('c6666666-6666-6666-6666-666666666666', 'brumas-fragancias', 'Bruma Refrescante Dewy Glow Peony & Vanilla', '¿Para qué sirve? Fija el maquillaje, hidrata al instante en cualquier momento del día y envuelve en un aroma delicado de flores rosadas.', 'Agua termal enriquecida, Extracto aromático de flor de peonía y vainilla de Madagascar.', 21.50, 35, 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80', 4.9, true)
ON CONFLICT (id) DO NOTHING;
