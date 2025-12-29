# Deployment Guide

This guide explains how to deploy the Special Graphics project to different platforms.

## 🏠 Localhost Development

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

Visit: http://localhost:3000

## ☁️ Vercel Deployment

### Option 1: Automatic (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel auto-detects Next.js - just click "Deploy"
6. Your site will be live in ~2 minutes!

**URL Format**: `https://your-project-name.vercel.app`

### Option 2: CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

## 📄 GitHub Pages Deployment

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### Step 2: Push to Main Branch

The GitHub Actions workflow will automatically:
- Build your project for GitHub Pages
- Deploy to GitHub Pages
- Update on every push to `main` branch

**URL Format**: `https://your-username.github.io/special-graphics-official`

### Manual GitHub Pages Build (Optional)

```bash
# Build for GitHub Pages
npm run build:github

# Output will be in the 'out' directory
# You can manually upload this to GitHub Pages if needed
```

## 🔍 Verification Checklist

After deployment, verify:

- [ ] All images load correctly
- [ ] Navigation links work
- [ ] All pages are accessible:
  - [ ] Home (`/`)
  - [ ] Categories (`/categories`)
  - [ ] How It Works (`/how-it-works`)
  - [ ] Find Designer (`/find-designer`)
  - [ ] Auth (`/auth`)
  - [ ] Inspirations (`/inspirations`)
  - [ ] Submit Files (`/submit-files`)
  - [ ] Winner Form (`/winner-form`)
- [ ] Hero section displays correctly
- [ ] Responsive design works on mobile

## 🐛 Common Issues

### Images Not Loading

**Solution**: All images should use string paths starting with `/` (e.g., `/hero-left.avif`)

### GitHub Pages 404 Errors

**Solution**: 
- Verify repository name is `special-graphics-official`
- Or update `basePath` in `next.config.ts` to match your repo name

### Build Errors

**Solution**:
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires 20+)
- Review build logs for specific errors

## 📊 Platform Comparison

| Feature | Localhost | Vercel | GitHub Pages |
|---------|-----------|--------|--------------|
| Image Optimization | ✅ | ✅ | ❌ |
| Server-Side Features | ✅ | ✅ | ❌ |
| Static Export | ❌ | ❌ | ✅ |
| Base Path | ❌ | ❌ | ✅ |
| Auto Deploy | ❌ | ✅ | ✅ |
| Custom Domain | ❌ | ✅ | ✅ |

## 🎯 Recommended Setup

- **Development**: Use `localhost` with `npm run dev`
- **Production**: Use **Vercel** for best performance and features
- **Free Hosting**: Use **GitHub Pages** if you need free static hosting

---

**Need Help?** Check the main README.md for more details.

