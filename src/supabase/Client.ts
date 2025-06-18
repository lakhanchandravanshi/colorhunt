// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://swaqiwjizmqcgxlpjipp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3YXFpd2ppem1xY2d4bHBqaXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNTM0MzIsImV4cCI6MjA2NTcyOTQzMn0.nbMLyLyAXO0DupBkVCQRr9TH4yLUfRmM-ekD3yqeY7M';

export const supabase = createClient(supabaseUrl, supabaseKey);
