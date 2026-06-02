# Authentication setup

This app uses **email and password** sign-in only (via Supabase).

## Email (password)

1. [Supabase Dashboard](https://supabase.com/dashboard) → your project  
2. **Authentication** → **Providers** → **Email**  
3. Ensure **Email** is enabled  
4. Turn **OFF** → **Confirm email** (instant login after sign-up)  
5. Save  

## Site URL (optional)

**Authentication** → **URL Configuration** → set **Site URL** to your app root, e.g.:

- Local: `http://localhost:5173`
- Production: `https://filesecure1.netlify.app`

No OAuth callback URLs are required.

## Activity log

Run `supabase/activity.sql` in the SQL Editor (included at the end of `schema.sql` for new installs). This powers the **Activity** tab on the dashboard.

## Troubleshooting

| Problem | Fix |
|--------|-----|
| Sign-up works but cannot log in | Turn off **Confirm email** under Email provider |
| Too many emails | Wait 1 hour (Supabase rate limit) or disable email confirmation |
| Cannot reach Supabase | Check `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` / Netlify env vars |
