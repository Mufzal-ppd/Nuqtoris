# Mufzal Shaikh - Professional Portfolio

A modern, highly animated, multi-page portfolio website for a Microsoft Certified Power Platform Developer.

## Features

- **Multi-page architecture** with smooth navigation
- **GSAP-powered floating background animation** with cursor repel interaction
- **Light & Dark themes** with live gradient animations
- **Fully responsive** design for mobile, tablet, and desktop
- **Custom animated cursor** with trailing outline
- **Smooth scroll animations** and micro-interactions
- **SEO optimized** with Open Graph and Twitter Card tags
- **Accessibility** features including keyboard navigation and ARIA labels
- **Performance optimized** with lazy loading and efficient animations

## Pages

- **Home** (`index.html`) - Hero, About summary, Services, Featured Projects, Client Promise
- **About** (`about.html`) - Detailed bio, Skills, Experience timeline, Certifications
- **Projects** (`projects.html`) - Complete project portfolio with case studies
- **Templates** (`templates.html`) - Power Platform templates (coming soon)
- **Blog** (`blog.html`) - Articles and insights (coming soon)
- **Contact** (`contact.html`) - Contact form, information, and FAQ

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern animations, gradients, and responsive design
- **JavaScript (ES6+)** - Interactive features
- **GSAP 3.12.2** - Advanced animations and ScrollTrigger
- **No frameworks** - Pure vanilla JavaScript for maximum performance

## Project Structure

```
project/
├── public/
│   ├── index.html
│   ├── about.html
│   ├── projects.html
│   ├── templates.html
│   ├── blog.html
│   ├── contact.html
│   └── assets/
│       ├── css/
│       │   └── style.css
│       ├── js/
│       │   └── main.js
│       └── images/
│           ├── logo.png
│           ├── powerapps.png
│           ├── powerautomate.png
│           ├── sharepoint.png
│           ├── dataverse.png
│           ├── chatbot.png
│           ├── project-placeholder.png
│           └── og-image.jpg
└── README.md
```

## Setup Instructions

### Local Development

1. **Clone or download** this repository

2. **Add your images** to `public/assets/images/`:
   - `logo.png` - Your logo (44x44px minimum)
   - Power Platform icons (60x60px recommended):
     - `powerapps.png`
     - `powerautomate.png`
     - `sharepoint.png`
     - `dataverse.png`
     - `chatbot.png`
   - `project-placeholder.png` - Project screenshots
   - `og-image.jpg` - Social sharing image (1200x630px)

3. **Update Microsoft Form** in `contact.html`:
   - Replace the iframe `src` URL with your Microsoft Form embed URL
   - Find line: `src="https://forms.office.com/Pages/ResponsePage.aspx?id=YOUR_FORM_ID_HERE"`

4. **Update personal information**:
   - Contact details in `contact.html`
   - LinkedIn URL throughout all pages
   - Email addresses
   - Phone number
   - Website URL

5. **Serve locally**:
   ```bash
   # Using Python 3
   cd project/public
   python -m http.server 8000

   # Using Node.js (npx)
   npx serve public

   # Using PHP
   php -S localhost:8000 -t public
   ```

6. **Open in browser**: `http://localhost:8000`

## Deployment to GitHub Pages

### Method 1: GitHub Web Interface

1. **Create a new repository** on GitHub
2. **Upload all files** from the `public/` directory
3. Go to **Settings** → **Pages**
4. Under **Source**, select **main branch** and **/ (root)**
5. Click **Save**
6. Your site will be available at `https://yourusername.github.io/repository-name`

### Method 2: Git Command Line

```bash
# Navigate to the public directory
cd public

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Professional portfolio"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Create and push to gh-pages branch
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings
```

### Custom Domain Setup

1. In repository settings, go to **Pages**
2. Under **Custom domain**, enter your domain
3. Add a `CNAME` file to your repository root with your domain name
4. Configure DNS:
   - For apex domain (example.com):
     - Add A records pointing to GitHub's IPs
   - For subdomain (www.example.com):
     - Add CNAME record pointing to `yourusername.github.io`

## Updating Content

### Adding Blog Posts

