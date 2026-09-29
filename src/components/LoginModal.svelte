<script>
  import { appState } from '../lib/appState.svelte.js';
  import { api } from '../lib/api.js';
  import { X, Lock, ShieldCheck, Mail, Key, Sparkles, AlertCircle } from 'lucide-svelte';

  const defaultCreds = api.getDefaultCredentials();
  let email = $state(defaultCreds.email);
  let password = $state(defaultCreds.password);
  let errorMessage = $state('');
  let isSubmitting = $state(false);

  function fillDemo() {
    email = defaultCreds.email;
    password = defaultCreds.password;
    errorMessage = '';
  }

  async function handleLogin(e) {
    e.preventDefault();
    errorMessage = '';
    
    if (!email || !password) {
      errorMessage = 'Por favor completa todos los campos.';
      return;
    }

    isSubmitting = true;
    try {
      await appState.login(email, password);
      // Tras login exitoso, abrir el panel admin
      appState.isAdminOpen = true;
    } catch (err) {
      errorMessage = err.message || 'Error al autenticar Super Usuario.';
    } finally {
      isSubmitting = false;
    }
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) {
      appState.isLoginOpen = false;
    }
  }
</script>

{#if appState.isLoginOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-backdrop" onclick={handleBackdrop}>
    <div class="modal-content login-modal-box" role="dialog" aria-modal="true">
      <!-- Botón de Cerrar -->
      <button class="modal-close-btn" onclick={() => appState.isLoginOpen = false} aria-label="Cerrar modal">
        <X size={20} />
      </button>

      <div class="login-header">
        <div class="shield-badge">
          <ShieldCheck size={28} />
        </div>
        <h3 class="login-title">Iniciar Sesión</h3>
        <p class="font-cursive login-sub">Administración de Catálogos & Inventario de Cosméticos</p>
      </div>

      {#if errorMessage}
        <div class="error-alert">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      {/if}

      <form onsubmit={handleLogin} class="login-form">
        <div class="form-group">
          <label for="admin-email" class="form-label">Correo Electrónico</label>
          <div class="input-icon-wrap">
            <Mail size={17} class="field-icon" />
            <input 
              id="admin-email"
              type="email" 
              bind:value={email}
              class="form-input with-icon"
              placeholder="admin@layslacosmetics.com"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="admin-password" class="form-label">Contraseña</label>
          <div class="input-icon-wrap">
            <Key size={17} class="field-icon" />
            <input 
              id="admin-password"
              type="password" 
              bind:value={password}
              class="form-input with-icon"
              placeholder="••••••••••••"
              required
            />
          </div>
        </div>

        <!-- Botón Demo rápido -->
        <div class="demo-helper">
          <button type="button" class="demo-chip" onclick={fillDemo}>
            <Sparkles size={14} /> Usar credenciales de demostración
          </button>
        </div>

        <button type="submit" class="btn-primary submit-login-btn" disabled={isSubmitting}>
          {#if isSubmitting}
            <span>Iniciando sesión...</span>
          {:else}
            <Lock size={17} />
            <span>Iniciar Sesión</span>
          {/if}
        </button>
      </form>

      <div class="login-footer-info">
        <p>🔒 <strong>Acceso Administrativo:</strong> Permite cargar y editar catálogos, añadir productos cosméticos, actualizar leyendas de beneficios, costos y existencias en almacén.</p>
      </div>
    </div>
  </div>
{/if}

<style>
  .login-modal-box {
    max-width: 480px;
    padding: 32px 30px;
    position: relative;
    background: #FFFFFF;
  }

  .modal-close-btn {
    position: absolute;
    top: 18px;
    right: 18px;
    background: #FFFFFF;
    border: 1px solid var(--pink-200);
    border-radius: 50%;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .modal-close-btn:hover {
    background-color: var(--pink-100);
    color: var(--pink-600);
  }

  .login-header {
    text-align: center;
    margin-bottom: 22px;
  }

  .shield-badge {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #FFE6ED 0%, #FFD4DF 100%);
    color: var(--pink-600);
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    box-shadow: 0 4px 14px rgba(244, 135, 164, 0.25);
    border: 1px solid var(--pink-300);
  }

  .login-title {
    font-family: var(--font-serif);
    font-size: 1.55rem;
    color: var(--text-dark);
    margin-bottom: 4px;
  }

  .login-sub {
    font-size: 1.25rem;
    color: var(--pink-600);
    font-weight: 700;
  }

  .error-alert {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: var(--stock-red-bg);
    color: var(--stock-red);
    border: 1px solid rgba(229, 62, 62, 0.25);
    padding: 10px 14px;
    border-radius: var(--radius-md);
    font-size: 0.84rem;
    margin-bottom: 18px;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .input-icon-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon-wrap :global(.field-icon) {
    position: absolute;
    left: 14px;
    color: var(--pink-400);
    pointer-events: none;
  }

  .form-input.with-icon {
    padding-left: 42px;
  }

  .demo-helper {
    display: flex;
    justify-content: flex-end;
    margin-top: -6px;
  }

  .demo-chip {
    background: var(--pink-50);
    border: 1px dashed var(--pink-300);
    color: var(--pink-600);
    font-size: 0.78rem;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: var(--radius-full);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: var(--transition-smooth);
  }

  .demo-chip:hover {
    background: var(--pink-100);
    border-color: var(--pink-500);
  }

  .submit-login-btn {
    width: 100%;
    padding: 12px;
    font-size: 0.95rem;
    margin-top: 6px;
  }

  .login-footer-info {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid var(--border-delicate);
    font-size: 0.78rem;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .login-footer-info strong {
    color: var(--text-dark);
  }
</style>
