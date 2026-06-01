# Direct login (no email verification)

This app uses **only** email + password — no confirmation links or second-step auth.

## Required Supabase setting

1. [Supabase Dashboard](https://supabase.com/dashboard) → your project  
2. **Authentication** → **Providers** → **Email**  
3. Turn **OFF** → **Confirm email**  
4. Save  

After this, **Create account** logs users in immediately. **Log in** works with the same credentials.

## If sign-up does not log you in

- Confirm **Confirm email** is disabled (step above).  
- Use **Log in** with the same email/password (do not create duplicate accounts).  
- If you see rate-limit errors, wait ~1 hour or raise limits under **Authentication** → **Rate Limits**.