1. Create HTML files in `content/blog/` directory (you'll need to create this)
2. Update `blog.html` to link to your posts
3. Follow the existing card structure for consistency

### Adding Templates

1. Add template images to `assets/images/templates/`
2. Update `templates.html` with template cards
3. Include:
   - Template name
   - Description
   - Price (if applicable)
   - "Buy" or "Contact" button linking to contact page with prefilled subject

### Updating Projects

1. Edit `projects.html`
2. Add new project cards following the existing structure:
   ```html
   <article class="card project-card">
     <div class="project-media project-placeholder">
       <img src="assets/images/your-project.png" alt="Project Name">
     </div>
     <div class="project-body">
       <h3>Project Name</h3>
       <p>Description</p>
       <div class="project-meta">
         <span class="project-tag">Technology</span>
       </div>
       <div class="project-details">
         <p><strong>Useful for:</strong> Use case</p>
         <p><strong>Duration:</strong> Timeline</p>
       </div>
       <div class="project-impact">
         <strong>Impact:</strong> Results achieved
       </div>
       <p class="demo-note">Demo available on request.</p>
     </div>
   </article>
   ```

## Animation System

### GSAP Floating Background

The portfolio features a unique floating background animation system:

- **5 Power Platform logos** float randomly across the screen
- **Cursor repel effect** - logos move away from cursor
- **3D rotations** - logos tilt and rotate in 3D space
- **Glow effects** - subtle pulsing glow on logos
- **Performance optimized** - uses `willChange` and hardware acceleration

**⚠️ IMPORTANT:** Do not modify `main.js` floating animation logic without testing thoroughly. This system is carefully tuned for smooth performance.

### Theme System

- **Dark theme** (default) - Deep blue gradients with purple accents
- **Light theme** - Clean white/gray with blue accents
- **Persistent** - Theme choice saved to localStorage
- **Smooth transitions** - Animated theme switching

### Custom Cursor

- Only shown on devices with precision pointers (desktop)
- Dot follows cursor directly
- Outline has a smooth lag effect
- Hidden on touch devices

## Customization

### Colors

Edit CSS variables in `assets/css/style.css`:

```css
:root {
  --accent-1: #667eea;  /* Primary accent */
  --accent-2: #764ba2;  /* Secondary accent */
  --accent-3: #8b5cf6;  /* Tertiary accent */
}
```

### Animations

All animation timings can be adjusted in `main.js`:
- Logo floating speed: Line ~88
- Cursor lag: Line ~147
- Scroll reveal: Line ~211

### Layout

Responsive breakpoints in `style.css`:
- Desktop: Default
- Tablet: `@media (max-width: 1024px)`
- Mobile: `@media (max-width: 768px)`
- Small mobile: `@media (max-width: 480px)`

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

**Note:** Custom cursor disabled on touch devices for better UX.

## Performance Tips

1. **Optimize images** - Use WebP format and compress all images
2. **Lazy loading** - Images load as they enter viewport
3. **Minify assets** - Minify CSS and JS for production
4. **CDN** - GSAP loaded from CDN for caching benefits
5. **Preload fonts** - Add font preloading for better performance

## Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Alt text on images
- ✅ High contrast mode support
- ✅ Reduced motion support
- ✅ Screen reader friendly

## SEO Features

- Meta descriptions on all pages
- Open Graph tags for social sharing
- Twitter Card tags
- Semantic HTML structure
- Proper heading hierarchy
- Fast loading times
- Mobile responsive

## Troubleshooting

### Images not loading
- Check file paths are correct
- Ensure images are in `assets/images/` directory
- Verify file names match exactly (case-sensitive)

### Animations not working
- Check browser console for errors
- Verify GSAP CDN is accessible
- Ensure JavaScript is enabled

### Theme not switching
- Check localStorage is enabled in browser
- Clear browser cache
- Verify `main.js` is loading correctly

### Microsoft Form not embedding
- Ensure form URL is correct
- Check iframe is not blocked by browser
- Verify form is set to "Anyone can respond"

## License

This portfolio template is provided as-is for personal use. Feel free to customize for your own portfolio.

## Credits

- **Design & Development**: Mufzal Shaikh
- **Animations**: GSAP by GreenSock
- **Icons**: Lucide React / Microsoft Official Icons

## Contact

- **Email**: info@nuqtoris.com
- **Phone**: +91 8956780241
- **Website**: [nuqtoris.com](https://nuqtoris.com)
- **LinkedIn**: [Connect with me](https://www.linkedin.com/in/mufzal-shaikh)

---

Built with passion for Power Platform development. Last updated: October 2025
