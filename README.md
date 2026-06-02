# Secure File Vault

A secure file storage web application that encrypts files in the browser before upload (AES), with Supabase for auth and storage.

## Run on your PC

1. Install [Node.js](https://nodejs.org/) (LTS).
2. Open a terminal in this folder.
3. Install dependencies (first time only):

```bash
npm install
```

4. Copy `env.example.txt` to `.env` and add your Supabase URL and anon key.
5. Start the app:

```bash
npm run dev
```

6. Open **http://localhost:5173** in your browser.

Do **not** double-click `index.html` — the app must run through the dev server.

## Supabase setup

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard).
2. **SQL Editor** → run `supabase/schema.sql`.
3. **Authentication → Providers → Email** → enable; turn **off** “Confirm email” for instant login.
4. Put API credentials in `.env` and restart `npm run dev`.

See `supabase/AUTH_SETUP.md` for details.

## Deploy to Netlify

See `docs/NETLIFY.md`. Live demo: **https://filesecure1.netlify.app/**

## How it works

1. User uploads a file
2. User enters an encryption passphrase
3. File is encrypted in the browser
4. Encrypted file is stored in Supabase Storage
5. Same passphrase is required to decrypt on download

## Features

- Sign up / log in with **email and password**
- Client-side AES encryption before upload
- Drag & drop upload (10 MB max)
- Dashboard: list, search, download, delete, activity log

## Tech stack

- React, TypeScript, Vite, Tailwind CSS
- Supabase (Auth + Storage)
- AES encryption (CryptoJS)
