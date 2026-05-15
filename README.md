TTK4255 Study Plan

Quick start:

```bash
cd ~/ttk4255-plan
npm install
npm run dev
```

Open http://localhost:5173 and the study plan will load. The app uses `localStorage` by default; if your environment provides `window.storage` (e.g., some extensions), it will prefer that.

GitHub Pages deploys from the `dist` folder via the workflow in `.github/workflows/deploy.yml`. On GitHub Pages, your checklist progress is saved in the browser for that site origin, so it should persist across visits on the same browser and device unless you clear site data or switch browsers/devices.
