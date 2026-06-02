# Deploy to Netlify (OAuth)

Production site: **https://filesecure1.netlify.app**

## Netlify environment variables

In **Site configuration → Environment variables**, set:

| Variable | Value |
|----------|--------|
| `VITE_SUPABASE_URL` | `https://vvjwenwymsnmmffutqvh.supabase.co` (your project URL) |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon (public) key |

Do **not** set `VITE_APP_URL` to `http://localhost:5173` on Netlify. The app uses the live domain automatically.

## Supabase (required for Google / GitHub)

**Authentication → URL Configuration**

This is the most common cause of **“localhost refused to connect”** on Netlify.

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Authentication** → **URL Configuration**.
2. Set **Site URL** to exactly:

   `https://filesecure1.netlify.app`

   (If it still says `http://localhost:5173`, Google/GitHub will send users to localhost after sign-in.)

3. Under **Redirect URLs**, add (keep local ones if you develop locally):

   `https://filesecure1.netlify.app/auth/callback`

Keep local URLs if you still develop locally:

- `http://localhost:5173/auth/callback`
- `http://127.0.0.1:5173/auth/callback`

## Redeploy

After changing env vars or this repo, trigger **Deploys → Trigger deploy** so the new build goes live.

See `supabase/AUTH_SETUP.md` for Google Cloud and GitHub OAuth app settings.
