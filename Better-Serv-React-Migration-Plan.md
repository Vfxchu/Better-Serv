# Better Serv Properties — React Migration Plan

> **Purpose:** A step-by-step blueprint to migrate the existing vanilla HTML/CSS/JS multi-page site into a React SPA using React Router — pixel-perfect, zero bugs, zero design changes.
>
> **Target IDE:** Google Antigravity (AI-powered IDE)
>
> **Source:** 6 HTML pages, 1 CSS file (1,567 lines), 3 JS files (data, templates, app logic), ~40 image assets

---

## 1. CURRENT CODEBASE AUDIT

### 1.1 Pages (6 total)
| # | File | Route | `data-page` | Key Sections |
|---|------|-------|-------------|--------------|
| 1 | `index.html` | `/` | `home` | Hero (YouTube video bg), About snippet, Services grid, Dubai property slider, India property slider, Why Us grid, Stats counter, Developer sliders (Dubai + India), Process timeline, Testimonials, CTA, Footer |
| 2 | `about.html` | `/about` | `about` | Banner, Our Story (image + text split), Mission & Vision, Core Values grid, Stats counter, Team grid, Services grid, Testimonials, Developer sliders, CTA, Footer |
| 3 | `dubai.html` | `/dubai` | `dubai` | Banner, Tab nav (Buy/Rent), Property grid, Developer slider, CTA, Footer, Enquiry Modal |
| 4 | `india.html` | `/india` | `india` | Banner, Tab nav (Buy/Rent), Property grid, Developer slider, CTA, Footer, Enquiry Modal |
| 5 | `services.html` | `/services` | `services` | Banner, 5 alternating image+text service blocks (Interior, Maintenance, Rental, Legal, Valuation), CTA, Footer |
| 6 | `contact.html` | `/contact` | `contact` | Banner, Contact info + Form (2-col), Map placeholder, Footer |

### 1.2 JavaScript Files (3 total)
| File | Purpose | What It Contains |
|------|---------|-----------------|
| `data.js` | All data + SVG icon strings | `ICONS` (17 inline SVGs), `HS` (hero slides — unused, replaced by YouTube), `SV` (4 services), `DP` (10 Dubai properties), `IP` (9 India properties), `DD` (13 Dubai developers), `ID` (11 India developers), `WU` (6 why-us items), `ST` (4 stats), `PR` (5 process steps), `TM` (4 testimonials), `VL` (6 core values), `TEM` (4 team members) |
| `templates.js` | HTML template generators | `pc()` — property card, `sl()` — property slider, `devSl()` — developer slider |
| `app.js` | Page init + event handling | `ss()` scroll slider, `initAutoScroll()`, `initPg()` scroll reveal + counter animation, `openM()`/`closeM()`/`subM()` modal, `subC()` contact form, `renderHome()`, `renderAbout()`, `renderProps()`, event delegation, header scroll |

### 1.3 CSS (`styles.css` — 1,567 lines)
Key design tokens (CSS variables): `--blue: #0055ff`, `--gold: #c9a84c`, `--bg-dark: #0a0a0f`, fonts: DM Sans (body) + Playfair Display (display). Includes: scroll-reveal animation classes (`.reveal`, `.vis`, `.d1`–`.d8`), header (fixed, transparent → scrolled dark), mobile bottom nav bar, hero with YouTube iframe overlay, property cards, sliders with arrow buttons, developer logo sliders, stats counter strip, process timeline with animated connector lines, testimonial cards, enquiry modal, contact form, footer, and full responsive breakpoints.

### 1.4 Assets
| Folder | Contents | Count |
|--------|----------|-------|
| `Dubai Developers/` | Developer logo PNGs | 13 |
| `Indian Developers/` | Developer logo PNGs/JPGs | 11 |
| `developer_images/` | Duplicate dev logos (PNG + SVG) | 20 (unused — `data.js` references `Dubai Developers/` and `Indian Developers/` folders instead) |
| `service_assets/` | 5 large service images (PNG, 600–775 KB each) | 5 |
| Root | `logo.png` (134 KB) | 1 |

