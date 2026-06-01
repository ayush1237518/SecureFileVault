# Frontend guide — Secure File Vault

## Stack

- **React 19** + **TypeScript**
- **Tailwind CSS 3** — utilities + shared classes in `src/index.css`
- **React Router** — `/auth`, `/dashboard`
- **react-hot-toast** — notifications
- **react-dropzone** — file upload

## Using the frontend skill in Cursor

Ask Cursor to follow the project skill:

> Use the **frontend-ui** skill and improve the dashboard layout.

Skill file: `.cursor/skills/frontend-ui/SKILL.md`

## Project structure

```
src/
  components/     # UI + feature components
  components/ui/  # AppShell, Logo, Container, Icons
  pages/          # AuthPage, DashboardPage
  hooks/          # useAuth, useFiles
  services/       # Supabase client
  utils/          # encryption, format
```

## Shared CSS classes

Defined in `src/index.css`:

- `.card` — glass card
- `.btn-primary` / `.btn-secondary` — buttons
- `.input` — text fields

## Preview

```bash
npm run dev
```

Open http://localhost:5173 (on phone, use the Network URL from the terminal).
