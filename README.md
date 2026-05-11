# D&D Cards

Next.js app for selecting D&D 5.5e spells and class feats and printing them as PDF-ready playing cards.

## Features

- Filter by class and level
- Separate tabs for spells and class feats
- Popup details for each spell/feat
- Select cards and print them in a playing-card layout
- Desktop left filter panel and mobile floating filter menu

## Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```

## Vercel Deploy

This repository includes a GitHub Actions workflow at `.github/workflows/vercel-deploy.yml`.

- Pull requests to `main` create a **preview deploy**
- Pushes to `main` create a **production deploy**

Set these repository secrets before running the workflow:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Recommended setup flow:

1. Create a Vercel token from account settings and store it as `VERCEL_TOKEN`.
2. Get the exact team/user org ID and project ID from Vercel and store them as `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`.
3. Ensure the token has access to the same org/project IDs configured above.
4. Run the **Vercel Deploy** workflow with `workflow_dispatch` to verify both preview/production deploy paths.
5. If deploy still fails, re-check that `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` match the linked Vercel project exactly.
