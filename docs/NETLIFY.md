# Deploy to Netlify

Production site: **https://filesecure1.netlify.app**

## Environment variables

In **Site configuration → Environment variables**, set:

| Variable | Value |
|----------|--------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon (public) key |

## Supabase

Enable **Email** under **Authentication → Providers** and turn off **Confirm email** for instant sign-up/login.

See `supabase/AUTH_SETUP.md` for details.

## Redeploy

After changing env vars or pushing code, trigger **Deploys → Trigger deploy**.
