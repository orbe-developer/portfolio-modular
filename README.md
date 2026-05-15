# portfolio-modular

Personal portfolio website for Orbehin Sarmiento Barzaga — Senior Backend Engineer based in London.

**Live site:** https://orbe-developer.github.io/portfolio-modular/

## Design

Modern style with BEM-style CSS class naming and a fully modular stylesheet architecture — one CSS file per section. Uses Playfair Display, Inter, and JetBrains Mono. No frameworks, no dependencies.

## Structure

```
portfolio-modular/
├── index.html
├── css/
│   ├── main.css       (imports all modules)
│   ├── base.css
│   ├── nav.css
│   ├── hero.css
│   ├── experience.css
│   ├── stack.css
│   ├── award.css
│   ├── education.css
│   ├── project.css
│   ├── contact.css
│   ├── footer.css
│   ├── sections.css
│   ├── reveal.css
│   └── responsive.css
├── js/main.js
└── assets/
```

## Tech

- Vanilla HTML, CSS, JavaScript
- Google Fonts: Playfair Display + Inter + JetBrains Mono
- Modular CSS imported via a single `main.css` entry point
- IntersectionObserver for scroll animations
- Deployed via GitHub Pages
