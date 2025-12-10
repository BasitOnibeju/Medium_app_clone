import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

console.log("URL:", supabaseUrl); // <---- Add this test
console.log("KEY:", supabaseKey); // <---- Add this test

export const supabase = createClient(supabaseUrl, supabaseKey);
