import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonUrl = import.meta.env.VITE_SUPABASE_AMON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonUrl);
