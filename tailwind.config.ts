import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#080102',
        ink:     '#0d0203',
        glass:   '#120205',
        crimson: {
          DEFAULT: '#FF2D2A',
          deep:    '#C8120E',
          dim:     'rgba(255,45,42,0.12)',
          glow:    'rgba(255,45,42,0.35)',
        },
        white: { DEFAULT: '#F5F2EC' },
        gold:  { DEFAULT: '#C9A84C', soft: '#b69138' },
      },
      fontFamily: {
        display: ['var(--font-body)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        crimson: '0 0 30px rgba(255,45,42,0.35)',
        'crimson-lg': '0 0 60px rgba(255,45,42,0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
