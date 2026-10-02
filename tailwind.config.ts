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
        ink: '#0B0B0C', panel: '#1D1D1D', graphite: '#4B4B4B',
        cream: 'rgb(var(--tl-cream) / <alpha-value>)',
        accent: { DEFAULT: 'rgb(var(--tl-cream) / <alpha-value>)', hover: 'rgb(var(--tl-cream) / .85)', soft: 'rgb(var(--tl-cream) / .12)' },
        'bg-primary': 'rgb(var(--tl-bg) / <alpha-value>)',
        'bg-secondary': 'rgb(var(--tl-secondary) / <alpha-value>)',
        surface: 'rgb(var(--tl-surface) / <alpha-value>)',
        'surface-inverse': '#FAFAFA',
        'text-primary': 'rgb(var(--tl-cream) / <alpha-value>)',
        'text-secondary': 'rgb(var(--tl-copy) / <alpha-value>)',
        'text-muted': 'rgb(var(--tl-muted) / <alpha-value>)',
        'border-subtle': 'rgb(var(--tl-border) / <alpha-value>)',
        'on-accent': 'rgb(var(--tl-on-accent) / <alpha-value>)',
        success: '#5BA177', error: '#D98B7A', focus: '#FAFAFA',
        body: 'rgb(var(--tl-copy) / <alpha-value>)',
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
