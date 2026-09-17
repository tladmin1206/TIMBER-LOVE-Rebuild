import type { Config } from 'tailwindcss';

/**
 * Timber and Love design tokens.
 *
 * The brand is a premium, editorial dark theme with uppercase Montserrat
 * headings and generous neutral space. Colors are expressed as semantic tokens
 * (backed by the existing brand palette) so pages are styled through one system
 * rather than independently.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // --- Raw brand palette (from the live Elementor kit) ---
        ink: '#0B0B0C', // primary dark background
        panel: '#1D1D1D', // dark gray raised panel
        cream: '#FAFAFA', // off-white text / light surfaces
        graphite: '#4B4B4B', // muted gray
        // Accent maps to the off-white cream so the brand reads clean and
        // monochrome (white highlights on dark), matching the original site.
        // `accent-soft` is a faint white tint used for subtle selected states.
        accent: {
          DEFAULT: '#FAFAFA',
          hover: 'rgba(250,250,250,0.85)',
          soft: 'rgba(250,250,250,0.12)',
        },
        // --- Semantic tokens ---
        'bg-primary': '#0B0B0C',
        'bg-secondary': '#141416',
        surface: '#1D1D1D',
        'surface-inverse': '#FAFAFA',
        'text-primary': '#FAFAFA',
        'text-secondary': 'rgba(250,250,250,0.72)',
        'text-muted': 'rgba(250,250,250,0.52)',
        'border-subtle': 'rgba(250,250,250,0.14)',
        success: '#5BA177',
        error: '#D98B7A',
        focus: '#FAFAFA',
        // Convenience text token (kept for existing usages).
        body: 'rgba(250,250,250,0.88)',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      fontSize: {
        // Deliberate type scale (label: [size, lineHeight]).
        eyebrow: ['0.75rem', { lineHeight: '1.1', letterSpacing: '0.2em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        h3: ['1.5rem', { lineHeight: '1.25' }],
        h2: ['2.25rem', { lineHeight: '1.15' }],
        h1: ['3rem', { lineHeight: '1.08' }],
        display: ['4rem', { lineHeight: '1.02' }],
      },
      letterSpacing: {
        brand: '1.4px',
      },
      maxWidth: {
        container: '1140px',
        wide: '1300px',
        prose: '68ch',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease-out both',
        fadeIn: 'fadeIn 0.8s ease-out both',
        // Content swap inside an already-visible container (filter and tab
        // changes). Deliberately much faster than `fadeIn`: the visitor asked
        // for this content, so it must not feel withheld.
        fadeInFast: 'fadeIn 260ms ease-out both',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
