# Ramesh Rangarao Patil — Portfolio

A polished, production-ready multi-page portfolio built with **Vite + React + React Router**.

## ✦ Features
- 6-page SPA: Home, About, Experience, Projects, Skills, Contact
- Dark / Light mode toggle (persisted to localStorage)
- Animated scroll-reveal on all sections
- Skill proficiency bar charts with smooth animation
- AI-powered contact form (Anthropic API — auto-acknowledgment reply)
- Resume PDF download (linked to `/public/resume.pdf`)
- Custom amber cursor with ring follower
- Scroll progress bar + back-to-top button
- Fixed page indicator dots (right side)
- Endorsements section on About page
- Full SEO meta tags + Open Graph + Twitter Card
- SVG favicon with RP monogram
- Fraunces serif + DM Sans + DM Mono typography

## ✦ Tech Stack
- React 18 + Vite 8
- React Router DOM v7
- Lucide React (icons)
- CSS Modules
- Anthropic API (claude-sonnet-4-20250514)

## ✦ Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
```

## ✦ Deploying

### Netlify (recommended — drag & drop, 30 seconds)
1. Run `npm run build`
2. Drag the `dist/` folder to https://app.netlify.com/drop
3. Done. `netlify.toml` handles SPA routing automatically.

### Vercel
1. Push to GitHub
2. Import repo at https://vercel.com/new — set framework to **Vite**
3. Deploy. `vercel.json` handles routing.

### GitHub Pages
1. Install: `npm install --save-dev gh-pages`
2. Add to `package.json` scripts: `"deploy": "gh-pages -d dist"`
3. Set `base: '/repo-name/'` in `vite.config.js`
4. Run `npm run build && npm run deploy`

## ✦ Customisation
All content is in one file: **`src/data/resume.js`**
- Update `profile` for name, email, LinkedIn etc.
- Update `experience`, `projects`, `skills`, `endorsements`
- Replace `public/resume.pdf` with your actual resume

## ✦ Contact Form
The form calls the Anthropic API directly from the browser.
In the Claude.ai environment the API key is injected automatically.
For standalone deployment, either:
- Add a serverless function proxy (recommended for production)
- Or replace the fetch call in `Contact.jsx` with your own backend endpoint
