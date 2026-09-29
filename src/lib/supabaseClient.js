import { createClient } from '@supabase/supabase-js';

// Variables de entorno de Supabase configuradas desde Vite (.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Verifica si las credenciales de Supabase están configuradas
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('TU_SUPABASE') &&
  !supabaseAnonKey.includes('TU_ANON_KEY')
);

// Cliente de Supabase listo para usarse cuando se proporcionen las claves en el archivo .env
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (isSupabaseConfigured) {
  console.log('🌸 Conexión activa con Supabase inicializada con éxito.');
} else {
  console.log('🌸 Modo local activo: La tienda opera con persistencia local optimizada. Configura .env para enlazar con tu proyecto Supabase.');
}
