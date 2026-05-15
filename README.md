# TTK4255 Study Plan

A lightweight study checklist for TTK4255 that helps track exam preparation over time. The app is built with Vite and React, and it is deployed as a GitHub Pages site.

## Features

- 10-day study plan with expandable sections
- Interactive checkboxes for tracking progress
- Automatic saving in the browser
- GitHub Pages deployment via GitHub Actions

## Live Site

The published site is available at:

https://jespervigtel.github.io/ttk4255-plan/

## Local Development

```bash
cd ~/ttk4255-plan
npm install
npm run dev
```

Open the local Vite URL shown in the terminal, usually http://localhost:5173.

## Deployment

The site is built and deployed automatically from [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

If the live page ever looks stale or blank, hard refresh the browser and check the latest GitHub Actions run in the repository’s Actions tab.

## Progress Saving

Checklist state is saved in the browser for the current site origin.

Progress should persist when you return on the same browser and device, unless you clear site data or switch browsers/devices.