### 1.5 External Dependencies
| Dependency | Current Usage | React Replacement |
|------------|---------------|-------------------|
| Font Awesome 6.4 CDN | Social icons in footer, WhatsApp/phone sticky buttons | `react-icons/fa6` |
| Google Fonts (DM Sans, Playfair Display) | Typography | Keep as-is (CDN link in `index.html`) |
| Unsplash images (hotlinked) | Property images, team photos, hero slides, about page | Keep as-is (same URLs) |
| YouTube embed | Hero background video | Keep as-is (iframe) |
| Inline SVGs in `data.js` | Service icons, Why Us icons, nav icons, property pin icon | Replace with `react-icons/lu` (Lucide) |

### 1.6 Issues Found in Current Code
| # | Issue | Location | Severity |
|---|-------|----------|----------|
| 1 | `developer_images/` folder is entirely unused — `data.js` references `Dubai Developers/` and `Indian Developers/` paths | `data.js` lines 84–113 | Cleanup |
| 2 | `HS` hero slides array defined but never used (YouTube replaced it) | `data.js` line 25–30 | Dead code |
| 3 | Header/footer/mobile-nav HTML duplicated across all 6 pages | All HTML files | Redundancy |
| 4 | Emoji icons used inconsistently (🛏, 📐, 📍, 📞, ✉️, 🕐, ✨, 🗺️) alongside Font Awesome + inline SVGs — three icon systems | Throughout | Inconsistency |
| 5 | Contact form and enquiry modal have no real submission — just DOM swap | `app.js` | No backend |
| 6 | Sticky CTA buttons (WhatsApp + Call) only exist on `index.html`, missing from other pages | `index.html` only | Inconsistency |
| 7 | Map section is a placeholder div, not a real map | `contact.html` | Incomplete |
| 8 | Some inline styles override CSS classes inconsistently | Multiple HTML files | Maintainability |

---

## 2. TARGET REACT ARCHITECTURE

### 2.1 Tech Stack
```
React 18 (Vite)
React Router v6 (client-side routing)
react-icons (Lucide + Font Awesome 6 subsets)
CSS Modules OR single global CSS file (to preserve pixel-perfect match)
No Tailwind, no UI library — pure CSS migration of existing styles.css
```

### 2.2 Final Folder Structure
```
better-serv/
├── public/
│   ├── logo.png
│   ├── dubai-developers/          ← renamed (no spaces)
│   │   ├── emaar.png
│   │   ├── damac.png
│   │   └── ... (13 files)
│   ├── indian-developers/         ← renamed (no spaces)
│   │   ├── dlf-logo.png
│   │   ├── godrej.jpg
│   │   └── ... (11 files)
│   └── service-assets/            ← renamed (no underscore)
│       ├── interior.png
│       ├── legal.png
│       ├── maintenance.png
│       ├── management.png
│       └── valuation.png
│
├── src/
│   ├── main.jsx                   ← entry point
│   ├── App.jsx                    ← router + layout wrapper
│   ├── styles/
│   │   ├── global.css             ← full styles.css migrated (CSS variables, animations, all classes)
│   │   └── sticky-buttons.css     ← extracted from index.html <style> block
│   │
│   ├── data/
│   │   ├── properties.js          ← DP[] and IP[] arrays
│   │   ├── developers.js          ← DD[] and ID[] arrays (with updated image paths)
│   │   ├── services.js            ← SV[] array
│   │   ├── whyUs.js               ← WU[] array
│   │   ├── stats.js               ← ST[] array
│   │   ├── process.js             ← PR[] array
│   │   ├── testimonials.js        ← TM[] array
│   │   ├── coreValues.js          ← VL[] array
│   │   └── team.js                ← TEM[] array
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx         ← fixed header with scroll detection
│   │   │   ├── MobileNav.jsx      ← bottom nav bar (react-icons/lu for nav icons)
│   │   │   ├── Footer.jsx         ← 4-column footer
│   │   │   ├── Loader.jsx         ← app-loader with logo
│   │   │   └── StickyButtons.jsx  ← WhatsApp + Call floating buttons
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.jsx    ← YouTube iframe background + overlay + CTA
│   │   │   ├── AboutSnippet.jsx   ← image + text split section
│   │   │   ├── ServicesGrid.jsx   ← 4-card feature grid (reusable)
│   │   │   ├── PropertySlider.jsx ← horizontal scroll slider with arrows + auto-scroll
│   │   │   ├── WhyUsGrid.jsx      ← 6-card dark-bg grid
│   │   │   ├── StatsBar.jsx       ← animated counter strip (IntersectionObserver)
│   │   │   ├── DeveloperSlider.jsx← logo carousel with enquiry click
│   │   │   ├── ProcessTimeline.jsx← numbered steps with animated connector lines
│   │   │   └── TestimonialsGrid.jsx← star-rated testimonial cards
│   │   │
│   │   ├── shared/
│   │   │   ├── SectionWrapper.jsx ← <section> with bg prop + section-inner
│   │   │   ├── SectionTag.jsx     ← the small tag/label above titles
│   │   │   ├── PageBanner.jsx     ← banner header for inner pages
│   │   │   ├── PropertyCard.jsx   ← single property card
│   │   │   ├── CtaSection.jsx     ← dark-bg call-to-action block
│   │   │   ├── EnquiryModal.jsx   ← modal overlay with form + success state
│   │   │   └── ScrollReveal.jsx   ← wrapper component using IntersectionObserver
│   │   │
│   │   └── about/
│   │       ├── StorySection.jsx
│   │       ├── MissionVision.jsx
│   │       ├── CoreValuesGrid.jsx
│   │       └── TeamGrid.jsx
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── DubaiPage.jsx
│   │   ├── IndiaPage.jsx
│   │   ├── ServicesPage.jsx
│   │   └── ContactPage.jsx
│   │
│   └── hooks/
│       ├── useScrollReveal.js     ← IntersectionObserver hook for .reveal animations
│       ├── useCountUp.js          ← animated number counter hook
│       └── useHeaderScroll.js     ← scroll detection for header bg change
│
├── index.html                     ← Vite entry (Google Fonts link here)
├── package.json
└── vite.config.js
```

