# Modern Terminal Portfolio - Vladislav Kondratyev

A professional portfolio website with a "Modern Terminal" / retro-futuristic CLI aesthetic, built with **vanilla HTML, CSS, and JavaScript**.

## 🚀 Features

### Visual Design
- **Dark Terminal Theme** with neon green accents (#00ff9c)
- **Animated Background** with subtle grid and scanline effects
- **Monospace Typography** using Fira Code font
- **Responsive Design** that works on all devices
- **Mouse Glow Effect** that follows cursor movement

### Interactive Elements
- **Boot Sequence Animation** on first page load
- **Typing Effect** for hero heading
- **Scroll-Triggered Animations** for content reveals
- **Project Cards** with hover effects and modal details
- **Mobile-Friendly Navigation** with hamburger menu
- **Keyboard Shortcuts** for quick navigation

### Pages
1. **Home** - Hero section with welcome message
2. **About** - Six sections detailing your background and goals
3. **Projects** - Three business communication projects with modal details
4. **Resume** - PDF viewer and downloadable resume
5. **Contact** - Contact information and links

## 📁 Project Structure

```
BCOM_POP/
├── index.html              # Home page
├── about.html              # About page
├── projects.html           # Projects page
├── resume.html             # Resume page
├── contact.html            # Contact page
├── css/
│   ├── global.css         # Variables, reset, typography
│   ├── layout.css         # Header, navigation, containers
│   ├── animations.css     # All animations and effects
│   └── pages.css          # Page-specific styles
├── js/
│   ├── main.js            # Boot sequence, typing, core functions
│   ├── animations.js      # Scroll reveals, mouse glow
│   └── projects.js        # Project cards and modals
└── assets/
    └── resume/            # Place your resume PDF here
```

## 🎨 Customization Guide

### Colors
Edit the CSS variables in `css/global.css`:

```css
:root {
  --bg-dark: #1a1a1a;           /* Background color */
  --text-primary: #e0e0e0;      /* Main text color */
  --accent-green: #00ff9c;      /* Accent/highlight color */
  --accent-glow: rgba(0, 255, 156, 0.3);  /* Glow effect */
  --border-color: #333;         /* Border color */
}
```

### Personal Information

1. **Update all HTML files** with your information:
   - Name, title, and descriptions
   - Email, LinkedIn, and GitHub links
   - Project details and reflections

2. **Add Your Resume**:
   - Place your resume PDF in `assets/resume/`
   - Update the iframe src in `resume.html`:
   ```html
   <iframe src="assets/resume/your_resume.pdf" width="100%" height="800px"></iframe>
   ```

3. **Add Project Content**:
   - In `projects.html`, replace placeholder text with your actual project descriptions
   - Add images/PDFs to the `.project-embed` sections
   - Update the modal content for each project

### Fonts
The site uses **Fira Code** from Google Fonts. To change the font:
1. Update the Google Fonts link in all HTML files
2. Change the `--font-mono` variable in `css/global.css`

## ⚙️ Keyboard Shortcuts

- `Alt + H` - Go to Home
- `Alt + A` - Go to About
- `Alt + P` - Go to Projects
- `Alt + R` - Go to Resume
- `Alt + C` - Go to Contact
- `Esc` - Close modals

## 🎯 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 🛠️ Setup & Deployment

### Local Development
1. Clone or download this repository
2. Open `index.html` in your browser
3. No build process or dependencies needed!

### Deployment Options

#### GitHub Pages
1. Create a GitHub repository
2. Push your code to the repository
3. Go to Settings → Pages
4. Select your branch and root folder
5. Your site will be live at `https://yourusername.github.io/repository-name/`

#### Netlify
1. Drag and drop the entire folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your site is instantly live!

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

## 🎨 Adding New Projects

To add a new project card:

1. **In `projects.html`**, add a new card:
```html
<div class="project-card scroll-reveal hover-lift" data-project="newproject">
  <!-- Card content -->
</div>
```

2. **Add a modal** for the project:
```html
<div id="newproject-modal" class="modal">
  <!-- Modal content -->
</div>
```

3. **Update `js/projects.js`** to include the new modal:
```javascript
const modals = {
  email: document.getElementById('email-modal'),
  data: document.getElementById('data-modal'),
  presentation: document.getElementById('presentation-modal'),
  newproject: document.getElementById('newproject-modal')  // Add this
};
```

## 🐛 Troubleshooting

### Boot sequence keeps playing
- The boot sequence uses `sessionStorage` to run only once per session
- Clear your browser's session storage or open in a new tab/window

### Animations not working
- Check browser console for JavaScript errors
- Ensure all CSS and JS files are loading correctly
- Try clearing browser cache

### Modal won't close
- Press `Esc` key
- Click outside the modal content
- Click the `×` button in the top right

### Mobile menu not working
- Check that `js/main.js` is loading correctly
- Ensure you're clicking the hamburger menu icon (☰)

## 🎭 Easter Egg

Try entering the **Konami Code** on your keyboard:
```
↑ ↑ ↓ ↓ ← → ← → B A
```

## 📝 Content Guidelines

### Writing Tips
- Keep paragraphs short and scannable
- Use bullet points for lists
- Write in first person ("I" not "we")
- Be specific about your accomplishments
- Show, don't just tell

### Project Reflections
Each project should include:
- **Overview** - What was the assignment?
- **My Approach** - How did you tackle it?
- **Reflection** - What did you learn?
- **Skills Demonstrated** - Specific takeaways

## 🚀 Performance Optimization

The site is already optimized, but here are some tips:

1. **Compress images** before adding them
2. **Use WebP format** for images when possible
3. **Minimize custom fonts** - stick to 1-2 font families
4. **Lazy load heavy content** (already implemented for project embeds)

## 📱 Testing Checklist

- [ ] Test on desktop Chrome, Firefox, Safari
- [ ] Test on mobile devices (iOS and Android)
- [ ] Test all navigation links
- [ ] Test keyboard shortcuts
- [ ] Test modal open/close functionality
- [ ] Test responsive breakpoints
- [ ] Verify all external links open in new tabs
- [ ] Check for console errors
- [ ] Test with screen reader (accessibility)
- [ ] Verify resume PDF loads correctly

## 🎓 Academic Integrity

This portfolio template is designed for educational purposes. When using it:
- Customize all content to reflect your own work
- Replace placeholder project content with your actual assignments
- Ensure all work displayed is your own
- Follow your institution's guidelines on portfolio submissions

## 📄 License

This project is open source and free to use for personal portfolios.

## 🤝 Credits

Built with:
- Vanilla HTML, CSS, and JavaScript
- [Fira Code](https://github.com/tonsky/FiraCode) font by Nikita Prokopov
- Inspiration from terminal interfaces and retro-futuristic design

---

**Built by Vladislav Kondratyev** | Computer Science @ UT Dallas

For questions or feedback, reach out via the Contact page!
