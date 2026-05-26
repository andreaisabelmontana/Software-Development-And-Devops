# The Shop — IE BCSAI · Software Development & DevOps

A polished React + Vite frontend for **The Shop**, the cloud-native marketplace built
as the Fall 2025 BCSAI Software Development & DevOps capstone at IE School of Science
& Technology (Madrid).

It is a reimagining of the team's frontend that **speaks the same FastAPI**
contract as the reference backend in
[`Geethika2506/Devopsfinalproject`](https://github.com/Geethika2506/Devopsfinalproject),
with two visible improvements over the original.

> **Live demo:** https://andreaisabelmontana.github.io/Software-Development-And-Devops/
> *(Deploys automatically from `main` via GitHub Actions → GitHub Pages.)*

> [!IMPORTANT]
> **One-time setup before the live site works.** GitHub Pages must be enabled
> on the repo, otherwise the `deploy` job in CI will fail with
> *"Get Pages site failed"* and the URL above 404s.
>
> 1. Open **Settings → Pages**
>    ([direct link](https://github.com/andreaisabelmontana/Software-Development-And-Devops/settings/pages)).
> 2. Under **Build and deployment → Source**, pick **GitHub Actions** *(not "Deploy from a branch")*.
> 3. Re-run the latest workflow from the Actions tab.

---

## What's in this repo

```
software-development-and-devops/
├── frontend/                          React + Vite app (this is what gets deployed)
│   ├── src/
│   │   ├── components/  Header · Footer · CartDrawer · ApiBadge · ProductGlyph
│   │   ├── pages/       Home · Product · Checkout · OrderConfirmation · Orders · About
│   │   ├── lib/         api · cart · seed · theme
│   │   └── styles/      global.css · app.css (IE design system)
│   ├── public/          favicon.svg · 404.html SPA shim
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── docs/
│   └── SDG_Report_Slides.pdf          The team's IE SDG report (project context)
├── .github/workflows/
│   └── deploy.yml                     Build + deploy to GitHub Pages
└── README.md
```

## Two things made better than the reference

1. **A real design system.** The reference frontend is utilitarian — a working
   React app, but stylistically flat. This version ships with:
   - **Palette sampled pixel-for-pixel from the team's original UI** (the screenshot
     embedded in the SDG report). Indigo `#5B5FE6` → violet `#7C3AED` → purple `#9333EA`
     gradient header, cool-gray `#F3F4F6` page background, white cards.
   - Sticky cart drawer with quantity steppers, free-shipping threshold, tax preview.
   - Responsive product grid, category chips, search.
   - Dark mode with full token coverage.
   - Procedural product glyphs — no external image hosting, the site works offline.
2. **A mock payment flow.** The team's SDG report lists *"a secure payment method
   to streamline transactions"* under future improvements. The checkout screen here
   implements one end-to-end:
   - Stripe-style card form with a **live card preview** updating as you type.
   - **Luhn check** + brand detection (Visa / Mastercard / Amex / Discover) +
     MM/YY masking + CVC validation.
   - Synthetic 800 ms processing latency so the spinner feels like a payment call.
   - Order persists with only the **last four digits** of the PAN — exactly the
     way a real PSP exposes it.
   - No card data ever leaves the browser (demo mode); in live mode the order
     payload includes `payment_last4` only.

## API compatibility

Routes are 1:1 with the reference backend (`Geethika2506/Devopsfinalproject`):

| UI | Endpoint(s) |
| --- | --- |
| Home / catalog | `GET /products/`, `GET /products/categories` |
| Product detail | `GET /products/{id}` |
| Sign-in (demo) | `POST /auth/login/json`, `POST /auth/register`, `GET /auth/me` |
| Place order | `POST /orders/` |
| Orders list | `GET /orders/` |
| Healthcheck (badge) | `GET /health` |

Set `VITE_API_URL` at build time to point at the live backend:

```bash
echo 'VITE_API_URL=https://your-fastapi.example.com' > frontend/.env.local
npm --prefix frontend run dev
```

If `VITE_API_URL` is **unset** or the `/health` probe fails, the app
transparently falls back to a fully working **demo mode**:

- 20 seeded products
- Cart, orders, login, payment all persist to `localStorage`
- A `● live api` / `● demo mode` badge is shown bottom-left

## Run locally

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
npm run build        # production build in frontend/dist
npm run preview      # serve the production build locally
```

Node ≥ 18.

## Deploy

Push to `main`. The Actions workflow at
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):

1. Installs deps with the cached lockfile.
2. Runs `vite build` with `VITE_API_URL` taken from the repo secret of the same name (optional).
3. Copies `docs/SDG_Report_Slides.pdf` into the deployed site so links resolve.
4. Uploads the artefact and deploys to GitHub Pages.

Repo-side prerequisite: in **Settings → Pages**, set *Source* to **GitHub Actions**.

## Credits

- Reference backend & API design: the BCSAI Software Development & DevOps team
  (Geethika, Juliette, Hala, Nicolas, Andrea, Omar) —
  [`Geethika2506/Devopsfinalproject`](https://github.com/Geethika2506/Devopsfinalproject).
- This frontend: **Andrea Montana**, IE BCSAI, Fall 2025.

## License

Educational use. Class project for IE School of Science & Technology.
