# FIT BARI – Premium Health & Fitness Nutrition E-Commerce

> **Fuel Your Body. Nourish Your Life.**

**FIT BARI** is a high-end, responsive health food and fitness nutrition e-commerce web platform designed for client presentations and high-conversion e-commerce experiences in Bangladesh. Built with **Next.js (App Router, JavaScript/JSX)** and **Tailwind CSS**.

---

## 🌿 Brand Identity & Design System

- **Primary Color:** `#173F35` (Deep Forest Green)
- **Secondary Color:** `#6B9B55` (Fresh Green)
- **Background Color:** `#FAF7EF` (Warm Cream)
- **Surface Color:** `#FFFFFF` (Pure White)
- **Accent Color:** `#D9A441` (Honey Gold)
- **Text Color:** `#252B28` (Charcoal Slate)
- **Muted Color:** `#777F78` (Natural Muted)

Typography: **Plus Jakarta Sans** & **Playfair Display**.

---

## 🚀 Key Features

### 1. Header & Navigation
- **Top Announcement Bar:** Rotating dynamic announcement ticker (Free delivery above ৳2000, 100% authentic, WhatsApp ordering).
- **Sticky Main Header:** Glassmorphism on scroll with brand leaf badge, category dropdown, search, wishlist counter, and shopping cart drawer trigger.
- **Smooth Dropdown Mega Menu:** Category preview cards with product counts and featured spotlight combo.
- **Mobile Navigation Drawer:** Responsive slide-out navigation with category accordion and direct WhatsApp ordering.

### 2. Hero Section
- **Swiper.js Slider:** 3 full-width editorial slides:
  - *Slide 1:* Fuel Your Fitness Journey (Gym supplements, whey protein, creatine)
  - *Slide 2:* Nature's Goodness, Delivered (Pure Sundarban honey, nuts, seeds, dates)
  - *Slide 3:* Eat Smart. Live Better. (Daily wholesome breakfast, oats, peanut butter, chia seeds)
- Custom navigation arrows, pagination bullets, floating verification cards, and animated statistics.

### 3. Featured Categories ("Explore Our Collections")
8 Curated categories with hover zoom and product counts:
1. Pure Honey (Sundarban & Mustard blossom)
2. Gym Supplements (Whey protein, creatine, BCAAs)
3. Oats & Seeds (Chia seeds, Australian rolled oats, pumpkin seeds)
4. Nuts & Dry Fruits (California almonds, cashews, walnuts)
5. Healthy Foods (Zero sugar peanut butter, artisan granola, organic tea)
6. Ghee & Natural Oils (Traditional Bilona cow ghee, virgin black seed oil)
7. Dates & Superfoods (Madinah Ajwa dates, Medjool king dates, moringa)
8. Combo Packages (Curated value stacks)

### 4. Best Sellers & Product Cards
- Filter tabs across categories.
- Real sample products with prices in Bangladeshi Taka (৳).
- Discount badges, rating stars, review count, stock status.
- **Quick View Modal:** In-depth image gallery, nutrition highlights, dosage guidelines, quantity stepper, and direct add to cart.
- **Wishlist Toggle:** Heart icon with count badge.

### 5. Promotional Banners & Value Combos
- High-impact promotional split banners (Workout fuel, Pure harvest, Combos, Weekly flash deals).
- Curated combo bundles with savings calculations (e.g. Save ৳1,271 on Ultimate Fitness Starter Combo).

### 6. Trust & Editorial Sections
- **Why Choose FIT BARI?** 6 trust pillars (100% authentic, lab-tested, natural choices, secure shopping, nationwide express delivery, satisfaction guarantee).
- **Your Daily Dose of Better Nutrition:** Editorial magazine layout with expert articles on whey isolate vs concentrate, Sundarban honey benefits, and breakfast synergy.
- **Customer Reviews:** Testimonial slider with verified purchase badges and real customer feedback from Dhaka and Chattogram.
- **Newsletter:** Instant interactive subscription feedback.

### 7. Cart, Checkout & Wishlist
- **Shopping Cart Drawer:** Slide-out drawer with animated progress bar towards ৳2,000 free nationwide delivery.
- **Dedicated Cart Page (`/cart`):** Quantity steppers, coupon code field (`FIT10` for 10% discount), subtotal, delivery calculation.
- **Interactive Checkout Modal:** Client demo instant checkout with order summary, delivery region selector, payment selection (Cash on Delivery, bKash, Nagad), and generated order confirmation with unique Order ID (`FB-XXXXXX`).
- **Dedicated Wishlist Page (`/wishlist`):** Saved items management and "Add All to Cart".
- **Global Search Overlay:** Live instant search across name, category, and nutritional keywords.

---

## 📁 Architecture & Editable Mock Data (`data/`)

All content is 100% separated from UI components and editable through local JSON files in `data/`:

| File | Content |
|---|---|
| `data/site.json` | Brand name, tagline, hotline, WhatsApp, Banani address, announcements, payment methods, trust pillars |
| `data/navigation.json` | Main navigation links, categories dropdown items, and footer navigation |
| `data/heroSlides.json` | Swiper hero slider headlines, badges, background images, product photography, stats |
| `data/categories.json` | 8 collections with titles, Bengali names, product counts, and cover images |
| `data/products.json` | Detailed product catalog with prices, ratings, descriptions, nutrition facts, and certifications |
| `data/comboPackages.json` | Bundled value packages with included items, original prices, and savings |
| `data/promotionalBanners.json`| 4 promotional banners with custom copy, CTAs, and images |
| `data/testimonials.json` | Verified customer reviews, ratings, buyer roles, and product tags |
| `data/blogPosts.json` | Educational articles, read times, authors, and category tags |

---

## 🛠️ Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production:**
   ```bash
   npm run build
   npm run start
   ```

