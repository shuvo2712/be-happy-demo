# Be Happy in Dhaka - Developer Context

This document serves as a comprehensive developer guide and context for the "Be Happy in Dhaka" frontend prototype. It summarizes our design decisions, component architecture, and deployment setup to make future iterations easier.

## Project Overview
**Name**: Be Happy in Dhaka
**Type**: Multi-service concierge agency frontend landing page.
**Tech Stack**: Next.js (App Router), Tailwind CSS, Framer Motion, Lucide React icons.
**Design Language**: Modern, high-fidelity, trustworthy. Uses a dark teal, slate, and clean white color palette. Typography is `Inter`.

## Key Features & Components

### 1. `HeroSection.tsx` (`src/components/sections/`)
- **Parallax Background**: Uses `useScroll` and `useTransform` from Framer Motion to create a 3D depth effect with `hero-bg.png` (a generated image of modern Dhaka at dusk with a dark slate overlay).
- **Dynamic Location Cycler**: The main heading cycles through Dhaka areas (`Bashundhara`, `Gulshan`, `Banani`, `Uttara`, `Dhanmondi`) every 2 seconds. This uses `AnimatePresence` and a randomized initial state (to avoid Next.js hydration errors on SSR).
- **Visual Flourishes**: A self-drawing gradient underline under the location, and a continuous teal heartbeat/glow effect.
- **Tagline**: Clean, solid white text: "We Make It Happen."

### 2. `Navbar.tsx` (`src/components/ui/`)
- Sticky top navigation with active section scrollspy highlighting.
- Layout order: Home -> Services -> Responsibility -> About.
- Includes the "Be Happy" logo which links back to the top of the page.

### 3. `BookingForm.tsx` (`src/components/forms/`)
- A highly interactive, multi-step booking wizard built with Framer Motion.
- Guides the user through Category selection ➔ Sub-service details ➔ Customer contact info.

### 4. `FloatingActionButton.tsx` (`src/components/ui/`)
- A mobile-optimized, sticky "Call Now" button at the bottom right.
- Links directly to the phone number: `tel:+8801920149986`.

### 5. Other Core Sections (`src/components/sections/`)
- **`ServiceGrid.tsx`**: Interactive grid showcasing main service branches with hover micro-animations.
- **`WhyChooseUs.tsx`**: Highlights the core pillars (Reliability, Quick Response, Fair Pricing, Local Expertise, 24/7 Support).
- **`SocialResponsibility.tsx`**: A dedicated banner highlighting the agency's pledge to donate 10% of profits to support orphans.

## Deployment Setup (Netlify Drop)
- The project is configured specifically for manual drag-and-drop deployment via Netlify Drop.
- **`next.config.ts`**: Contains `output: 'export'` to generate static HTML, and `images: { unoptimized: true }` because static exports cannot use Next.js's dynamic Node.js image optimization.
- **Build Command**: Running `npm run build` generates an `out/` folder. This exact folder is what gets dragged into the Netlify Drop UI for an instant static deployment.

## Future Development Notes
- All animations rely heavily on `framer-motion`. When adding new animated components, ensure they use `AnimatePresence` for smooth mounting/unmounting.
- The UI follows a strict dark teal/slate palette. Avoid generic colors; stick to the customized Tailwind utility classes configured in the project.
- No database or backend is currently connected; the booking form is UI-only. Future work may involve wiring up the form submission to an API route or a service like Formspree/EmailJS.

## Session History & Design Iterations
This section chronicles the step-by-step decisions and features we built during our collaborative session to ensure the context of *why* and *how* things were built is preserved.

1. **Initial Project Setup**:
   - Initialized a modern Next.js App Router project with Tailwind CSS.
   - Chose the "Inter" typography, "lucide-react" icons, and "framer-motion" for fluid animations based on a preference for a highly professional aesthetic.
2. **Core Layout & Content**:
   - Implemented the `ServiceGrid`, `WhyChooseUs`, and `SocialResponsibility` components.
   - Built an interactive multi-step `BookingForm`.
   - Created a sticky `Navbar` and a mobile-optimized floating "Call Now" action button.
   - Iterated on the Navbar layout, swapping the order of the "About" and "Responsibility" links.
3. **Hero Section Enhancements**:
   - **Background Image**: Generated and added a vibrant, dusk cityscape of Dhaka (`hero-bg.png`) with a dark slate overlay for text readability.
   - **Parallax Effect**: Implemented a scroll-linked parallax effect to give the background image a cinematic 3D depth as the user scrolls.
   - **Text Highlighting & Cycler**: Transformed the static "Dhaka" text into a dynamic word cycler (Bashundhara, Gulshan, Banani, Uttara, Dhanmondi) that randomizes on page load to prevent SSR hydration errors.
   - **Visual Effects**: Added a self-drawing gradient underline and a continuous teal pulsing "heartbeat" glow to the active location word.
   - **Layout Tweaks**: Enlarged the dynamic location words for better visual hierarchy and separated the heading into three vertically centered, equally spaced lines.
   - **Tagline Polish**: Changed the gradient tagline to a clean, solid white "We Make It Happen." for a punchier, more confident finish.
4. **Deployment Configuration**:
   - Configured `next.config.ts` for static export (`output: 'export'`) and disabled image optimization.
   - Verified the static build output (`out/` folder) for manual drag-and-drop deployment via Netlify Drop.
5. **Service Pages Refactoring & Architecture (Current Conversation)**:
   - **UI Auditing & Button Styling**: Audited the 5 core service pages and updated the Quick Contact buttons to be more intuitive (WhatsApp changed to recognizable Green, Call Support to Slate) with proper hover states and shadows for a premium feel.
   - **DRY Refactoring & Component Extraction**: Identified that several main sections (FAQ, Gallery, Testimonials, and "How it Works" processes) were duplicated across the 5 pages. To enforce exact UI parity and prevent future divergence, we extracted these into highly reusable shared components (`FAQSection.tsx`, `GallerySection.tsx`, `TestimonialsSection.tsx`, and `FeaturesSection.tsx`).
   - **Flexible Layouts**: Enhanced `FeaturesSection` to support a `layout="grid"` (2x2) prop, allowing it to adapt to different page requirements while still sharing the exact same underlying component code.
   - **Next.js Colocation & Routing Cleanup**: Renamed transitional `*Redesign.tsx` files to standard `*Page.tsx` conventions. We deleted the legacy 675-line `ServiceDetailClient.tsx` dispatcher entirely, moving the 5 custom page views directly into `src/app/[id]/` (the Vercel-recommended Colocation pattern). The main server component `src/app/[id]/page.tsx` now directly evaluates the URL `id` and returns the specific component, resulting in an exceptionally clean, optimized, and professional Next.js architecture.
