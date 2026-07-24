export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 80px rgba(15, 23, 42, 0.08)',
        glow: '0 0 0 1px rgba(37, 99, 235, 0.12)',
      },
      backgroundImage: {
        glass: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(248,250,252,0.85))',
      },
    },
  },
  plugins: [],
};
