# Secure File Vault

A secure file storage web application that encrypts files in the browser before upload (AES), with Supabase for auth and storage.

## Run on your PC

1. Install [Node.js](https://nodejs.org/) (LTS).
2. Open a terminal in this folder.
3. Install dependencies (first time only):

```bash
npm install
```

<<<<<<< HEAD
4. Copy `env.example.txt` to `.env` and add your Supabase URL and anon key.
5. Start the app:

```bash
npm run dev
```

6. Open **http://localhost:5173** in your browser.

Do **not** double-click `index.html` — the app must run through the dev server.

## Run on your phone (same Wi‑Fi)

1. Start `npm run dev` on your PC.
2. In the terminal, find the **Network** line, e.g. `http://192.168.1.12:5173`.
3. On your phone, open that URL in Chrome/Safari.
4. Do **not** use `localhost` on the phone — that points to the phone itself.

If the phone cannot connect, allow port **5173** through Windows Firewall for Node.js.

## Supabase setup

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard).
2. **SQL Editor** → run `supabase/schema.sql`.
3. **Authentication → Email** → enable; turn **off** “Confirm email” for instant login.
4. Enable **Google** and **GitHub** under **Authentication → Providers** (see `supabase/AUTH_SETUP.md`).
5. Add redirect URL `http://localhost:5173/auth/callback` under **URL Configuration**.
6. Put API credentials in `.env` and restart `npm run dev`.

See `supabase/AUTH_SETUP.md` for OAuth client IDs and redirect URLs.
=======
---

## 🧠 How It Works

1. User uploads a file  
2. User enters an encryption passphrase  
3. File is encrypted in the browser  
4. Encrypted file is stored securely  
5. Same passphrase is required to decrypt  

---

## 🏗️ Tech Stack

- Frontend: HTML, CSS, JavaScript, Typescript/ React  
- Backend: Supabase (Auth + Storage)  
- Encryption: AES (CryptoJS / Web Crypto API)


---


Open [http://localhost:5173](http://localhost:5173).
>>>>>>> 28bc186e362cbcd6cba72bfab04e2715ac7a5d8d


<<<<<<< HEAD
Set environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Build: `npm run build`  
Output: `dist`

## Features

- Sign up / log in with **email**, **Google**, or **GitHub**
- Client-side AES encryption before upload
- Drag & drop upload (10 MB max)
- Dashboard: list, search, download, delete
=======
>>>>>>> 28bc186e362cbcd6cba72bfab04e2715ac7a5d8d
