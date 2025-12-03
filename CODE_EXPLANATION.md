# TechGear Website - Complete Code Breakdown

## Overview
This is a premium tech gadget e-commerce website featuring a custom cursor, sticky navigation, a full-viewport hero header, product grid, and scroll animations. The design uses a dark theme with cyan and pink accent colors.

---

## 1. HTML Structure

### DOM Hierarchy
\`\`\`
<body>
  ├── <div class="cursor"></div>        [Custom cursor element]
  ├── <nav>                             [Sticky navigation bar]
  ├── <header class="hero-header">      [Full-screen hero section]
  ├── <main>                            [Main content area]
  │   ├── .intro section
  │   ├── .products-grid
  │   └── .about-section
  └── <footer>                          [Footer content]
\`\`\`

### Key Elements Explained

#### Navigation Bar (`<nav>`)
- **Location**: Top of the page, before the hero header
- **Contains**: 
  - Logo (TECHGEAR)
  - Navigation links (Home, Products, About, Contact)
  - Search bar with magnifying glass icon
  - Notification bell with badge
  - Sign In button

#### Hero Header (`<header class="hero-header">`)
- **Contains**: 
  - Background image (full-screen)
  - Dark overlay (via `::before` pseudo-element)
  - Hero content with title and subtitle
  - Positioned after `<nav>` in the HTML

---

## 2. CSS - The Key to the Sticky Header

### Why the Header Image Stays in Place

#### Navigation Bar - `position: sticky`
\`\`\`css
nav {
  position: sticky;
  top: 0;                    /* Sticks to top when scrolling */
  background: rgba(10, 14, 39, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  z-index: 1000;            /* Stays above other content */
}
\`\`\`

**How it works:**
- `position: sticky` makes the navbar stick to the top when you scroll down
- `top: 0` means it sticks at the very top of the viewport
- `z-index: 1000` ensures the nav stays above all other content
- `backdrop-filter: blur(10px)` creates a glassmorphism effect

#### Hero Header - Full Screen, Fixed Background
\`\`\`css
.hero-header {
  background-image: url(...);
  background-attachment: fixed;  /* KEY: Image stays fixed while scrolling */
  height: 100vh;                  /* Full viewport height (100% of visible window) */
  display: flex;
  align-items: center;
  justify-content: center;
}
\`\`\`

**How it works:**
- `height: 100vh` makes the hero section take up 100% of the viewport height
- `background-attachment: fixed` is the KEY CSS property that keeps the background image stationary while you scroll. It creates a "parallax" effect
- The image stays in place while the content (hero-content) scrolls over it
- `flex` and `align-items: center` center the content vertically and horizontally

#### Dark Overlay on Hero
\`\`\`css
.hero-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);  /* Semi-transparent dark overlay */
  z-index: 0;                        /* Below the hero content */
}
\`\`\`

**How it works:**
- `::before` creates a pseudo-element (a fake element) that covers the entire hero section
- `position: absolute` positions it within the hero-header (which is `position: relative`)
- `rgba(0, 0, 0, 0.5)` is a black color at 50% opacity (darkens the background image)
- `z-index: 0` keeps it behind the text content

#### Hero Content - Text Layer
\`\`\`css
.hero-content {
  position: relative;  /* Positioned relative to the hero-header */
  z-index: 1;         /* Above the dark overlay (z-index: 0) */
  animation: fadeInUp 1.2s ease-out 0.3s both;
}
\`\`\`

**How it works:**
- `z-index: 1` places the text above the dark overlay, making it readable
- `animation` fades the text in with an upward slide when the page loads

### Color Palette (CSS Variables)
\`\`\`css
:root {
  --primary: #0f0f1e;           /* Dark navy background */
  --secondary: #1a1a2e;         /* Slightly lighter navy */
  --accent-primary: #00d9ff;    /* Cyan/bright blue */
  --accent-secondary: #ff006e;  /* Hot pink */
  --accent-tertiary: #ffd60a;   /* Yellow */
  --text-light: #ffffff;        /* White text */
  --text-muted: #b0b8d4;        /* Light gray text */
}
\`\`\`

---

## 3. JavaScript - Custom Cursor & Animations

### Custom Cursor Logic

#### HTML Structure
\`\`\`html
<div class="cursor"></div>  <!-- Fixed positioned div that follows the mouse -->
\`\`\`

#### CSS Styling
\`\`\`css
.cursor {
  position: fixed;          /* Fixed to the viewport */
  width: 20px;
  height: 20px;
  border: 2px solid var(--accent-primary);  /* Cyan border */
  border-radius: 50%;       /* Makes it circular */
  pointer-events: none;     /* Doesn't interfere with clicks */
  z-index: 9999;            /* Always on top */
  transform: translate(-50%, -50%);  /* Centers the cursor on mouse position */
  will-change: transform;   /* GPU optimization for smooth animation */
}
\`\`\`

#### JavaScript Implementation
\`\`\`javascript
const cursor = document.querySelector(".cursor")
let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0
const speed = 1  // Controls how quickly the cursor follows the mouse

// 1. Track mouse position
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX    // Current mouse X position
  mouseY = e.clientY    // Current mouse Y position
})

// 2. Animate cursor with trailing effect
function animateCursor() {
  // Interpolation: slowly move cursor toward mouse position
  cursorX += (mouseX - cursorX) * speed
  cursorY += (mouseY - cursorY) * speed
  
  // Position the cursor element
  cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`
  
  // Loop continuously
  requestAnimationFrame(animateCursor)
}

