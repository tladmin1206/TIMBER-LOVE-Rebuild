import type { Config } from 'tailwindcss';

/**
 * Design tokens reverse-engineered from the live Elementor "kit" (post-30.css).
 * The brand is a dark editorial theme with uppercase Montserrat headings.
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
        // Elementor global palette
        ink: '#0B0B0C', // secondary — primary dark background
        panel: '#1D1D1D', // dark gray panels
        cream: '#FAFAFA', // primary — off-white text/surfaces
        graphite: '#4B4B4B', // muted gray
        // Convenience text token (FAFAFA @ ~88% alpha)
        body: 'rgba(250,250,250,0.88)',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        brand: '1.4px',
      },
      maxWidth: {
        container: '1140px', // Elementor default boxed content width
        wide: '1300px',
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
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
