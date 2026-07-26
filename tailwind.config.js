/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#050505',
        primary: '#8B5CF6',
        secondary: '#3B82F6',
        accent: '#06B6D4',
        muted: '#A1A1AA',
        card: 'rgba(255,255,255,0.05)',
        border: 'rgba(255,255,255,0.1)',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
        'gradient-accent': 'linear-gradient(135deg, #3B82F6, #06B6D4)',
        'gradient-purple-cyan': 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
        'hero-overlay': 'linear-gradient(to bottom, rgba(5,5,5,0.6) 0%, rgba(5,5,5,0.85) 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 40px rgba(139, 92, 246, 0.4)',
        'glow-blue': '0 0 40px rgba(59, 130, 246, 0.4)',
        'glow-cyan': '0 0 40px rgba(6, 182, 212, 0.4)',
        'glow-sm': '0 0 20px rgba(139, 92, 246, 0.3)',
        'card': '0 8px 32px rgba(0,0,0,0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 60px rgba(139, 92, 246, 0.8)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}