### 2.3 Files to DELETE (not migrated)
```
developer_images/          ← entire folder (unused, data.js doesn't reference it)
js/data.js                 ← replaced by src/data/*.js modules
js/templates.js            ← replaced by React components
js/app.js                  ← replaced by React components + hooks
HS[] array                 ← dead code (YouTube video replaced hero slider)
```

---

## 3. MIGRATION STEPS (Sequential Order)

### Phase 1: Project Scaffold
**Step 1.1** — Create Vite + React project
```bash
npm create vite@latest better-serv -- --template react
cd better-serv
npm install react-router-dom react-icons
```

**Step 1.2** — Move assets into `public/` with clean folder names (no spaces, no underscores)

**Step 1.3** — Copy `styles.css` → `src/styles/global.css` and extract the sticky button styles from the `index.html` `<style>` block into `src/styles/sticky-buttons.css`. Import both in `main.jsx`.

**Step 1.4** — Add Google Fonts `<link>` to `index.html` (Vite root)

### Phase 2: Data Layer
**Step 2.1** — Split `data.js` into 9 separate ES module files under `src/data/`. Each exports a named array. Remove the `ICONS` object entirely — icons will come from `react-icons`.

**Step 2.2** — Update all image paths in `developers.js` to use the new `public/` paths:
- `"Dubai Developers/Emaar.png"` → `"/dubai-developers/emaar.png"`
- `"Indian Developers/dlf-logo.png"` → `"/indian-developers/dlf-logo.png"`
- Same for `service_assets/` → `/service-assets/`

### Phase 3: Layout Components
**Step 3.1** — `Header.jsx`: Fixed header, transparent → dark on scroll. Use `useHeaderScroll` hook (replaces the vanilla `window.addEventListener('scroll')`). Use `<NavLink>` from React Router for active state. Logo links to `/`.

**Step 3.2** — `MobileNav.jsx`: Bottom nav bar. Replace inline SVGs with Lucide icons from `react-icons/lu`: `LuHome`, `LuBuilding2`, `LuLandmark`, `LuInfo`, `LuBriefcase`, `LuMail`.

**Step 3.3** — `Footer.jsx`: 4-column grid. Replace emoji icons (📍, 📞, ✉️) with `react-icons/lu` equivalents (`LuMapPin`, `LuPhone`, `LuMail`). Replace Font Awesome social icons with `react-icons/fa6` (`FaInstagram`, `FaTiktok`, `FaLinkedinIn`, `FaXTwitter`, `FaFacebookF`, `FaYoutube`). Use `<Link>` for internal routes.

**Step 3.4** — `Loader.jsx`: App loader with logo + `hidden` class after timeout.

