/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./shared/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          light: "var(--primary-light)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          light: "var(--accent-light)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        warning: {
          DEFAULT: "var(--warning)",
          light: "var(--warning-light)",
        },
        error: {
          DEFAULT: "var(--error)",
          light: "var(--error-light)",
        },
        success: {
          DEFAULT: "var(--success)",
          light: "var(--success-light)",
        },
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm: "var(--radius-sm)",
        lg: "var(--radius-lg)",
        xl: "12px",
        "2xl": "16px",
        "3xl": "20px",
      },
      fontFamily: {
        sans: [
          "var(--font-plus-jakarta-sans)",
          "Noto Sans Ethiopic",
          "sans-serif",
        ],
        ethiopic: ["Noto Sans Ethiopic", "sans-serif"],
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out forwards",
        "slide-up": "slideUp 0.25s ease-out forwards",
        "scale-in": "scaleIn 0.15s ease-out forwards",
        "pulse-highlight": "pulseHighlight 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        pulseHighlight: {
          "0%": { backgroundColor: "transparent" },
          "30%": { backgroundColor: "rgba(16, 185, 129, 0.15)" },
          "100%": { backgroundColor: "transparent" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          light: 'var(--primary-light)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
          light: 'var(--accent-light)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        warning: {
          DEFAULT: 'var(--warning)',
          light: 'var(--warning-light)',
        },
        error: {
          DEFAULT: 'var(--error)',
          light: 'var(--error-light)',
        },
        success: {
          DEFAULT: 'var(--success)',
          light: 'var(--success-light)',
        },
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius-sm)',
        lg: 'var(--radius-lg)',
        xl: '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'Noto Sans Ethiopic', 'sans-serif'],
        ethiopic: ['Noto Sans Ethiopic', 'sans-serif'],
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'slide-up': 'slideUp 0.25s ease-out forwards',
        'scale-in': 'scaleIn 0.15s ease-out forwards',
        'pulse-highlight': 'pulseHighlight 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        pulseHighlight: {
          '0%': { backgroundColor: 'transparent' },
          '30%': { backgroundColor: 'rgba(16, 185, 129, 0.15)' },
          '100%': { backgroundColor: 'transparent' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
