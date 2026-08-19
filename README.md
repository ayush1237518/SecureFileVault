# 🔐 Secure File Vault

 A secure web-based file storage application that encrypts files in the browser before uploading them to cloud storage.


---

## 🌐 Live Demo

🚀 **Try Secure File Vault:**
https://filesecure1.netlify.app/auth

---

## 📌 Overview

**Secure File Vault** is a web-based application designed to provide secure file storage and management.

Unlike a traditional file-upload application, Secure File Vault encrypts files **in the browser before they are uploaded** to Supabase Storage.

The application combines:

* 🔐 Client-side AES encryption
* 👤 Email/password authentication
* ☁️ Supabase Storage
* 📁 Secure file management
* 🔎 File search
* 📊 Activity tracking
* 🖱️ Drag-and-drop uploads

The project was built to explore practical concepts in **web development, cloud storage, authentication, and cybersecurity**.

---

## ✨ Features

### 🔐 Security

* Client-side AES encryption before upload
* Encryption passphrase required for file decryption
* Files are encrypted before being sent to storage
* Authentication through Supabase Auth
* Encrypted files are stored instead of the original plaintext file

### 👤 Authentication

* User registration
* Email/password login
* User authentication through Supabase
* Protected application dashboard

### 📁 File Management

* Upload files
* Drag-and-drop file upload
* Download encrypted files
* Decrypt files during download
* Delete files
* Search stored files
* Activity log

### 🎨 User Experience

* Responsive web interface
* Dashboard-based file management
* Simple and clean UI
* Drag-and-drop interaction
* Search functionality

> **Upload limit:** The current application supports files up to **10 MB** per upload.

---

## 🛡️ Security Model

The main security concept of Secure File Vault is **client-side encryption**.

### 🔄 File Upload Flow

```text
┌──────────────┐
│     User     │
└──────┬───────┘
       │
       │ Select file
       ▼
┌──────────────────────┐
│ Browser Application  │
└──────────┬───────────┘
           │
           │ Enter passphrase
           ▼
┌──────────────────────┐
│ AES Encryption       │
│       (Browser)      │
└──────────┬───────────┘
           │
           │ Encrypted file
           ▼
┌──────────────────────┐
│  Supabase Storage    │
└──────────────────────┘
```

The important idea is that encryption happens **before the file is uploaded**.

### 🔓 File Download Flow

```text
┌──────────────────────┐
│  Supabase Storage    │
└──────────┬───────────┘
           │
           │ Encrypted file
           ▼
┌──────────────────────┐
│ Browser Application  │
└──────────┬───────────┘
           │
           │ Passphrase
           ▼
┌──────────────────────┐
│ AES Decryption       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Original File      │
└──────────────────────┘
```

---

## 🧰 Tech Stack

| Technology           | Purpose                           |
| -------------------- | --------------------------------- |
| **React**            | Frontend UI                       |
| **TypeScript**       | Type-safe application development |
| **Vite**             | Development server and build tool |
| **Tailwind CSS**     | Styling and responsive UI         |
| **Supabase Auth**    | User authentication               |
| **Supabase Storage** | File storage                      |
| **CryptoJS**         | AES encryption/decryption         |
| **ESLint**           | Code quality and linting          |

---

## 🏗️ Project Structure

```text
SecureFileVault/
│
├── docs/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── ...
│
├── supabase/
│
├── .gitignore
├── env.example.txt
├── eslint.config.js
├── index.html
├── netlify.toml
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
├── vite.config.ts
└── README.md
```

---



## 📖 How to Use

### 1. Create an Account

Register using your email address and password.

### 2. Log In

Sign in to access your Secure File Vault dashboard.

### 3. Upload a File

Select a file or drag and drop it into the upload area.

### 4. Enter an Encryption Passphrase

Provide the passphrase that will be used for encryption.

### 5. Upload

The file is encrypted in the browser before being uploaded to Supabase Storage.

### 6. Manage Your Files

From the dashboard you can:

* 🔎 Search files
* 📥 Download files
* 🗑️ Delete files
* 📋 View activity information

### 7. Download and Decrypt

When downloading an encrypted file, provide the required passphrase so the application can decrypt the file in the browser.

---

## 🔐 Important Security Considerations

Secure File Vault demonstrates client-side encryption, but it should **not be presented as a guarantee that files are impossible to compromise**.

Security depends on several factors, including:

* The strength and secrecy of the encryption passphrase
* Correct implementation of encryption
* Supabase authentication and storage configuration
* Database/storage access policies
* Security of the user's device and browser
* Protection of environment configuration
* Proper handling of downloaded/decrypted files

### ⚠️ Passphrase Responsibility

If a passphrase is lost, the encrypted file may not be recoverable.

**Do not use sensitive production data in a development/demo deployment unless the application has been independently security-reviewed.**

---



## 🎯 Project Goals

Secure File Vault was created to explore the practical intersection of:

* 🌐 Modern web development
* 🔐 Applied cryptography
* 👤 Authentication
* ☁️ Cloud storage
* 🛡️ Application security
* 📦 Secure file handling

The project demonstrates how encryption can be incorporated into a modern web application to protect files before cloud storage.

---



## 🐛 Issues & Feedback

If you find a bug or have an idea for improvement, open an issue in the repository.

Please include:

* A clear description
* Steps to reproduce the issue
* Expected behavior
* Actual behavior
* Relevant screenshots or error messages

---


## 📄 License

This project is available for educational and development purposes.

See the repository for the applicable license information.

---


<div align="center">

### 🔐 Secure your files. Understand your security.

**Built with React, TypeScript, Supabase & AES encryption.**

</div>