**Step 3.5** — `StickyButtons.jsx`: WhatsApp + Call floating buttons with pulse animation. Present on ALL pages (fixing the current bug where they only appear on home).

**Step 3.6** — `App.jsx`: Wraps `<Header>` + `<MobileNav>` + `<Outlet>` (React Router) + `<Footer>` + `<StickyButtons>` + `<EnquiryModal>`.

### Phase 4: Shared Components
**Step 4.1** — `ScrollReveal.jsx`: A wrapper component that applies `.reveal` and `.vis` classes using IntersectionObserver (replaces `initPg()` observer logic). Accepts `delay` prop for `.d1`–`.d8` classes.

**Step 4.2** — `PropertyCard.jsx`: Converts the `pc()` template function. Replace bed emoji (🛏) with `LuBed`, area emoji (📐) with `LuRuler`, pin SVG with `LuMapPin`. Each card's "Enquire" button opens the modal.

**Step 4.3** — `PropertySlider.jsx`: Horizontal scroll container with left/right arrow buttons. Includes auto-scroll interval logic (replaces `initAutoScroll()`). Pause on hover/touch.

**Step 4.4** — `DeveloperSlider.jsx`: Logo carousel. Duplicates array for seamless loop (like current `devs.concat(devs)`). Click opens enquiry modal.

**Step 4.5** — `EnquiryModal.jsx`: Overlay modal with form fields + success state. Managed via React state (open/close/title/subtitle). Uses context or prop drilling from App.jsx.

**Step 4.6** — `SectionWrapper.jsx`, `SectionTag.jsx`, `PageBanner.jsx`, `CtaSection.jsx` — simple presentational wrappers matching existing class names.

### Phase 5: Page-Specific Components
**Step 5.1** — `HeroSection.jsx`: YouTube iframe with overlay, reveal-animated content, two CTA buttons.

**Step 5.2** — `StatsBar.jsx`: 4-column stat strip with animated count-up. Uses `useCountUp` hook triggered by IntersectionObserver.

**Step 5.3** — `ProcessTimeline.jsx`: Numbered steps with `.ts-line` connector animation.

**Step 5.4** — `TestimonialsGrid.jsx`: Star-rated cards.

**Step 5.5** — `ServicesGrid.jsx`: 4-card grid with icon box. Replace all inline SVG icons with Lucide equivalents: `LuDiamond` (build), `LuKey` (key), `LuTrendingUp` (chart), `LuSettings` (gear).

**Step 5.6** — `WhyUsGrid.jsx`: Dark-bg 6-card grid. Icon mapping: `LuUsers` (expert agents), `LuShieldCheck` (verified), `LuGlobe` (global reach), `LuDollarSign` (best value), `LuHeadphones` (24/7 support — NOT `LuUsers` again, fixing the duplicate icon bug), `LuZap` (fast closing).

**Step 5.7** — About page components: `StorySection`, `MissionVision`, `CoreValuesGrid` (icons: `LuTarget`, `LuShieldCheck`, `LuScale` (integrity — NOT `LuShieldCheck` again, fixing duplicate), `LuAward`, `LuZap`, `LuLeaf`), `TeamGrid`.

### Phase 6: Pages Assembly
**Step 6.1** — `HomePage.jsx`: Assembles Hero → AboutSnippet → ServicesGrid → DubaiSlider → IndiaSlider → WhyUs → Stats → Developers → Process → Testimonials → CTA.

**Step 6.2** — `AboutPage.jsx`: Banner → Story → MissionVision → CoreValues → Stats → Team → Services → Testimonials → Developers → CTA.

**Step 6.3** — `DubaiPage.jsx`: Banner → Tab nav (buy/rent state) → PropertyGrid → DeveloperSlider → CTA.

**Step 6.4** — `IndiaPage.jsx`: Same structure as Dubai, different data.

**Step 6.5** — `ServicesPage.jsx`: Banner → 5 alternating split sections (image left/right).

**Step 6.6** — `ContactPage.jsx`: Banner → Contact info + form → Map placeholder.

### Phase 7: Router Setup
```jsx
// App.jsx
<BrowserRouter>
  <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/dubai" element={<DubaiPage />} />
      <Route path="/india" element={<IndiaPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  </Layout>
</BrowserRouter>
```

### Phase 8: Final QA Checklist
Run through every item below before delivery:

