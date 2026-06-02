/** Prevents duplicate PKCE / getSession work across React StrictMode remounts. */
let initialSessionLoadStarted = false

export function markInitialSessionLoadStarted(): boolean {
  if (initialSessionLoadStarted) return false
  initialSessionLoadStarted = true
  return true
}

export function resetInitialSessionLoadForTests(): void {
  initialSessionLoadStarted = false
}
