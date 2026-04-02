# Troubleshooting Guide for Institute Wi-Fi Issues

## Quick Diagnostics

**After redeploying**, visit this URL to diagnose the problem:
```
https://YOUR_VERCEL_URL/diagnostics.html
```

This will show you:
- ✅ If proxy is reachable
- ✅ If Supabase backend is accessible
- ✅ Environment variable configuration
- 🔍 Network connectivity details

## Step-by-Step Testing

### 1. Open Browser DevTools
- Press **F12** (or Cmd+Option+I on Mac)
- Go to **Console** tab
- Go to **Network** tab

### 2. Open your app on institute Wi-Fi
- Look for logs like `[Supabase Config]`
- Check if it says `usingProxy: true`

### 3. Try an action (e.g., load startups)
- In Network tab, you should see:
  - ✅ Request to `/api/proxy/rest/v1/startups?...` (should be 2xx status)
  - ✅ NOT a request to `*.supabase.co` (if you see this, proxy not working)

### 4. If it fails:
- Look for the failing request in Network tab
- Click it → **Response** tab → Check the error message
- Report the error below

## Common Issues & Fixes

### Issue: "Cannot reach proxy"
**Cause:** Environment variables not set on Vercel  
**Fix:**
1. Go to Vercel Project Settings → Environment Variables
2. Add these:
   - `VITE_SUPABASE_URL` = `https://YOUR_PROJECT_ID.supabase.co`
   - `VITE_SUPABASE_ANON` = `YOUR_ANON_KEY`
3. **Redeploy** (Vercel should auto-redeploy)
4. Wait 2-3 minutes, then test again

### Issue: "Supabase credentials not configured"
**Cause:** Environment variables are empty/undefined  
**Fix:** Same as above - verify they're in Vercel settings

### Issue: Proxy works but data still doesn't load
**Cause:** Supabase database might have RLS (Row Level Security) issues  
**Fix:**
1. Go to Supabase Dashboard → Authentication → Policies
2. Verify RLS policies allow anonymous access to public tables
3. For `startups` table: Should allow `SELECT` for anonymous users
4. For `job_postings` table: Should allow `SELECT` for anonymous users

### Issue: Works on home Wi-Fi but fails on institute Wi-Fi
**Cause:** Institute proxy/firewall inspection  
**Fix:**
1. Check institute proxy settings (usually auto-proxy)
2. Try using a VPN temporarily to verify it's a Wi-Fi issue
3. Contact your IT department: "I'm getting ERR_CONNECTION_RESET when accessing web apps"

### Issue: "CORS error" in console
**Cause:** Request was blocked by browser CORS policy  
**Fix:**
1. Make sure proxy endpoint includes CORS headers (already done in updated code)
2. Clear browser cache: Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
3. Hard reload: Ctrl+Shift+R (Cmd+Shift+R on Mac)

## Environment Variables Reference

**Supabase Settings → API:**
```
VITE_SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co"
VITE_SUPABASE_ANON = "eyJhbGc..." (your anon public key, starts with eyJ)
```

Find these values:
1. Go to supabase.com
2. Open your project
3. Click Settings (gear icon)
4. Click API in left sidebar
5. Copy URL and "anon public" key

## Redeployment Checklist

Before testing on institute Wi-Fi:

- [ ] Updated Vercel environment variables
- [ ] Git pushed all changes (`api/proxy.js`, `src/supabaseClient.ts`, `vercel.json`)
- [ ] Vercel shows "Deployment Successful"
- [ ] Waited 2-3 minutes for CDN caching
- [ ] Visited `/diagnostics.html` and confirmed proxy works
- [ ] Cleared browser cache (hard reload)
- [ ] Tested on institute Wi-Fi

## If Still Failing

Share this information:
1. Error from Browser DevTools Console (F12)
2. Failed request details from Network tab
3. Status code and response from `/api/diagnostics`
4. Your Vercel deployment URL
5. Supabase project region (Settings → General)

This will help diagnose the exact issue.
