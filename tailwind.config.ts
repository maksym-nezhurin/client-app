// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1E40AF',   // Blue-800
          secondary: '#F97316', // Orange-500
          success: '#22C55E',   // Green-500
          error: '#EF4444',     // Red-500
          muted: '#E5E7EB',     // Gray-200
        },
        text: {
          primary: '#111827',   // Gray-900
          secondary: '#6B7280', // Gray-500
        },
        surface: {
          base: '#F9FAFB',      // Gray-50
          card: '#FFFFFF',
        },
        dark: {
          background: '#111827',
          surface: '#1F2937',
          textPrimary: '#F9FAFB',
          textSecondary: '#9CA3AF',
        }
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 2px 12px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
export default config
