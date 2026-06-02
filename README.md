# Secure File Vault

A secure file storage web application that encrypts files in the browser before upload (AES), with Supabase for auth and storage.


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


Live Demo:https://filesecure1.netlify.app/
