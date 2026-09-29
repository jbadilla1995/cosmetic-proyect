<script>
  import { appState } from '../lib/appState.svelte.js';
  import { Heart, Sparkles, Send, ShieldCheck, Mail, Phone, MapPin } from 'lucide-svelte';

  let emailSub = $state('');

  function handleSubscribe(e) {
    e.preventDefault();
    if (emailSub.trim()) {
      appState.showToast('🌸 ¡Gracias por unirte al Club Laysla! Recibirás tu código del 15% por correo.', 'success');
      emailSub = '';
    }
  }
</script>

<footer class="shop-footer">
  <div class="footer-container">
    <div class="footer-grid">
      <!-- Columna 1: Marca & Misión -->
      <div class="footer-col brand-col">
        <div class="footer-logo">
          <span class="logo-script font-cursive-accent">Laysla</span>
          <span class="logo-sub font-serif">COSMETICS</span>
        </div>
        <p class="brand-desc">
          Cosméticos botánicos y maquillaje en tonalidades pastel, diseñados para cuidar tu piel con delicadeza, amor y resplandor natural.
        </p>
        <div class="quote-box">
          <Sparkles size={14} class="quote-icon" />
          <span class="font-cursive quote-text">"La belleza empieza en el momento en que decides amarte tal como eres."</span>
        </div>
      </div>

      <!-- Columna 2: Catálogos Rápidos -->
      <div class="footer-col">
        <h4 class="footer-heading">Nuestros Catálogos</h4>
        <ul class="footer-links">
          {#each appState.catalogs.slice(0, 5) as cat}
            <li>
              <button class="footer-link-btn" onclick={() => appState.selectCatalog(cat.slug)}>
                <span>{cat.icon}</span> {cat.name}
              </button>
            </li>
          {/each}
          <li>
            <button class="footer-link-btn" onclick={() => appState.selectCatalog('todos')}>
              <span>✨</span> Todos los Cosméticos
            </button>
          </li>
        </ul>
      </div>

      <!-- Columna 3: Compromiso & Calidad -->
      <div class="footer-col">
        <h4 class="footer-heading">Nuestro Compromiso</h4>
        <ul class="commitments-list">
          <li>
            <span class="commit-dot">🌸</span>
            <span>Fórmulas 100% Libres de Crueldad Animal (Cruelty Free)</span>
          </li>
          <li>
            <span class="commit-dot">🌿</span>
            <span>Extractos Botánicos de Rosas, Peonías y Manzanilla</span>
          </li>
          <li>
            <span class="commit-dot">💧</span>
            <span>Ácido Hialurónico vegetal y Niacinamida purificada</span>
          </li>
          <li>
            <span class="commit-dot">📦</span>
            <span>Control de Stock en Almacén verificado en tiempo real</span>
          </li>
        </ul>
      </div>

      <!-- Columna 4: Newsletter & Club Rosa -->
      <div class="footer-col">
        <h4 class="footer-heading">Club Rosa Laysla</h4>
        <p class="newsletter-desc">
          Suscríbete y recibe un <strong>15% OFF</strong> en tu primera orden, tips de skincare y lanzamientos exclusivos.
        </p>
        <form onsubmit={handleSubscribe} class="newsletter-form">
          <input 
            type="email" 
            placeholder="tu-correo@ejemplo.com" 
            bind:value={emailSub}
            class="newsletter-input"
            required
          />
          <button type="submit" class="newsletter-btn" aria-label="Suscribirse">
            <Send size={16} />
          </button>
        </form>
        <div class="super-access-link-wrap">
          <button class="super-link" onclick={() => appState.isLoginOpen = true}>
            <ShieldCheck size={14} /> Login
          </button>
        </div>
      </div>
    </div>

    <!-- Barra inferior de copyright -->
    <div class="footer-bottom">
      <div class="bottom-left">
        © 2026 Laysla Cosmetics. Todos los derechos reservados.
      </div>
      <div class="bottom-right font-cursive">
        Diseñado con ternura, tonos pastel y belleza botánica ✨
      </div>
    </div>
  </div>
</footer>

<style>
  .shop-footer {
    background: linear-gradient(180deg, rgba(255, 240, 244, 0.4) 0%, #FFFFFF 30%, #FFE6ED 100%);
    border-top: 1px solid var(--pink-200);
    padding: 60px 24px 24px;
    margin-top: 60px;
  }

  .footer-container {
    max-width: 1240px;
    margin: 0 auto;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1.1fr 1.2fr;
    gap: 40px;
    margin-bottom: 40px;
  }

  .footer-logo {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
  }

  .logo-script {
    font-size: 2.8rem;
    color: var(--pink-600);
    line-height: 0.9;
  }

  .logo-sub {
    font-size: 0.68rem;
    letter-spacing: 4px;
    color: var(--text-muted);
    font-weight: 600;
  }

  .brand-desc {
    font-size: 0.88rem;
    color: var(--text-body);
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .quote-box {
    background: var(--pink-50);
    border: 1px dashed var(--pink-300);
    border-radius: var(--radius-md);
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .quote-box :global(.quote-icon) {
    color: var(--pink-500);
    flex-shrink: 0;
  }

  .quote-text {
    font-size: 1.15rem;
    color: var(--pink-700);
    line-height: 1.2;
  }

  .footer-heading {
    font-family: var(--font-serif);
    font-size: 1.15rem;
    color: var(--text-dark);
    margin-bottom: 18px;
    position: relative;
    padding-bottom: 8px;
  }

  .footer-heading::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 32px;
    height: 2px;
    background-color: var(--pink-400);
    border-radius: 2px;
  }

  .footer-links, .commitments-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .footer-link-btn {
    background: none;
    border: none;
    color: var(--text-body);
    font-size: 0.88rem;
    font-family: var(--font-sans);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 2px 0;
    transition: var(--transition-smooth);
  }

  .footer-link-btn:hover {
    color: var(--pink-600);
    transform: translateX(4px);
  }

  .commitments-list li {
    font-size: 0.84rem;
    color: var(--text-body);
    display: flex;
    align-items: flex-start;
    gap: 8px;
    line-height: 1.45;
  }

  .commit-dot {
    font-size: 0.95rem;
    line-height: 1.2;
  }

  .newsletter-desc {
    font-size: 0.86rem;
    color: var(--text-body);
    line-height: 1.5;
    margin-bottom: 14px;
  }

  .newsletter-form {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }

  .newsletter-input {
    flex: 1;
    padding: 10px 14px;
    background: #FFFFFF;
    border: 1.5px solid var(--pink-200);
    border-radius: var(--radius-full);
    font-size: 0.86rem;
    outline: none;
    transition: var(--transition-smooth);
  }

  .newsletter-input:focus {
    border-color: var(--pink-400);
    box-shadow: 0 0 0 3px rgba(244, 135, 164, 0.15);
  }

  .newsletter-btn {
    background: linear-gradient(135deg, #FBAEC2 0%, #E65A84 100%);
    border: none;
    color: #FFFFFF;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .newsletter-btn:hover {
    transform: scale(1.05);
  }

  .super-access-link-wrap {
    margin-top: 10px;
  }

  .super-link {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 0;
  }

  .super-link:hover {
    color: var(--pink-600);
    text-decoration: underline;
  }

  .footer-bottom {
    padding-top: 24px;
    border-top: 1px solid var(--pink-200);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.82rem;
    color: var(--text-muted);
  }

  .bottom-right {
    font-size: 1.15rem;
    color: var(--pink-600);
    font-weight: 700;
  }

  @media (max-width: 960px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 600px) {
    .footer-grid {
      grid-template-columns: 1fr;
    }

    .footer-bottom {
      flex-direction: column;
      gap: 8px;
      text-align: center;
    }
  }
</style>
