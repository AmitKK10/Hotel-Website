/**
 * Digha Beach Resort - Design System Tokens
 * Master specification for colors, typography, spacing, glass, shadows, and animation
 */

export const DESIGN_TOKENS = {
  resort: {
    name: "Digha Beach Resort",
    tagline: "Coastal Luxury & Serene Ocean Hospitality",
    location: "New Digha Beach, Purba Medinipur, West Bengal 721428, India",
    starRating: 5,
    contact: {
      phone: "+91 98765 43210",
      whatsapp: "+91 98765 43210",
      email: "reservations@dighabeachresort.com",
    },
  },

  colors: {
    // Primary Luxury Palette
    oceanNavy: {
      50: "#f0f6fa",
      100: "#dbe8f2",
      300: "#8fb8d6",
      500: "#1e537d",
      700: "#0b2e4c",
      900: "#041525",
      950: "#020a14",
    },
    goldenSand: {
      50: "#fffcf5",
      100: "#fef6e2",
      200: "#fdeabb",
      300: "#fbd888",
      400: "#f8bf52",
      500: "#d99b26", // Gold primary
      600: "#b57b1a",
      700: "#8f5b15",
      900: "#52320b",
    },
    deepNavy: "#020914",
    warmWhite: "#FAFAF8",
    pearl: "#F4F3EE",
    charcoal: "#121212",
    glassWhite: "rgba(255, 255, 255, 0.08)",
    softBeige: "#EFECE6",

    // Functional
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },

  gradients: {
    luxuryGold: "linear-gradient(135deg, #fbd888 0%, #d99b26 50%, #8f5b15 100%)",
    oceanDeep: "linear-gradient(180deg, #020a14 0%, #0b2e4c 100%)",
    sunsetBeach: "linear-gradient(135deg, #0b2e4c 0%, #1e537d 40%, #d99b26 100%)",
    glassDark: "linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)",
    glassLight: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)",
    goldBorder: "linear-gradient(135deg, rgba(217, 155, 38, 0.6) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(217, 155, 38, 0.3) 100%)",
  },

  typography: {
    fonts: {
      serifDisplay: "'Cormorant Garamond', Georgia, serif",
      serifAccent: "'Cinzel', 'Times New Roman', serif",
      sansBody: "'Plus Jakarta Sans', -apple-system, sans-serif",
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  spacing: {
    4: "1rem",
    8: "2rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
    40: "10rem",
    section: "py-20 md:py-28 lg:py-36",
    container: "px-4 sm:px-6 lg:px-12 xl:px-16 max-w-7xl mx-auto",
  },

  radii: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },

  shadows: {
    soft: "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
    floating: "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
    luxuryGold: "0 10px 30px -10px rgba(217, 155, 38, 0.3)",
    glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  },

  animation: {
    duration: {
      fast: 0.2,
      normal: 0.4,
      slow: 0.8,
      luxurious: 1.2,
    },
    ease: {
      luxury: [0.25, 1, 0.5, 1], // Custom cubic-bezier for smooth hotel-style motion
      bounce: [0.68, -0.55, 0.265, 1.55],
    },
  },

  glass: {
    backdropBlur: "backdrop-blur-md",
    background: "bg-stone-900/40",
    border: "border border-white/10",
  },
} as const;
