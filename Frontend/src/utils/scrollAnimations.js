/**
 * Shared scroll-triggered animation variants for Framer Motion.
 * 
 * All variants use `once: false` so animations replay continuously
 * as elements enter and leave the viewport while scrolling.
 * 
 * Respects `prefers-reduced-motion` for accessibility.
 */

// Check if user prefers reduced motion
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Ultra-smooth easing — slow start, gentle deceleration, buttery finish
const smoothEase = [0.16, 1, 0.3, 1];

// Shared viewport configuration — triggers at 12% visibility
export const viewport = { once: false, amount: 0.12, margin: '-40px' };

// ---------- Element Variants ----------

/** Slide up from below + fade in */
export const fadeUp = {
  hidden: prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: smoothEase },
  },
};

/** Slide down from above + fade in */
export const fadeDown = {
  hidden: prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: smoothEase },
  },
};

/** Slide in from the left + fade in */
export const fadeLeft = {
  hidden: prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: smoothEase },
  },
};

/** Slide in from the right + fade in */
export const fadeRight = {
  hidden: prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: smoothEase },
  },
};

/** Scale up from 0.97 + subtle fade in — silky smooth for cards */
export const scaleUp = {
  hidden: prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 0, scale: 0.97, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.1, ease: smoothEase },
  },
};

// ---------- Container / Stagger Variants ----------

/** Parent container that staggers its children's entrance */
export const staggerContainer = (staggerDelay = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayChildren,
    },
  },
});

/** Create a custom variant with specific delay */
export const withDelay = (variant, delay) => ({
  ...variant,
  visible: {
    ...variant.visible,
    transition: {
      ...variant.visible.transition,
      delay,
    },
  },
});
