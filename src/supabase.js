import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tttmtxzrnvyvrjbrxbty.supabase.co'

const supabaseKey = 'sb_publishable_2wAlgx8_OHML6Elz6fJshg__nS8WIrM'

export const supabase = createClient(supabaseUrl, supabaseKey)