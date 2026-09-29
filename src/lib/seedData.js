export const INITIAL_CATALOGS = [
  {
    id: 'cat-facial',
    name: 'Cuidado Facial',
    slug: 'cuidado-facial',
    description: 'Serums, cremas hidratantes y elixires para una piel luminosa, tersa y sana.',
    icon: '🌸',
    badge: 'Favorito',
    displayOrder: 1
  },
  {
    id: 'cat-labios',
    name: 'Labios & Brillos',
    slug: 'labios-brillos',
    description: 'Bálsamos ultra hidratantes, aceites labiales nutritivos y tintas con acabado sedoso.',
    icon: '💄',
    badge: 'Tendencia',
    displayOrder: 2
  },
  {
    id: 'cat-ojos',
    name: 'Ojos & Mirada',
    slug: 'ojos-mirada',
    description: 'Sombras en tonos rosa pastel, máscaras alargadoras y delineadores precisos.',
    icon: '✨',
    badge: 'Nuevo',
    displayOrder: 3
  },
  {
    id: 'cat-rostro',
    name: 'Rostro & Iluminación',
    slug: 'rostro-iluminacion',
    description: 'Rubores aterciopelados, iluminadores perla y bases ligeras con efecto filtro natural.',
    icon: '🎀',
    badge: 'Popular',
    displayOrder: 4
  },
  {
    id: 'cat-corporal',
    name: 'Cuidado Corporal',
    slug: 'cuidado-corporal',
    description: 'Exfoliantes suaves, mantecas batidas y lociones aromáticas para consentir tu cuerpo.',
    icon: '🛁',
    badge: 'Spa en Casa',
    displayOrder: 5
  },
  {
    id: 'cat-fragancias',
    name: 'Brumas & Fragancias',
    slug: 'brumas-fragancias',
    description: 'Mists aromáticos con notas de peonía, pétalos de rosa y vainilla suave.',
    icon: '🌷',
    badge: 'Esencias',
    displayOrder: 6
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-01',
    catalogId: 'cat-facial',
    catalogSlug: 'cuidado-facial',
    name: 'Serum Iluminador de Rosas & Niacinamida',
    benefitLegend: '¿Para qué sirve? Despierta la vitalidad de la piel opaca o cansada. Su fórmula equilibra la producción de grasa, difumina manchas leves y aporta una luminosidad perlada inmediata con un acabado suave como terciopelo.',
    ingredients: 'Agua de Rosas de Damasco pura, Niacinamida 5%, Ácido Hialurónico vegetal y Vitamina E.',
    cost: 28.50,
    stock: 24,
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    isFeatured: true
  },
  {
    id: 'prod-02',
    catalogId: 'cat-facial',
    catalogSlug: 'cuidado-facial',
    name: 'Crema Hidratante Cloud Mousse de Peonía',
    benefitLegend: '¿Para qué sirve? Hidrata profundamente durante 48 horas sin sensación pesada. Calma rojeces provocadas por el frío o estrés ambiental, reforzando la barrera cutánea con una textura etérea que se absorbe al contacto.',
    ingredients: 'Extracto de flor de Peonía, Ceramidas botánicas, Manteca de Karité batida y Pantenol.',
    cost: 34.00,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    isFeatured: true
  },
  {
    id: 'prod-03',
    catalogId: 'cat-facial',
    catalogSlug: 'cuidado-facial',
    name: 'Tónico Facial Calmante Lotus & Manzanilla',
    benefitLegend: '¿Para qué sirve? Restablece el pH natural después de la limpieza diaria. Reduce la sensibilidad, desinflama y prepara los poros para que absorban 3 veces mejor tus serums y cremas.',
    ingredients: 'Extracto de flor de loto sagrado, Hidrolato de manzanilla silvestre y Alantoína calmante.',
    cost: 19.90,
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-54876383637e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    isFeatured: false
  },
  {
    id: 'prod-04',
    catalogId: 'cat-labios',
    catalogSlug: 'labios-brillos',
    name: 'Lip Oil Voluminizador Pétalo Rosé',
    benefitLegend: '¿Para qué sirve? Ofrece un brillo espejo ultra reflectante sin ser pegajoso. Rellena las líneas finas de los labios, activa la microcirculación para un toque de volumen natural y nutre intensamente con tonalidad rosa translúcida.',
    ingredients: 'Aceite de Jojoba prensado en frío, Complejo de tripéptidos voluminizadores y Vitamina E.',
    cost: 16.50,
    stock: 42,
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    isFeatured: true
  },
  {
    id: 'prod-05',
    catalogId: 'cat-labios',
    catalogSlug: 'labios-brillos',
    name: 'Bálsamo Reparador Noche Velvet Berry',
    benefitLegend: '¿Para qué sirve? Mascarilla de rescate nocturno que repara labios secos, descamados o expuestos al sol y frío. Al despertar sentirás tus labios carnosos, suaves y profundamente acondicionados.',
    ingredients: 'Cera vegetal de arroz, Aceite de frambuesa silvestre, Manteca de Murumuru.',
    cost: 14.50,
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    isFeatured: false
  },
  {
    id: 'prod-06',
    catalogId: 'cat-ojos',
    catalogSlug: 'ojos-mirada',
    name: 'Paleta de Sombras Pastel Dream 9 Tonos',
    benefitLegend: '¿Para qué sirve? Diseñada para crear maquillajes etéreos y elegantes. Incluye acabados mates sedosos, satinados rosas y perlas champaña de alta pigmentación que no se cuartean en el párpado.',
    ingredients: 'Pigmentos minerales micronizados, Mica de origen ético, Polvos de seda vegetal.',
    cost: 32.00,
    stock: 11,
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    isFeatured: true
  },
  {
    id: 'prod-07',
    catalogId: 'cat-ojos',
    catalogSlug: 'ojos-mirada',
    name: 'Máscara Efecto Abanico Fluttery Lash Rosé',
    benefitLegend: '¿Para qué sirve? Alarga, curva y separa cada pestaña sin crear grumos molestos. Enriquecida con aceite de ricino para nutrir y fortalecer el crecimiento natural de las pestañas.',
    ingredients: 'Aceite de ricino fortalecedor, Cera de carnauba, Pantenol acondicionador.',
    cost: 18.00,
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    isFeatured: false
  },
  {
    id: 'prod-08',
    catalogId: 'cat-rostro',
    catalogSlug: 'rostro-iluminacion',
    name: 'Rubor Líquido Soft Flush tono Pink Blossom',
    benefitLegend: '¿Para qué sirve? Aporta el toque saludable de mejillas sonrojadas que dura todo el día (12 horas). Se difumina con los dedos o esponja sin mover la base de maquillaje, dejando un acabado jugoso y juvenil.',
    ingredients: 'Pigmentos híbridos hidro-sensibles, Escualano de oliva y Aceite de semilla de chía.',
    cost: 22.00,
    stock: 28,
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    isFeatured: true
  },
  {
    id: 'prod-09',
    catalogId: 'cat-rostro',
    catalogSlug: 'rostro-iluminacion',
    name: 'Iluminador Líquido Perla Champagne & Oro Rosa',
    benefitLegend: '¿Para qué sirve? Captura la luz en los puntos altos del rostro (pómulos, arco de cupido y nariz) simulando un resplandor celestial natural, sin partículas gruesas de purpurina.',
    ingredients: 'Microesferas de perla mineral, Extracto de loto de nieve y Ácido Hialurónico micro.',
    cost: 26.00,
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    isFeatured: true
  },
  {
    id: 'prod-10',
    catalogId: 'cat-corporal',
    catalogSlug: 'cuidado-corporal',
    name: 'Exfoliante de Azúcar Rosa & Pétalos de Hibisco',
    benefitLegend: '¿Para qué sirve? Pule con suavidad la piel del cuerpo retirando células muertas y asperezas en codos y rodillas. Al entrar en contacto con el agua se transforma en una leche humectante que no deja residuos grasos.',
    ingredients: 'Cristales de azúcar de caña virgen, Polvo de hibisco orgánico y Aceite de almendras dulces.',
    cost: 25.00,
    stock: 9,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    isFeatured: false
  },
  {
    id: 'prod-11',
    catalogId: 'cat-corporal',
    catalogSlug: 'cuidado-corporal',
    name: 'Crema Corporal Batida Soufflé de Jazmín & Vainilla',
    benefitLegend: '¿Para qué sirve? Nutrición ultra intensiva para pieles secas. Su textura aireada tipo soufflé calma la tirantez y deja una estela perfumada suave que acompaña durante horas.',
    ingredients: 'Manteca de Karité pura, Aceite de semilla de uva, Extracto de jazmín sambac y vainilla.',
    cost: 27.50,
    stock: 14,
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    isFeatured: false
  },
  {
    id: 'prod-12',
    catalogId: 'cat-fragancias',
    catalogSlug: 'brumas-fragancias',
    name: 'Bruma Refrescante Dewy Peony Glow Mist',
    benefitLegend: '¿Para qué sirve? Bruma multifuncional: fija el maquillaje por más tiempo, refresca el cutis durante el día en la oficina o días calurosos, y aromatiza con una fragancia romántica a peonías frescas.',
    ingredients: 'Agua termal de manantial, Niacinamida al 2%, Glicerina vegetal y Aceite esencial de peonía.',
    cost: 21.50,
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    isFeatured: true
  }
];

export const PRESET_IMAGE_SUGGESTIONS = [
  { label: 'Serum & Gotero Rosado', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80' },
  { label: 'Crema Hidratante Blanca', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80' },
  { label: 'Tónico Botánico Elegante', url: 'https://images.unsplash.com/photo-1608248597359-54876383637e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Lip Gloss / Labial Rosa', url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80' },
  { label: 'Bálsamo Labial Delicado', url: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Paleta de Sombras Pastel', url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80' },
  { label: 'Rubor Líquido Rosé', url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80' },
  { label: 'Iluminador & Frasco Dorado', url: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80' },
  { label: 'Exfoliante & Sales de Baño', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
  { label: 'Loción & Crema de Manos', url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Perfume & Bruma Floral', url: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80' }
];
