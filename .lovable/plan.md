

# MIX SWEETS SRL — Premium Presentation Website

## Overview
A high-end, cinematic presentation website for MIX SWEETS SRL — a Romanian confectionery company with 30+ years of experience. The site supports 3 languages (RO/EN/AR with RTL), features a product catalog (no e-commerce), admin dashboard for product management, and a premium chocolate/cocoa-inspired design system.

---

## Design System
- **Color palette**: Deep chocolate browns, warm cream/ivory, soft cocoa tones, with a refined gold accent for CTAs and highlights
- **Typography**: Modern sans-serif (Inter/Plus Jakarta Sans) for body, refined display font (Playfair Display) for headings only
- **Layout**: Generous whitespace, strong 12-column grid, consistent 8px spacing scale, refined soft shadows
- **Animations**: Cinematic hero entrance, scroll-reveal sections, subtle card hover scale/lift, smooth page transitions — all respecting `prefers-reduced-motion`
- **Logo**: The uploaded MIX Sweets logo integrated into header and footer

---

## Pages & Features

### 1. Home Page
- **Hero section**: Full-width cinematic section with elegant chocolate/candy mood, headline, subheadline, and two CTAs ("Explore Products" + "Request an Offer")
- **Why MIX SWEETS**: 4 premium cards — Quality, Variety, Reliability, Distribution
- **Featured Categories**: Horizontal carousel/slider showcasing product categories (no prices)
- **New & Seasonal**: Highlight section for seasonal products with badges
- **Trust Section**: Partners, distribution reach, trade fairs/expos mentions
- **CTA Strip**: "Request an Offer" banner with button

### 2. About Page
- Rich storytelling sections with placeholder images
- Timeline-style milestones showing 30+ years of history
- Company values: Quality, Honesty, Responsibility
- Mention of #2 ranking in Top Profit Romania (Voluntari, sugar/chocolate wholesale sector)
- All content in RO/EN/AR

### 3. Products Page
- Category filters (sidebar on desktop, top bar on mobile)
- Search bar + category chips
- Product cards: image, name, short description, grammage, badges (e.g., "Seasonal", "New")
- Clicking a card navigates to `/products/:slug`
- 10 demo products pre-loaded: Biscuiți Glazurați, Turtă Dulce, Fursecuri Asortate, Rulouri cu Cremă, Acadele Fructate, Napolitane cu Ciocolată, Bomboane Asortate, Jeleuri Fructate, Praline Fine, Bezele Colorate

### 4. Product Detail Page (`/products/:slug`)
- Large image gallery with graceful fallback placeholders
- Sticky info panel with name, description, grammage/packaging details, badges
- "Available Variants" section
- "Request an Offer" CTA
- Related products row at bottom

### 5. Contact Page
- Company details displayed beautifully (address, phone, email, CUI, registration info)
- Embedded Google Maps for Voluntari, Ilfov location
- "Request Offer" form: name, company, email, phone, message — with client-side Zod validation
- On submit: opens mailto with prefilled subject/body AND stores submission in Supabase for admin viewing
- WhatsApp CTA button

---

## Multilingual (i18n)
- **Languages**: Romanian (default), English, Arabic (RTL)
- Language switcher dropdown in header with flag icons
- Selected language persisted in localStorage
- All UI text, product content, and About page content translated in all 3 languages
- Arabic pages automatically switch to RTL layout

---

## WhatsApp Floating Button
- Green, modern, premium-styled floating button (bottom-right corner)
- Appears with smooth animation after ~1.5 seconds
- Opens WhatsApp chat to +40728980123 with language-specific prefilled message

---

## Sticky Header
- Logo + navigation links (Home, About, Products, Contact)
- Language switcher dropdown
- No cart icon anywhere
- Mobile: hamburger menu with smooth drawer

## Footer
- Full company details (name, CUI, registration, address, phone, email)
- Quick links to all pages
- "Request an Offer" CTA
- Discreet "Admin" link (small, low-emphasis text)

---

## Backend (Supabase)

### Database Tables
- **products**: id, slug, name (RO/EN/AR), description (RO/EN/AR), category, images (array of URLs), grammage, badges/tags, created_at, updated_at
- **contact_submissions**: id, name, company, email, phone, message, language, created_at, read (boolean)
- **user_roles**: id, user_id, role (admin enum)

### Authentication & Admin
- Supabase Auth for admin login (email/password)
- Admin role stored in `user_roles` table with RLS
- Protected `/admin` routes — unauthenticated users redirected to `/admin/login`
- Admin entry point: discreet footer link only

### Admin Dashboard
- **Products CRUD**: Add, edit, delete products with all multilingual fields, category, images, grammage, badges
- **Product preview**: Preview how a product looks on the public site
- **Contact submissions viewer**: See all form submissions, mark as read
- Clean, functional admin UI (not public-facing design)

---

## SEO & Performance
- Proper meta tags and Open Graph tags per page
- Clean semantic HTML headings structure
- Schema.org markup for Organization + Product catalog items
- Mobile-first responsive design
- Optimized images with fallback placeholders
- Fast loading with code splitting

