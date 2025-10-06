# 📸 Complete Image Names List

All images should be placed in: `public/assets/images/`

## Required Images

### 1. Logo & Branding
```
logo.png
```
- **Used for**: Navigation bar logo (appears on all pages)
- **Recommended size**: 44x44px minimum (can be larger, will scale down)
- **Format**: PNG with transparent background
- **Description**: Your personal or company logo

---

### 2. Power Platform Icons (Floating Background Animation)
These 5 images are used for the GSAP floating background animation:

```
powerapps.png
powerautomate.png
sharepoint.png
dataverse.png
chatbot.png
```
- **Used for**: Animated floating logos in background
- **Recommended size**: 60x60px to 100x100px
- **Format**: PNG with transparent background
- **Description**: Microsoft Power Platform service icons
- **Note**: These float around and animate on every page

**Where to get them**:
- Official Microsoft Icons: https://developer.microsoft.com/fluentui
- Or use your own branded versions

---

### 3. Project Screenshots
```
project-placeholder.png
```
- **Used for**: Project showcase cards (on home page and projects page)
- **Recommended size**: 400x300px or 800x600px (16:9 or 4:3 ratio)
- **Format**: PNG or JPG
- **Description**: Screenshot or mockup of your projects
- **Note**: You can create multiple versions:
  - `project-placeholder.png` (generic fallback)
  - `project-school-observation.png` (specific project)
  - `project-crm.png` (specific project)
  - etc.

**Tip**: If using specific project images, update the HTML files to reference them.

---

### 4. Social Media / SEO Image
```
og-image.jpg
```
- **Used for**: Open Graph and Twitter Card previews when sharing on social media
- **Required size**: 1200x630px (Facebook/LinkedIn recommended)
- **Format**: JPG or PNG
- **Description**: Preview image shown when you share your portfolio link
- **Should include**: Your name, title, maybe a nice background or screenshot

---

### 5. Favicon (Optional but Recommended)
```
favicon.ico  (or favicon.png)
```
- **Used for**: Browser tab icon
- **Recommended size**: 32x32px or 16x16px
- **Format**: ICO or PNG
- **Current**: Currently using `/vite.svg` (you should replace this)

To update favicon, edit all HTML files and replace:
```html
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
```
With:
```html
<link rel="icon" type="image/png" href="assets/images/favicon.png" />
```

---

## Quick Summary Table

| File Name | Size | Format | Used For |
|-----------|------|--------|----------|
| `logo.png` | 44x44px+ | PNG | Navigation logo |
| `powerapps.png` | 60-100px | PNG | Floating animation |
| `powerautomate.png` | 60-100px | PNG | Floating animation |
| `sharepoint.png` | 60-100px | PNG | Floating animation |
| `dataverse.png` | 60-100px | PNG | Floating animation |
| `chatbot.png` | 60-100px | PNG | Floating animation |
| `project-placeholder.png` | 400x300px | PNG/JPG | Project cards |
| `og-image.jpg` | 1200x630px | JPG | Social sharing |
| `favicon.png` | 32x32px | PNG | Browser tab icon |

---

## Image Optimization Tips

1. **Compress images** before uploading:
   - Use https://tinypng.com/ (PNG)
   - Use https://squoosh.app/ (all formats)
   - Use https://imagecompressor.com/

2. **Use appropriate formats**:
   - PNG: Logos, icons (with transparency)
   - JPG: Photos, screenshots (no transparency)
   - WebP: Modern format (best compression)

3. **Recommended tools**:
   - Photoshop, Figma, Canva for creating
   - Online converters for format changes

---

## Current Placeholders

The current images are minimal 1px placeholders. They won't be visible but won't break the page.

Replace them with your real images in:
```
public/assets/images/
```

Keep the exact same file names to avoid updating HTML!

---

## Next Steps

1. ✅ Collect/create all your images
2. ✅ Name them exactly as shown above
3. ✅ Optimize/compress them
4. ✅ Place them in `public/assets/images/`
5. ✅ Test locally to verify they load
6. ✅ Deploy!

---

**Pro Tip**: Start with just `logo.png` and the 5 Power Platform icons to see the floating animation work, then add project images later!
