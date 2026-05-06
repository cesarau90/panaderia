import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = "https://ueslsncxvmbyiljtluer.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlc2xzbmN4dm1ieWlsanRsdWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMTIwNzIsImV4cCI6MjA5MzU4ODA3Mn0.8hhfGj4FzQ4PHV2p11m9WqWvHtivEL2Ea_he8bzTO58"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default supabase
