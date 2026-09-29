<script>
  import { appState } from '../lib/appState.svelte.js';
  import { CheckCircle2, AlertCircle, Info, X } from 'lucide-svelte';
</script>

<div class="toast-container" aria-live="polite">
  {#each appState.toasts as toast (toast.id)}
    <div class="toast-item {toast.type}">
      {#if toast.type === 'success'}
        <CheckCircle2 size={18} class="toast-icon success" />
      {:else if toast.type === 'error'}
        <AlertCircle size={18} class="toast-icon error" />
      {:else}
        <Info size={18} class="toast-icon info" />
      {/if}

      <div class="toast-content">
        <p class="toast-text">{toast.message}</p>
      </div>

      <button class="toast-close" onclick={() => appState.removeToast(toast.id)} aria-label="Cerrar notificación">
        <X size={15} />
      </button>
    </div>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 380px;
    pointer-events: none;
  }

  .toast-item {
    pointer-events: auto;
    background: #FFFFFF;
    border: 1px solid var(--pink-200);
    border-radius: var(--radius-md);
    box-shadow: 0 10px 25px rgba(244, 135, 164, 0.22);
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes toastIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .toast-item.success {
    border-left: 4px solid var(--stock-green);
  }

  .toast-item.error {
    border-left: 4px solid var(--stock-red);
  }

  .toast-item.info {
    border-left: 4px solid var(--pink-400);
  }

  .toast-icon.success {
    color: var(--stock-green);
    flex-shrink: 0;
  }

  .toast-icon.error {
    color: var(--stock-red);
    flex-shrink: 0;
  }

  .toast-icon.info {
    color: var(--pink-500);
    flex-shrink: 0;
  }

  .toast-content {
    flex: 1;
  }

  .toast-text {
    font-size: 0.86rem;
    color: var(--text-dark);
    line-height: 1.4;
  }

  .toast-close {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .toast-close:hover {
    color: var(--pink-600);
    background-color: var(--pink-100);
  }
</style>
