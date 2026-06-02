# Authentication setup

This app supports **email/password**, **Google**, and **GitHub** sign-in.

## Email (password)

1. [Supabase Dashboard](https://supabase.com/dashboard) → your project  
2. **Authentication** → **Providers** → **Email**  
3. Turn **OFF** → **Confirm email** (instant login after sign-up)  
4. Save  

## URL configuration (required for OAuth)

1. **Authentication** → **URL Configuration**  
2. **Site URL**: your app root, e.g. `http://localhost:5173`  
3. **Redirect URLs** — add every URL you use:

```
http://localhost:5173/auth/callback
http://127.0.0.1:5173/auth/callback
```

For production, also add:

```
https://your-domain.com/auth/callback
```

For phone testing on Wi‑Fi, add your PC’s network URL, e.g.:

```
http://192.168.1.12:5173/auth/callback
```

## Google

1. [Google Cloud Console](https://console.cloud.google.com/) → create or select a project  
2. **APIs & Services** → **OAuth consent screen** — configure (External is fine for testing)  
3. **Credentials** → **Create credentials** → **OAuth client ID** → **Web application**  
4. **Authorized redirect URIs** — add your Supabase callback (from Supabase → Authentication → Providers → Google):

   ```
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   ```

5. Copy **Client ID** and **Client secret** into Supabase → **Authentication** → **Providers** → **Google** → Enable → paste → Save  

## GitHub

1. GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**  
2. **Homepage URL**: `http://localhost:5173` (or your production URL)  
3. **Authorization callback URL** — same Supabase callback:

   ```
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   ```

4. Copy **Client ID** and generate **Client secret**  
5. Supabase → **Authentication** → **Providers** → **GitHub** → Enable → paste → Save  

## How OAuth works in the app

1. User clicks **Continue with Google** or **Continue with GitHub** on `/auth`  
2. Browser redirects to the provider, then back to `/auth/callback`  
3. App completes the session and sends the user to `/dashboard`  

Google/GitHub create an account automatically on first sign-in (same as sign-up).

## Activity log

Run `supabase/activity.sql` in the SQL Editor (included at the end of `schema.sql` for new installs). This powers the **Activity** tab on the dashboard.

## Troubleshooting

| Problem | Fix |
|--------|-----|
| Redirect URL mismatch | Add exact callback URL in Supabase **Redirect URLs** |
| Provider not enabled | Enable provider in Supabase and save credentials |
| Works on PC, not phone | Add `http://YOUR_LAN_IP:5173/auth/callback` to Redirect URLs |
| Stuck after Google/GitHub | Confirm **Site URL** matches how you open the app |