| # | Check | Status |
|---|-------|--------|
| 1 | All 6 pages render without console errors | ☐ |
| 2 | All scroll-reveal animations trigger correctly | ☐ |
| 3 | Header transparent → dark on scroll works | ☐ |
| 4 | Mobile nav active states match current page | ☐ |
| 5 | Property sliders scroll + auto-scroll + pause on hover | ☐ |
| 6 | Developer sliders scroll + auto-scroll | ☐ |
| 7 | Stats counter animates on scroll into view (once only) | ☐ |
| 8 | Process timeline lines animate in sequence | ☐ |
| 9 | Buy/Rent tab filtering works on Dubai + India pages | ☐ |
| 10 | Enquiry modal opens with correct title/subtitle for each property/developer | ☐ |
| 11 | Enquiry modal close on X, backdrop click, and form submit → success | ☐ |
| 12 | Contact form submit → success message | ☐ |
| 13 | WhatsApp + Call sticky buttons visible on ALL pages | ☐ |
| 14 | All developer logos load (no broken images) | ☐ |
| 15 | All service images load | ☐ |
| 16 | YouTube hero video autoplays muted with loop | ☐ |
| 17 | Footer social links use correct icons | ☐ |
| 18 | All icons are react-icons (zero inline SVGs, zero Font Awesome CDN, zero emojis as icons) | ☐ |
| 19 | CSS variables identical to original | ☐ |
| 20 | Fonts (DM Sans + Playfair Display) loading correctly | ☐ |
| 21 | Responsive: Desktop (1200+), Tablet (768–1199), Mobile (<768) | ☐ |
| 22 | Page transitions / fade-up animation on route change | ☐ |
| 23 | Loader shows on initial load, hides after 800ms | ☐ |
| 24 | No dead code, no unused imports, no unused files | ☐ |
| 25 | `developer_images/` folder NOT included in final build | ☐ |

---

## 4. ICON REPLACEMENT MAP

Every icon in the current codebase and its exact `react-icons` replacement:

### Navigation Icons (MobileNav)
| Current | Context | Replacement |
|---------|---------|-------------|
| Inline SVG (house) | Home tab | `LuHome` |
| Inline SVG (skyline) | Dubai tab | `LuBuilding2` |
| Inline SVG (building) | India tab | `LuLandmark` |
| Inline SVG (info circle) | About tab | `LuInfo` |
| Inline SVG (briefcase) | Services tab | `LuBriefcase` |
| Inline SVG (envelope) | Contact tab | `LuMail` |

### Service Icons (`SV[]`)
| Current (`ICONS.*`) | Context | Replacement |
|---------------------|---------|-------------|
| `ICONS.build` (diamond grid) | Property Development | `LuDiamond` |
| `ICONS.key` | Sales & Leasing | `LuKeyRound` |
| `ICONS.chart` | Investment Advisory | `LuTrendingUp` |
| `ICONS.gear` | Property Management | `LuSettings` |

### Why Us Icons (`WU[]`)
| Current | Context | Replacement |
|---------|---------|-------------|
| `ICONS.users` | Expert Agents | `LuUsers` |
| `ICONS.shield` | Verified Listings | `LuShieldCheck` |
| `ICONS.globe` | Global Reach | `LuGlobe` |
| `ICONS.dollar` | Best Value | `LuDollarSign` |
| `ICONS.users` ⚠️ DUPLICATE | 24/7 Support | `LuHeadphones` ← **FIX** |
| `ICONS.zap` | Fast Closing | `LuZap` |

### Core Values Icons (`VL[]`)
| Current | Context | Replacement |
|---------|---------|-------------|
| `ICONS.target` | Client-First | `LuTarget` |
| `ICONS.shield` | Transparency | `LuShieldCheck` |
| `ICONS.shield` ⚠️ DUPLICATE | Integrity | `LuScale` ← **FIX** |
| `ICONS.award` | Excellence | `LuAward` |
| `ICONS.zap` | Innovation | `LuZap` |
| `ICONS.leaf` | Sustainability | `LuLeaf` |

### Property Card Icons
| Current | Context | Replacement |
|---------|---------|-------------|
| `🛏` emoji | Beds | `LuBed` (size 14) |
| `📐` emoji | Area | `LuRuler` (size 14) |
| Inline SVG (map pin) | Location | `LuMapPin` (size 14) |

