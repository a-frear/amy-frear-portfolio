# Amy Frear's Portfolio

A portfolio website built with Next.js and React, with a focus on performance, accessibility, and a fun user experience.

![Portfolio Screenshot](public/assets/portfolio-screenshot.png)

**Live Site**: [frear-projects.com](https://www.frear-projects.com/)

## Overview

This is a single-page portfolio application featuring:

- **Animations** with reduced motion support for accessibility
- **Ambient Video** with Vimeo integration
- **Feature flags** for progressive feature rollout
- **SEO optimization** with meta tags, Open Graph, and structured data

## Tech Stack

- **Framework**: Next.js 16 (with Turbopack)
- **React**: 19.2
- **Styling**: styled-components with native Next.js compiler support
- **State Management**: React Context API
- **Animation**: motion/react
- **Smooth Scrolling**: Lenis
- **Deployment**: Vercel

## Features

### Accessibility

- **Reduced Motion Support**: Detects user's system preference and disables animations for users who prefer reduced motion. Reduced Motion toggle to control on site.

### Performance

- Feature flags to reduce bundle size

## Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn

### Installation

```bash

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Code Style

This project uses:

- **ESLint** for code quality
- **Prettier** for code formatting

All code is automatically formatted on save. Run `npm run lint` to check for issues.

## Architecture Decisions

### State Management: React Context

The `ReducedMotionContext` manages animation preferences globally.

### Styling: styled-components

Chose styled-components for:

- Scoped styling
- Dynamic styles based on props
- Server-side rendering support

### Custom Hooks

Three custom hooks provide reusable logic throughout the application:

#### `useParallax(intensity, ref)`

Applies a parallax scroll effect to an element based on the window scroll position. The `intensity` parameter controls how much the element moves (0 = no movement, 0.2 = slow movement). Automatically disabled on mobile and when reduced motion is preferred.

#### `useLenis()`

Initializes Lenis smooth scrolling on app mount with a 1.2s duration and easeOut easing. Called once in `_app.js` to enable smooth scrolling across the entire site.

#### `useMobile()`

Returns a boolean indicating if the viewport width is less than 750px (tablet breakpoint). Used to conditionally disable parallax and other features on mobile devices. Includes a resize listener to update on window resize.

### Feature Flags

Implemented feature flags for progressive feature rollout without deployments:

- `SHOW_ANIMATION_TOGGLE` - Toggle animation preference UI
- `SHOW_SIDENAV` - Show/hide side navigation menu

## Video Credit

The video used in the ambient header was made by me in homage to the experimental videos [Les Mains by Geta Brătescu](https://vimeo.com/132207733) and [I'm too sad to tell you by Bas Jan Ader](https://www.youtube.com/watch?v=zAsRpwsQqYQ)... and a very fun project I made when I first learned to code called EYE SITE. You can see more of my video work on [Vimeo](https://vimeo.com/amyfrear).

## Contact

- **Email**: [amy.frear@gmail.com](mailto:amy.frear@gmail.com)
- **LinkedIn**: [linkedin.com/in/amy-frear](https://www.linkedin.com/in/amy-frear)
- **GitHub**: [github.com/a-frear](https://github.com/a-frear)

---

Thanks for checking out my portfolio! 👽 Amy
