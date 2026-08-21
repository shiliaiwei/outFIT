# Git Push & Deployment Governance Rule

## Mandatory Rule
**DO NOT PUSH TO REMOTE REPOSITORY UNLESS EXPLICITLY COMMANDED BY THE USER.**

### Execution Guidelines:
1. **Never Automatically Run `git push`**:
   - Building, testing, and staging/committing locally is allowed for verification.
   - Pushing commits to remote (`git push origin main` or any other branch) is **STRICTLY FORBIDDEN** unless the user explicitly issues a command such as:
     - `"push"`
     - `"push it"`
     - `"push to github"`
     - `"deploy and push"`
2. **Explicit Verification First**:
   - Always verify changes locally (`npm run dev`, `npx tsc --noEmit`, local browser/curl) and report the local status.
   - Wait for the user's explicit directive before running `git push`.
