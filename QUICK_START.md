# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## 🚀 Super Quick Start

```bash
# 1. Navigate to the public directory
cd public

# 2. Start local server
python -m http.server 8000

# 3. Open in browser
# Visit: http://localhost:8000
```

That's it! Your portfolio is now running locally.

## 📦 What You Have

Your portfolio includes:

- ✅ **6 Complete Pages** (Home, About, Projects, Templates, Blog, Contact)
- ✅ **GSAP Floating Animation** (preserved exactly from your code)
- ✅ **Light & Dark Themes** (with live gradients)
- ✅ **All Resume Content** (professional summary, projects, certifications)
- ✅ **Fully Responsive** (mobile, tablet, desktop)
- ✅ **SEO Optimized** (meta tags, Open Graph, accessibility)

## 🎯 3 Essential Updates Before Going Live

### 1. Replace Images (5 minutes)
Navigate to `public/assets/images/` and replace:
- `logo.png` - Your personal/company logo
- Power Platform icons (powerapps, powerautomate, sharepoint, dataverse, chatbot)
- `project-placeholder.png` - Your actual project screenshots

### 2. Update Contact Form (1 minute)
In `contact.html`, find this line (around line 67):
```html
src="https://forms.office.com/Pages/ResponsePage.aspx?id=YOUR_FORM_ID_HERE"
```
Replace `YOUR_FORM_ID_HERE` with your Microsoft Form ID.

### 3. Verify Contact Info (2 minutes)
Search and replace in all files:
- `info@nuqtoris.com` → your email
- `+91 8956780241` → your phone
- Update LinkedIn URL if different

## 🌐 Deploy to GitHub Pages (10 minutes)

```bash
# In the public directory
cd public

# Initialize git
git init
git add .
git commit -m "Initial commit: Professional portfolio"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main

# Enable GitHub Pages:
# Go to repo Settings → Pages → Source: main branch, / (root) → Save
```

Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## 📱 Test Your Site

### Desktop Testing
- ✅ Open in browser
- ✅ Toggle theme (button in top-right)
- ✅ Navigate through all pages
- ✅ Watch the floating background animation
- ✅ Hover over cards and buttons

### Mobile Testing
- ✅ Open on phone
- ✅ Test navigation menu
- ✅ Verify text is readable
- ✅ Check all sections load

### Browser Testing
Test in:
- Chrome/Edge
- Firefox
- Safari

## 🎨 Customize (Optional)

### Change Colors
Edit `public/assets/css/style.css` around line 30:
```css
:root {
  --accent-1: #667eea;  /* Change primary color */
  --accent-2: #764ba2;  /* Change secondary color */
}
```

### Change Animation Speed
Edit `public/assets/js/main.js` around line 88:
```javascript
duration: 12 + Math.random() * 12,  // Increase or decrease numbers
```

## 📚 Full Documentation

For detailed information, see:
- `README.md` - Complete setup and features
- `DEPLOYMENT.md` - Step-by-step deployment guide
- `CHECKLIST.md` - Pre-deployment checklist
- `IMPLEMENTATION_SUMMARY.md` - What was built

## 🆘 Quick Troubleshooting

**Images not showing?**
- Check file names match exactly (case-sensitive)
- Ensure images are in `assets/images/` folder

**Animations not working?**
- Check browser console (F12) for errors
- Verify JavaScript is enabled
- Try in different browser

**Theme not switching?**
- Clear browser cache
- Try incognito/private mode

**Site not loading after deployment?**
- Wait 2-3 minutes for GitHub Pages to deploy
- Check GitHub Actions tab for deployment status
- Verify GitHub Pages is enabled in settings

## ✨ Pro Tips

1. **Always test locally before deploying**
2. **Compress images** before adding them (use tinypng.com)
3. **Keep backups** of your files
4. **Update regularly** with new projects
5. **Share on LinkedIn** once deployed

## 🎯 Your Next Steps

1. [ ] Test locally (5 min)
2. [ ] Replace images (5 min)
3. [ ] Update contact form (1 min)
4. [ ] Verify information (2 min)
5. [ ] Deploy to GitHub Pages (10 min)
6. [ ] Test live site (5 min)
7. [ ] Share with network (∞)

## 📞 Need Help?

- Check the detailed README.md
- Search for error messages online
- Review browser console for specific errors

---

**Estimated Time to Launch**: 30 minutes (including testing)

**You've got this!** 🚀

Start with the local test, then make updates, and finally deploy. Take it step by step.

Good luck!
