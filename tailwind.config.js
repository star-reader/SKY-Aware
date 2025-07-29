/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: ['class', '[aria-label="dark"]'],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
          background: {
            light: '#f0f4f8',
            dark: '#191919',
          },
          surface: {
            light: '#ffffff',
            dark: '#2d3748',
            'elevated-light': '#ffffff',
            'elevated-dark': '#374151',
          },
          text: {
            'primary-light': '#1a202c',
            'primary-dark': '#f7fafc',
            'secondary-light': '#4a5568',
            'secondary-dark': '#a0aec0',
            'tertiary-light': '#718096',
            'tertiary-dark': '#718096',
          },
          border: {
            light: '#e2e8f0',
            dark: '#4a5568',
          },
          card: {
            light: '#ffffff',
            dark: '#2d3748',
          },
          button: {
            'primary-light': '#3b82f6',
            'primary-dark': '#60a5fa',
            'secondary-light': '#f8fafc',
            'secondary-dark': '#374151',
          },
          input: {
            'bg-light': '#ffffff',
            'bg-dark': '#374151',
            'border-light': '#d1d5db',
            'border-dark': '#4b5563',
          },
          success: {
            light: '#10b981',
            dark: '#34d399',
          },
          warning: {
            light: '#f59e0b',
            dark: '#fbbf24',
          },
          error: {
            light: '#ef4444',
            dark: '#f87171',
          },
          info: {
            light: '#3b82f6',
            dark: '#60a5fa',
          },
        },
      },
    },
    plugins: [],
  }