### Footer Contact Icons
| Current | Context | Replacement |
|---------|---------|-------------|
| `📍` emoji | Address | `LuMapPin` |
| `📞` emoji | Phone | `LuPhone` |
| `✉️` emoji | Email | `LuMail` |

### Footer Social Icons
| Current (Font Awesome) | Replacement (`react-icons/fa6`) |
|------------------------|--------------------------------|
| `fa-brands fa-instagram` | `FaInstagram` |
| `fa-brands fa-tiktok` | `FaTiktok` |
| `fa-brands fa-linkedin-in` | `FaLinkedinIn` |
| `fa-brands fa-x-twitter` | `FaXTwitter` |
| `fa-brands fa-facebook-f` | `FaFacebookF` |
| `fa-brands fa-youtube` | `FaYoutube` |

### Sticky Buttons
| Current (Font Awesome) | Replacement |
|------------------------|-------------|
| `fa-brands fa-whatsapp` | `FaWhatsapp` |
| `fa-solid fa-phone` | `LuPhone` |

### Contact Page Icons
| Current | Context | Replacement |
|---------|---------|-------------|
| `📍` emoji | Office locations | `LuMapPin` |
| `📞` emoji | Phone numbers | `LuPhone` |
| `✉️` emoji | Email | `LuMail` |
| `🕐` emoji | Working hours | `LuClock` |
| `🗺️` emoji | Map placeholder | `LuMap` |

### Developer Slider Labels
| Current | Context | Replacement |
|---------|---------|-------------|
| `🏙️` emoji | "Dubai Developers" label | `LuBuilding2` inline |
| `🇮🇳` emoji | "India Developers" label | `LuFlag` inline |
| `✨` emoji | Partner benefit text | `LuSparkles` inline |

---

## 5. PROMPT TO USE IN ANTIGRAVITY

Once you're ready to execute, paste this prompt into Antigravity:

---

**Prompt for Antigravity:**

> Migrate this Better Serv Properties project from vanilla HTML/CSS/JS to React 18 + Vite + React Router v6. Follow the migration plan document exactly.
>
> **Rules:**
> 1. Pixel-perfect — every color, spacing, font size, animation, and layout must match the original CSS exactly. Do not redesign anything.
> 2. Use the existing `styles.css` as a global CSS file — do not rewrite styles. Only add minor adjustments for React-specific needs.
> 3. Replace ALL icons with `react-icons`: Lucide (`react-icons/lu`) for UI icons, Font Awesome 6 (`react-icons/fa6`) for social/brand icons. Zero inline SVGs, zero Font Awesome CDN, zero emojis used as icons.
> 4. Fix the duplicate icon bugs: "24/7 Support" should use `LuHeadphones` not `LuUsers`, and "Integrity" should use `LuScale` not `LuShieldCheck`.
> 5. Delete the `developer_images/` folder — it's unused. The `HS[]` hero slides array is also dead code — don't migrate it.
> 6. Sticky WhatsApp + Call buttons must appear on ALL pages (currently only on index.html).
> 7. Folder structure must follow the plan: `src/data/`, `src/components/layout/`, `src/components/home/`, `src/components/shared/`, `src/components/about/`, `src/pages/`, `src/hooks/`, `src/styles/`.
> 8. Recreate IntersectionObserver-based scroll reveal, stats counter animation, timeline line animation, and auto-scrolling sliders using React hooks.
> 9. Zero console errors, zero broken images, zero missing functionality.
> 10. Work section by section — build each component, verify it matches the original, then move to the next.

---

## 6. ESTIMATED EFFORT

| Phase | Components | Estimated Time |
|-------|-----------|---------------|
| Phase 1: Scaffold | 4 tasks | 15 min |
| Phase 2: Data Layer | 9 data files | 20 min |
| Phase 3: Layout | 5 components | 45 min |
| Phase 4: Shared | 7 components + 3 hooks | 60 min |
| Phase 5: Page Components | 10 components | 60 min |
| Phase 6: Pages | 6 pages | 30 min |
| Phase 7: Router | 1 config | 10 min |
| Phase 8: QA | 25 checks | 30 min |
| **Total** | **~45 files** | **~4.5 hours** |

---

*Plan created from full codebase audit of 6 HTML pages, 3 JS files, 1 CSS file (1,567 lines), and 50 image assets.*
