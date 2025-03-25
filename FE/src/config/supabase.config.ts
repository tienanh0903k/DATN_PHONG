import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jpesrdrgrcqjeqavqxrj.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwZXNyZHJncmNxamVxYXZxeHJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMDg2NDksImV4cCI6MjA1NzY4NDY0OX0.gbQsRnmo5pepRUkMscBPu3MrV_wna9wyhZiH3ZpNHJI';

export const supabase = createClient(supabaseUrl, supabaseKey);
