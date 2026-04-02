# CoBuild Solutions - Supabase Backend Fix

## Problem
The application was failing to connect to Supabase when on restricted Wi-Fi networks (institute, corporate, etc.) due to:
- Domain blocking/DNS filtering of `*.supabase.co`
- WebSocket connection blocking
- Firewall restrictions on direct database connections

## Solution Implemented
Created an **API proxy layer** on Vercel that acts as a middleman between your frontend and Supabase.

### How It Works
1. **Development**: Direct requests to Supabase via Vite proxy
2. **Production**: Requests route through `/api/proxy` endpoint (your Vercel domain)
3. The proxy forwards requests to Supabase with proper authentication headers

### Files Added/Modified

#### New Files:
- **`api/proxy.js`** - Vercel serverless function that proxies requests to Supabase
- **`vercel.json`** - Vercel configuration for environment variables and rewrites
- **.vercelignore** - Ensures api/ folder is deployed

#### Modified Files:
- **`src/supabaseClient.ts`** - Updated to use proxy endpoint in production
- **`vite.config.ts`** - Added Vite dev server proxy configuration

## Deployment Instructions

### 1. Update Environment Variables on Vercel
In your Vercel project settings, add these environment variables:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON=YOUR_ANON_KEY
```

### 2. Update Local .env File
```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON=YOUR_ANON_KEY
```

### 3. Test Locally
```bash
npm install
npm run dev
```
The app will use direct Supabase requests during development.

### 4. Deploy to Vercel
```bash
git add .
git commit -m "Add Supabase API proxy for restricted networks"
git push origin main
```

## Testing on Restricted Networks
Once deployed, test your app on institute Wi-Fi:
1. Visit your Vercel deployment URL
2. Open DevTools (F12) → Network tab
3. Look for requests to `/api/proxy/...` (should succeed)
4. Try all database operations (fetch startups, job postings, etc.)

## Why This Works
- **Same-origin requests**: Your Wi-Fi sees requests to your own Vercel domain, not external Supabase
- **No WebSocket issues**: REST API calls over HTTP/HTTPS only
- **Transparent to app**: No code changes needed in React components
- **Security maintained**: Supabase auth keys are only exposed server-side (Vercel)

## Troubleshooting

### Still getting "Cannot reach database"?
1. Verify environment variables are set in Vercel
2. Check Vercel deployment logs for errors
3. Confirm `.env.example` was properly configured locally

### Works locally but not on Vercel?
1. Redeploy the project
2. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
3. Verify Supabase credentials in Vercel settings

### Still fails on institute Wi-Fi?
The proxy might not be enough if:
- Institute blocks all Vercel domains - contact your IT department
- Proxy needs authentication - will require custom auth layer
- Try: Restart router, use VPN as last resort
