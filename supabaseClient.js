
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zxaobejnmjnpcebklxyz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4YW9iZWpubWpucGNlYmtseHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE3MjE5NzYsImV4cCI6MjAxNzI5Nzk3Nn0.B6bMabGrw2YuHam6fhE4b0rexippzTetDKcDNZBB5tY'

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey)

