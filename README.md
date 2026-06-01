# 🔐 Secure File Vault

A secure file storage web application that allows users to upload, encrypt, and manage their files safely using strong encryption techniques.

---

## 🚀 Features

- 🔒 Client-side Encryption (AES-256)
- 🔑 Passphrase-based Security
- 📁 Upload & Download Files
- 🛡️ Secure Authentication (Gmail)
- ☁️ Cloud Storage Integration (Supabase)
- ⚡ Modern dark UI

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


<<<<<<< HEAD
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
=======
>>>>>>> 09215532b1ff95afea32a4524e8ca48299562e51
