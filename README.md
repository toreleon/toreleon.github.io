# Minimalist Portfolio Website

A clean, modern portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and dark/light theme support.

## ✨ Features

- **Minimalist Design** - Clean typography with Geist font and strategic use of whitespace
- **Responsive Layout** - Mobile-first design that works on all devices
- **Theme Toggle** - Seamless dark/light mode switching
- **Smooth Animations** - Subtle scroll-triggered animations and hover effects
- **Modern Stack** - Built with Next.js 15, TypeScript, and Tailwind CSS

## 🚀 Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [v0.dev](https://v0.dev/) - AI-powered development

## 📦 Getting Started

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies (pnpm recommended)
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🎨 Customization

The portfolio is designed to be easily customizable:

- Update personal information in `app/page.tsx`
- Modify colors and styling in `app/globals.css`
- Add or remove sections as needed

## 📄 License

Open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using [v0.dev](https://v0.dev) by Felix Macaspac**

## 🚀 Deploy to GitHub Pages

This project is configured for static export and GitHub Pages deployment.

- Static export is enabled via `output: 'export'` in `next.config.mjs`.
- A workflow at `.github/workflows/deploy.yml` builds and deploys to Pages.

Steps:

1) Push to `main` and enable Pages:
   - GitHub → Repo → Settings → Pages → Build and deployment → Source: GitHub Actions.
2) The workflow will build (`pnpm build`) and publish the `out/` folder.
3) Your site will be available at:
   - `https://<username>.github.io/<repo>` for a project site, or
   - `https://<username>.github.io` if the repo is named `<username>.github.io`.

To host at `thanglv.github.io` root:

- Rename this repo to `thanglv.github.io`, or
- Create `thanglv/thanglv.github.io` and move this code there.

Optional local export test:

```bash
pnpm build
npx serve out  # or any static server
```