animateCursor()
\`\`\`

**How the trailing effect works:**
- `speed = 1` means the cursor moves by 100% of the remaining distance per frame
- The formula `cursorX += (mouseX - cursorX) * speed` creates smooth interpolation
- `requestAnimationFrame` ensures smooth 60fps animation
- The "-10px" offset centers the cursor on the mouse position

#### Interactive Hover Effects
\`\`\`javascript
const interactiveElements = document.querySelectorAll("button, a, input, .product-card")

interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.style.width = "40px"          // Double the size
    cursor.style.height = "40px"
    cursor.style.borderWidth = "3px"
    cursor.style.boxShadow = "0 0 20px rgba(0, 217, 255, 0.8)"  // Brighter glow
  })

  element.addEventListener("mouseleave", () => {
    cursor.style.width = "20px"          // Return to normal
    cursor.style.height = "20px"
    cursor.style.borderWidth = "2px"
    cursor.style.boxShadow = "0 0 10px rgba(0, 217, 255, 0.5)"
  })
})
\`\`\`

**How it works:**
- When you hover over a button, link, or product card, the cursor expands
- `mouseenter` fires when you enter an element
- `mouseleave` fires when you leave an element
- The cursor returns to its original size when you leave

#### Hide Cursor Outside Window
\`\`\`javascript
document.addEventListener("mouseleave", () => {
  cursor.classList.add("hidden")  // Hide when mouse leaves window
})

document.addEventListener("mouseenter", () => {
  cursor.classList.remove("hidden")  // Show when mouse re-enters
})
\`\`\`

### Scroll Reveal Animation

\`\`\`javascript
const observerOptions = {
  threshold: 0.1,           // Trigger when 10% of element is visible
  rootMargin: "0px 0px -100px 0px"  // Trigger 100px before element enters viewport
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active")  // Add animation class
      observer.unobserve(entry.target)      // Stop observing (animation plays once)
    }
  })
}, observerOptions)

// Observe all elements with .reveal class
document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element)
})
\`\`\`

**How it works:**
- Uses the Intersection Observer API to detect when elements enter the viewport
- Adds the "active" class to trigger CSS animations
- `threshold: 0.1` means the animation triggers when 10% of the element is visible
- `rootMargin` triggers animations before the element fully enters the screen

---

## 4. Animations

### Slide Down (Navigation & Header)
\`\`\`css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);  /* Starts 30px above */
  }
  to {
    opacity: 1;
    transform: translateY(0);      /* Ends in normal position */
  }
}

nav, header {
  animation: slideDown 0.8s ease-out;
}
\`\`\`

### Fade In Up (Content)
\`\`\`css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);   /* Starts 30px below */
  }
  to {
    opacity: 1;
    transform: translateY(0);      /* Ends in normal position */
  }
}

.hero-content, .intro {
  animation: fadeInUp 1s ease-out;
}
\`\`\`

### Scale In (Product Cards)
\`\`\`css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.85);        /* Starts 85% of final size */
  }
  to {
    opacity: 1;
    transform: scale(1);           /* Ends at 100% size */
  }
}

.product-card {
  animation: scaleIn 0.6s ease-out both;
}
\`\`\`

---

## 5. Responsive Design

The website uses **mobile-first** responsive design with breakpoints:

### Desktop (>1024px)
- Full navigation with all links visible
- 4-column product grid
- Full-width sections

### Tablet (768px - 1024px)
- Navigation wraps, logo centered
- 2-3 column product grid
- Adjusted padding and font sizes

### Mobile (<768px)
- Stack navigation vertically
- 1-2 column product grid
- Reduced font sizes and padding
- Optimized touch targets for buttons

---

## 6. Summary: Why the Header Stays Fixed

| Property | Purpose |
|----------|---------|
| `nav { position: sticky; top: 0; }` | Navbar sticks to top when scrolling |
| `.hero-header { background-attachment: fixed; }` | Background image stays in place while content scrolls |
| `.hero-header::before { z-index: 0; }` | Dark overlay stays behind text |
| `.hero-content { z-index: 1; }` | Text content stays visible above overlay |
| `z-index: 9999` on cursor | Custom cursor always appears on top |

The key is understanding **stacking contexts** and **positioning**: elements with higher z-index values appear above elements with lower values, and `position: fixed`/`sticky` create new stacking contexts.
