TTK4255 Study Plan

## Local Development

```bash
cd ~/ttk4255-plan
npm install
npm run dev
```

Open the local Vite URL that appears in the terminal, usually http://localhost:5173.

## GitHub Pages

The site is published automatically by GitHub Actions from [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

The live site is:

https://jespervigtel.github.io/ttk4255-plan/

If the page is blank or tries to load `/src/main.jsx`, check repository Settings → Pages and make sure the source is set to GitHub Actions. After that, wait for the latest workflow run to finish and hard refresh the page.

## Saved Progress

Checklist state is saved in the browser for that site origin.

That means progress should persist when you revisit the same site on the same browser and device, unless you clear site data or switch browsers/devices.
