This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
``` 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

### Automatic Deployment (Recommended)

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically deploy when you push to the `main` branch

2. **Manual Deployment:**
   ```bash
   npm run build
   npm run deploy
   ```

### Configuration

- **Repository Name:** `special-graphics-official`
- **Base Path:** `/special-graphics-official` (configured in `next.config.ts`)
- **Homepage URL:** `https://kavindiR.github.io/special-graphics-official`

### Important Notes

- The project uses static export (`output: "export"` in `next.config.ts`)
- Images are unoptimized for GitHub Pages compatibility
- The `out` directory contains the static files for deployment
- The Accordion component and all other components are properly configured for static export

### Troubleshooting

If deployment fails:
1. Ensure your repository name matches the `basePath` in `next.config.ts`
2. Check that GitHub Actions has the necessary permissions
3. Verify the `homepage` field in `package.json` matches your GitHub Pages URL
4. Make sure you've pushed the workflow file to your repository

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
