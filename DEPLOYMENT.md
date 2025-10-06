# Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages.

## Quick Deployment Checklist

- [ ] Replace placeholder images with real images
- [ ] Update Microsoft Form URL in contact.html
- [ ] Update personal information (email, phone, LinkedIn)
- [ ] Test locally before deploying
- [ ] Push to GitHub
- [ ] Enable GitHub Pages

## Step-by-Step GitHub Pages Deployment

### 1. Prepare Your Repository

```bash
# Navigate to the public directory
cd public

# Initialize git (if not already initialized)
git init

# Create .gitignore file
cat > .gitignore << 'EOF'
.DS_Store
*.log
node_modules/
.env
EOF

# Add all files
git add .

# Commit
git commit -m "Initial commit: Professional Power Platform portfolio"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "+" → "New repository"
3. Name it (e.g., `portfolio` or `your-username.github.io`)
4. **Do not** initialize with README (we already have one)
5. Click "Create repository"

### 3. Push to GitHub

```bash
# Add remote (replace with your repository URL)
git remote add origin https://github.com/your-username/your-repo-name.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages

#### Option A: From Repository Settings
1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment

#### Option B: Using GitHub Actions (Advanced)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### 5. Access Your Site

Your site will be available at:
- `https://your-username.github.io/repository-name/` (regular repo)
- `https://your-username.github.io/` (if repo is named `your-username.github.io`)

## Custom Domain Setup

### 1. Buy a Domain
Purchase from providers like:
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare

### 2. Configure DNS

#### For Apex Domain (example.com)
Add these A records:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

#### For Subdomain (www.example.com)
Add CNAME record:
```
www  →  your-username.github.io
```

### 3. Configure GitHub

1. In repository **Settings** → **Pages**
2. Enter your custom domain in the **Custom domain** field
3. Check "Enforce HTTPS" (after DNS propagates)
4. Create a `CNAME` file in repository root:
   ```
   yourdomain.com
   ```

### 4. Wait for DNS Propagation
- Usually takes 1-24 hours
- Check status: https://www.whatsmydns.net/

## Alternative Hosting Options

### Netlify

1. Sign up at [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your repository
5. Build settings:
   - Base directory: `public`
   - Build command: (leave empty)
   - Publish directory: `/`
6. Click "Deploy site"

**Custom domain on Netlify:**
- Go to Site settings → Domain management
- Add custom domain
- Follow DNS configuration instructions

### Vercel

1. Sign up at [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework: Other
   - Root directory: `public`
5. Click "Deploy"

### Cloudflare Pages

1. Sign up at [Cloudflare](https://pages.cloudflare.com)
2. Create a project
3. Connect to GitHub
4. Configure:
   - Build command: (none)
   - Build output directory: `public`
5. Deploy

## Post-Deployment Tasks

### 1. Test Everything
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Images display
- [ ] Animations run smoothly
- [ ] Forms submit (test contact form)
- [ ] Theme toggle works
- [ ] Mobile responsive
- [ ] All links work

### 2. SEO Setup

**Google Search Console:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property
3. Verify ownership
4. Submit sitemap (create one if needed)

**Google Analytics:**
1. Create account at [Google Analytics](https://analytics.google.com)
2. Add tracking code to all pages (before `</head>`):
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. Social Media

**LinkedIn:**
- Share your portfolio URL
- Pin the post to your profile

**Update Resume/CV:**
- Add portfolio URL
- Update all professional profiles

## Maintenance

### Updating Content

```bash
# Make your changes locally
# Test thoroughly

# Commit and push
git add .
git commit -m "Update: description of changes"
git push
```

GitHub Pages will automatically redeploy within 1-2 minutes.

### Backup

Always keep a local backup:
```bash
# Create backup
zip -r portfolio-backup-$(date +%Y%m%d).zip public/

# Or use git
git archive -o backup.zip HEAD
```

## Troubleshooting

### Site Not Loading
- Check GitHub Actions/Pages deployment status
- Verify files are in correct directory
- Clear browser cache
- Check for JavaScript errors in console

### Images Not Showing
- Verify image paths are relative (`assets/images/...`)
- Check file names (case-sensitive on Linux)
- Ensure images are committed to git

### Custom Domain Not Working
- Wait 24 hours for DNS propagation
- Check DNS settings with `nslookup yourdomain.com`
- Verify CNAME file exists in repository root
- Try disabling and re-enabling HTTPS in GitHub settings

### Forms Not Working
- Verify Microsoft Form URL is correct
- Check iframe not blocked by ad blockers
- Ensure form is public (Anyone can respond)

## Performance Optimization

### Image Optimization
```bash
# Using ImageMagick
mogrify -resize 1920x1080> -quality 85 *.jpg
mogrify -resize 1920x1080> -quality 90 *.png

# Using online tools
# - tinypng.com
# - squoosh.app
# - imagecompressor.com
```

### Minification

**CSS:**
```bash
# Using npm
npx clean-css-cli assets/css/style.css -o assets/css/style.min.css
```

**JavaScript:**
```bash
# Using npm
npx terser assets/js/main.js -o assets/js/main.min.js
```

Update HTML to use minified versions in production.

## Security

- [ ] No sensitive data in repository
- [ ] API keys in environment variables (if any)
- [ ] HTTPS enabled
- [ ] Regular dependency updates (if using build tools)

## Analytics & Monitoring

Consider adding:
- Google Analytics
- Microsoft Clarity
- Hotjar
- Plausible (privacy-friendly alternative)

## Need Help?

- **GitHub Pages Docs**: https://pages.github.com
- **GitHub Community**: https://github.community
- **Stack Overflow**: Tag questions with `github-pages`

---

Good luck with your deployment! 🚀
