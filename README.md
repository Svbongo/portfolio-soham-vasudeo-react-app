# Soham Vasudeo — Portfolio

This repository contains the source for a personal portfolio website built with React (Create React App).

The app lives in the `my-portfolio/` folder. Use the instructions below to run the site locally, build for production, and deploy to GitHub Pages.

## Quick start (development)

1. Install dependencies

   npm install

2. Run the dev server

   npm start

3. Open the site

   Open http://localhost:3000 in your browser. The dev server supports hot reload on save.

Notes:
- The React app root is `my-portfolio/`. Run commands from inside that folder.
- If you see issues starting the dev server, run `npm ci` to install exact versions from package-lock.json.

## Build for production

From `my-portfolio/` run:

   npm run build

This creates an optimized `build/` folder ready for static hosting.

## Deploying to GitHub Pages (recommended)

One simple approach is `gh-pages`. These are the steps the repo owner can follow:

1. Add a `homepage` entry to `my-portfolio/package.json`:

   "homepage": "https://<GITHUB_USERNAME>.github.io/<REPO_NAME>"

2. Add deploy scripts to `package.json`:

   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build",
     ...
   }

3. Install `gh-pages`:

   npm install --save-dev gh-pages

4. Push the repo to GitHub, then run:

   npm run deploy

The site will be published at the `homepage` URL. Alternatively, you can use a GitHub Actions workflow to build and deploy on push (recommended for automated deploys).

## Project structure

Top-level files/folders (most work happens inside `my-portfolio/`):

- `my-portfolio/` — Create React App project root
  - `public/` — static assets
  - `src/` — React source
    - `components/` — UI components and sections (Sidebar, MainContent, sections/*)
    - `assets/` — images, icons, and projects screenshots
    - `data/` — static data files (e.g., experiences.js)
  - `package.json` — project scripts and dependencies

There are some legacy or root-level files in the repository (outside `my-portfolio/`) such as `index.html`, `styles.css`, `postcss.config.js`, and `tailwind.config.js`. They are likely remnants from earlier scaffolding and can be archived or removed.

## Notes and developer tips

- Smooth scrolling and sidebar navigation are implemented in `src/components/Sidebar.js`. Each site section has an `id` so the sidebar can programmatically scroll the main content container.
- The project previously experimented with a particle background using `react-tsparticles`. If re-enabled, the component lives at `src/components/ParticlesBackground.js` and depends on `react-tsparticles` and `tsparticles` packages.
- If you make changes to dependencies, run `npm install` from within `my-portfolio/`.
- Run `npm run build` before deploying. Double-check the `homepage` field in `package.json` if deploying to GitHub Pages.

## Accessibility & linting

- Links in the sidebar use buttons with `aria-current` for the active state and focus management for keyboard users.
- ESLint rules are adhered to; any warnings related to anchors were resolved by replacing invalid anchors with buttons where appropriate.

## Contributing

If you want to propose changes or improvements:

1. Fork the repo and create a branch for your change.
2. Open a pull request describing your change.

## License & credits

This portfolio is the personal work of Soham Vasudeo. Assets (icons/images) included in the `assets/` folder have their own sources; attribute as necessary where used.

---

If you'd like, I can:

- Push this README and create a new GitHub repo for you (I can guide the exact git commands). 
- Add `gh-pages` and a deploy script and run `npm run deploy` (you'll need to provide your GitHub username and repo name or set up the repo first). 

Tell me which of the follow-ups you'd like me to do next.
