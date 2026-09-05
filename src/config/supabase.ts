import { createClient } from "@supabase/supabase-js"; // Importa o Supabase

const supabaseUrl = process.env.SUPABASE_URL!; // Pega a URL do Supabase
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!; // Pega a chave secreta do Supabase

// Cria a conexão com o Supabase
const supabase = createClient(
    supabaseUrl,
    supabaseSecretKey,
);

// Exporta para usar em outros arquivos
export default supabase;