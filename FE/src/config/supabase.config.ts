import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sgvkftuhdvhqhkxjxbon.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNndmtmdHVoZHZocWhreGp4Ym9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODU5NzIsImV4cCI6MjA2NDA2MTk3Mn0.7MqSRK9n6CRqDGGZQfLoqBg_cuvuTC9AyKTTtlBTgrw';

export const supabase = createClient(supabaseUrl, supabaseKey);
