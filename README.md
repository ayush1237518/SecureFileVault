# Secure File Vault

Client-side encrypted file storage built with React, Tailwind CSS, and Supabase.

## Fix "Failed to fetch"

This error means the browser cannot reach your Supabase project. Common causes:

1. **Placeholder `.env`** — Use your real Project URL and `anon` key (not `placeholder.supabase.co`).
2. **Dev server not restarted** — After editing `.env`, stop and run `npm run dev` again.
3. **Database not set up** — Run `supabase/schema.sql` in the Supabase SQL Editor.
4. **Paused project** — Resume the project in the Supabase dashboard.

## Setup

### 1. Install

```bash
npm install
```

### 2. Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. Copy **Project URL** and **anon public** key from **Settings → API**.
3. Create `.env` from the example:

```bash
cp .env.example .env
```

Edit `.env`:

```
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Database & storage

In **SQL Editor**, paste and run `supabase/schema.sql`.

In **Storage**, confirm a private bucket named `vault-files` exists (the SQL script creates it).

### 4. Authentication (direct login only)

1. **Authentication → Providers → Email** — enable Email.
2. **Turn OFF “Confirm email”** — required for instant **Create account** / **Log in** with no verification step.

See **`supabase/AUTH_SETUP.md`** for details.

On mobile, open the app using your PC’s network URL from `npm run dev` (e.g. `http://192.168.x.x:5173`), not `localhost`.

### 5. Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy (Vercel / Netlify)

Set environment variables in the host dashboard:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Build command: `npm run build`  
Output directory: `dist`

## Frontend

See **`docs/FRONTEND.md`** and **`.cursor/skills/frontend-ui/SKILL.md`** for UI conventions and how to extend the design in Cursor.

## Features

- Direct email/password sign-up and log-in (no email verification)
- AES client-side encryption before upload
- Drag & drop upload with progress (10 MB max)
- Dashboard: list, search, download, delete
- Row Level Security so users only see their own files
# SecureFileVault
