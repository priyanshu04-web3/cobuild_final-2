export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON;

  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: {
      supabaseUrlConfigured: !!supabaseUrl,
      supabaseKeyConfigured: !!supabaseKey,
      supabaseUrl: supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : null,
    },
    request: {
      method: req.method,
      url: req.url,
      headers: {
        'user-agent': req.headers['user-agent'],
        'origin': req.headers['origin'],
        'referer': req.headers['referer'],
      },
    },
  };

  // Test connectivity to Supabase
  if (supabaseUrl && supabaseKey) {
    try {
      const testResponse = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Accept': 'application/json',
        },
      });
      diagnostics.supabaseConnectivity = {
        status: testResponse.status,
        statusText: testResponse.statusText,
        success: testResponse.ok,
      };
    } catch (error) {
      diagnostics.supabaseConnectivity = {
        error: error.message,
        success: false,
      };
    }
  }

  return res.status(200).json(diagnostics);
}
