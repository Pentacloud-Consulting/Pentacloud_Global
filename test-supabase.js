const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vvnzgnaqbyoylxhnwja.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2bnpnbmFxYnlveWxreGhud2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMDgwNzQsImV4cCI6MjEwMjg4NDA3NH0.Q-5xXXD4liHOWKquPA50wS3RficaJT0bBUAGyzgMXiI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.from('blogs').select('*');
  if (error) {
    console.error('ERROR DETAILS:', error);
  } else {
    console.log('SUCCESS! DATA:', data);
  }
}

test();
