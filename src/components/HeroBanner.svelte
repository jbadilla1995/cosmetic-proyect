<script>
  import { appState } from '../lib/appState.svelte.js';
  import { Sparkles, Heart, ShieldCheck, ArrowRight } from 'lucide-svelte';

  function scrollToCatalog() {
    const el = document.getElementById('catalogo-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<section class="hero-section">
  <div class="hero-container">
    <div class="hero-content">
      <div class="hero-badge">
        <Sparkles size={15} class="badge-sparkle" />
        <span class="font-cursive badge-text">Colección Primavera Pastel 2026</span>
      </div>

      <h1 class="hero-title">
        La caricia más dulce <br />
        <span class="hero-cursive-title">para el cuidado de tu piel</span>
      </h1>

      <p class="hero-description">
        Fórmulas cosméticas limpias, enriquecidas con extractos botánicos, ácido hialurónico y pigmentos sedosos. Cada producto está formulado para realzar tu belleza auténtica con un acabado luminoso y natural.
      </p>

      <div class="hero-cta-group">
        <button class="btn-primary hero-btn" onclick={scrollToCatalog}>
          Explorar Catálogos <ArrowRight size={18} />
        </button>
        <button class="btn-secondary" onclick={() => appState.selectCatalog('todos')}>
          Ver Todo el Inventario
        </button>
      </div>

      <!-- Métricas y Sellos de Confianza -->
      <div class="hero-features">
        <div class="feature-item">
          <div class="feature-icon-box">
            <Heart size={16} />
          </div>
          <div>
            <div class="feature-title">100% Cruelty Free</div>
            <div class="feature-sub">Sin pruebas en animales</div>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon-box">
            <Sparkles size={16} />
          </div>
          <div>
            <div class="feature-title">Fórmulas Botánicas</div>
            <div class="feature-sub">Pétalos de rosa y peonía</div>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon-box">
            <ShieldCheck size={16} />
          </div>
          <div>
            <div class="feature-title">Inventario en Vivo</div>
            <div class="feature-sub">Stock en almacén al instante</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Visual Hero Card -->
    <div class="hero-visual">
      <div class="visual-glow"></div>
      
      <div class="card-showcase main-card">
        <div class="showcase-img-wrap">
          <img 
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80" 
            alt="Serum Iluminador Pétalos de Rosa" 
            class="showcase-img"
          />
          <span class="showcase-tag font-cursive">Favorito del Mes</span>
        </div>
        <div class="showcase-info">
          <div class="showcase-rating">★★★★★ <span>(5.0)</span></div>
          <h3 class="showcase-name">Serum Iluminador Rosas</h3>
          <p class="showcase-benefit">¿Para qué sirve? Revitaliza el cutis cansado y aporta brillo de seda inmediato.</p>
          <div class="showcase-footer">
            <span class="showcase-price">$28.50</span>
            <span class="stock-badge stock-high">● 24 en almacén</span>
          </div>
        </div>
      </div>

      <!-- Tarjeta flotante complementaria -->
      <div class="floating-badge-card">
        <div class="floating-icon">💄</div>
        <div>
          <div class="font-cursive floating-quote">"Suave como un pétalo"</div>
          <div class="floating-sub">Texturas ligeras sin efecto graso</div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    padding: 50px 24px 60px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 240, 244, 0.5) 100%);
    overflow: hidden;
  }

  .hero-container {
    max-width: 1240px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 40px;
    align-items: center;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: var(--pink-100);
    border: 1px solid var(--pink-200);
    padding: 6px 16px;
    border-radius: var(--radius-full);
    margin-bottom: 20px;
  }

  .hero-badge :global(.badge-sparkle) {
    color: var(--pink-500);
  }

  .badge-text {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--pink-700);
  }

  .hero-title {
    font-family: var(--font-serif);
    font-size: clamp(2.4rem, 4.2vw, 3.6rem);
    font-weight: 700;
    color: var(--text-dark);
    line-height: 1.18;
    margin-bottom: 18px;
  }

  .hero-cursive-title {
    font-family: var(--font-cursive);
    color: var(--pink-600);
    font-weight: 700;
    font-size: clamp(2.8rem, 5vw, 4.2rem);
    display: block;
    line-height: 1.05;
  }

  .hero-description {
    font-size: 1.05rem;
    color: var(--text-body);
    line-height: 1.7;
    max-width: 560px;
    margin-bottom: 30px;
  }

  .hero-cta-group {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 40px;
  }

  .hero-btn {
    padding: 13px 28px;
    font-size: 1.02rem;
  }

  .hero-features {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--pink-200);
    width: 100%;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .feature-icon-box {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--pink-100);
    color: var(--pink-600);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--pink-200);
  }

  .feature-title {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--text-dark);
  }

  .feature-sub {
    font-size: 0.74rem;
    color: var(--text-muted);
  }

  /* Visual Showcase */
  .hero-visual {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .visual-glow {
    position: absolute;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(251, 174, 194, 0.45) 0%, rgba(255, 230, 237, 0) 70%);
    filter: blur(30px);
    z-index: 1;
  }

  .main-card {
    position: relative;
    z-index: 2;
    background: #FFFFFF;
    border-radius: var(--radius-lg);
    border: 1px solid var(--pink-200);
    box-shadow: 0 20px 40px rgba(244, 135, 164, 0.2);
    overflow: hidden;
    width: 100%;
    max-width: 360px;
    transition: transform 0.35s ease;
  }

  .main-card:hover {
    transform: translateY(-5px);
  }

  .showcase-img-wrap {
    position: relative;
    height: 250px;
    overflow: hidden;
    background-color: var(--pink-50);
  }

  .showcase-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  .main-card:hover .showcase-img {
    transform: scale(1.05);
  }

  .showcase-tag {
    position: absolute;
    top: 14px;
    right: 14px;
    background: rgba(255, 255, 255, 0.95);
    color: var(--pink-600);
    padding: 4px 14px;
    border-radius: var(--radius-full);
    font-size: 1.1rem;
    font-weight: 700;
    box-shadow: var(--shadow-sm);
  }

  .showcase-info {
    padding: 18px 20px 22px;
  }

  .showcase-rating {
    color: #F6AD55;
    font-size: 0.85rem;
    margin-bottom: 4px;
  }

  .showcase-rating span {
    color: var(--text-muted);
    font-size: 0.75rem;
  }

  .showcase-name {
    font-family: var(--font-serif);
    font-size: 1.15rem;
    color: var(--text-dark);
    margin-bottom: 6px;
  }

  .showcase-benefit {
    font-size: 0.82rem;
    color: var(--text-body);
    line-height: 1.45;
    margin-bottom: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .showcase-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid var(--pink-100);
  }

  .showcase-price {
    font-family: var(--font-serif);
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--pink-600);
  }

  .floating-badge-card {
    position: absolute;
    bottom: -20px;
    left: -10px;
    z-index: 3;
    background: rgba(255, 255, 255, 0.96);
    border: 1px solid var(--pink-200);
    box-shadow: 0 10px 25px rgba(244, 135, 164, 0.22);
    padding: 12px 18px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    gap: 12px;
    backdrop-filter: blur(8px);
    animation: float 4s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  .floating-icon {
    font-size: 1.6rem;
  }

  .floating-quote {
    color: var(--pink-600);
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1;
  }

  .floating-sub {
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  @media (max-width: 960px) {
    .hero-container {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .hero-content {
      align-items: center;
    }

    .hero-description {
      text-align: center;
    }

    .hero-cta-group {
      justify-content: center;
    }

    .hero-features {
      justify-content: center;
    }

    .floating-badge-card {
      left: 10px;
      bottom: -15px;
    }
  }
</style>
