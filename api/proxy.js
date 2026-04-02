export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON;

  // CORS headers - MUST be set before any response
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey, x-client-info');
  res.setHeader('Content-Type', 'application/json');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({
      error: 'Supabase credentials not configured',
      details: 'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON environment variables'
    });
  }

  const { method, query, body } = req;
  
  // Reconstruct the full path with query parameters
  let path = req.url.replace('/api/proxy', '');
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  // Build the full target URL
  const targetUrl = new URL(supabaseUrl);
  targetUrl.pathname = path;
  
  // Add any query parameters
  if (req.url.includes('?')) {
    const queryString = req.url.substring(req.url.indexOf('?'));
    targetUrl.search = queryString;
  }

  try {
    const fetchOptions = {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
        'Accept': 'application/json',
        'apikey': supabaseKey, // Supabase specific header
        'x-client-info': 'supabase-js/2.39.0',
      },
    };

    // Only add body for non-GET/HEAD requests
    if (method !== 'GET' && method !== 'HEAD' && body) {
      fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const response = await fetch(targetUrl.toString(), fetchOptions);
    
    // Handle response
    let data;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Forward response headers that matter
    const headersToForward = ['content-type', 'cache-control', 'etag'];
    headersToForward.forEach(header => {
      const value = response.headers.get(header);
      if (value) res.setHeader(header, value);
    });

    return res.status(response.status).json(data);
  } catch (error) {
    console.error('[Proxy Error]', {
      url: targetUrl?.toString(),
      method,
      error: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      error: 'Proxy request failed',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}
