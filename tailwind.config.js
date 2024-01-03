// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled']
    }
  },
  corePlugins: {
    container: false
  },
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      // figma
      fontFamily: {
        sans: ['Euclid Circular A', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        // primary
        'purple-blue': {
          DEFAULT: '#7C5CFC',
          100: '#E0D9FA'
        },
        'jordy-blue': '#92BAFB',
        'sidebar-bg': '#192038',
        melrose: '#CABDF9',
        cinder: '#0B0E17',
        // secondary
        lime: '#FF6565',
        turkuaz: '#82F89C',
        mirage: '#161A2A',
        landing: '#060B27',
        tuna: '#313A4B',
        'dark-blue': {
          DEFAULT: '#4478FF',
          100: '#E4F4F9'
        },
        'persian-indigo': '#300E7E',
        'crocus-purple': '#9278E5',

        purple: {
          1000: '#35217E',
          900: '#40289A',
          800: '#4C2FB6',
          700: '#6239EC',
          600: '#6D61EC',
          500: '#7C5CFC',
          400: '#9278E5',
          300: '#C0B0FB',
          200: '#E0D9FA',
          100: '#F3F1F9'
        },
        blue: {
          DEFAULT: '#94E0FC',
          1000: '#2C6498',
          900: '#397CB9',
          800: '#4B95DA',
          700: '#59B7FB',
          600: '#73CDFF',
          500: '#94E0FC',
          400: '#A7DCFA',
          300: '#BBE3FA',
          200: '#D0EAF9',
          100: '#E4F4F9'
        },
        green: {
          1000: '#3D8064',
          900: '#4EA07E',
          800: '#60BF98',
          700: '#6BD6AA',
          600: '#78E4B8',
          500: '#7AE8BB',
          400: '#96E5BE',
          300: '#BAF1DA',
          200: '#D3F4E6',
          100: '#E9F9F2'
        },
        yellow: {
          1000: '#7A4D0B',
          900: '#936312',
          800: '#B7821D',
          700: '#DBA32A',
          600: '#FFC73A',
          500: '#FFD96B',
          400: '#FEDF87',
          300: '#FDE6A4',
          200: '#FBECC0',
          100: '#FAF3DD'
        },
        orange: {
          DEFAULT: '#F29E61',
          1000: '#B14507',
          900: '#E2670E',
          800: '#FC8416',
          700: '#FF8F3F',
          600: '#FFA96B',
          500: '#F2B487',
          400: '#ECC095',
          300: '#F6DAC0',
          200: '#F7E6D7',
          100: '#F8F1E8'
        },
        red: {
          DEFAULT: '#FF6565',
          1000: '#B00000',
          900: '#DB0707',
          800: '#F21818',
          700: '#FF4646',
          600: '#FE6B6B',
          500: '#F28787',
          400: '#F4A9A9',
          300: '#F6C0C0',
          200: '#F7D7D7',
          100: '#F8E8E8'
        },
        pink: {
          DEFAULT: '#EEC2D8',
          1000: '#B00035',
          900: '#DB0747',
          800: '#F2185A',
          700: '#FF467E',
          600: '#FE6B97',
          500: '#F287A7',
          400: '#F4A9C0',
          300: '#EEC2D8',
          200: '#F7D7E0',
          100: '#F8E8ED'
        },
        'grey-blue': {
          1000: '#6485A3',
          900: '#7390AB',
          800: '#829CB4',
          700: '#91A8BD',
          600: '#A0B3C5',
          500: '#AFBFCE',
          400: '#BECAD6',
          300: '#CCD6DF',
          200: '#DBE2E8',
          100: '#EAEDF0'
        },
        'grey-dark': {
          1000: '#32384A',
          900: '#344159',
          800: '#3F4B62',
          700: '#49546A',
          600: '#535E72',
          500: '#575C6F',
          400: '#696E82',
          300: '#858BA4',
          200: '#979CB7',
          100: '#ABB0C7'
        },
        indigo: {
          900: '#392DCA'
        },

        gray: {
          ...defaultTheme.colors.gray,
          DEFAULT: '#92969F',
          800: '#2B2E3A',
          400: '#92969F',
          300: '#E0E1E5',
          200: '#EAEDF0',
          100: '#98A2B3'
        },
        dark: {
          DEFAULT: '#1C1F27',
          1000: '#0C101C',
          900: '#181C27',
          800: '#1A202C',
          700: '#2F323A',
          600: '#3B3F48',
          500: '#474A53',
          400: '#53565E',
          300: '#5F6269',
          200: '#6B6D74',
          100: '#777980'
        }
      },
      backgroundImage: {
        'rotate-pattern': "url('static/images/rotate-pattern.png')"
      }
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('@tailwindcss/forms')({
      strategy: 'base'
    }),
    require('tailwind-bootstrap-grid'),
    plugin(function ({ matchUtilities, theme, addUtilities }) {
      matchUtilities(
        {
          'tw-col': (value) => {
            return {
              maxWidth: value,
              flexShrink: '0',
              flexGrow: '0',
              flexBasis: value,
              position: 'relative',
              minHeight: '1px',
              width: '100%'
            }
          }
        },
        { values: theme('width') }
      )
      addUtilities({
        '.tw-col': {
          flexBasis: '0',
          flexGrow: '1',
          maxWidth: '100%',
          position: 'relative',
          minHeight: '1px',
          width: '100%'
        }
      })
      addUtilities({
        '.tw-unset': {
          position: 'unset'
        }
      })
    })
  ],
  transitionProperty: {
    height: 'height',
    spacing: 'margin, padding'
  },
  darkMode: 'class',
  safelist: [
    'bg-dark-blue-100',
    'bg-dark-blue-200',
    'text-dark-blue',
    'bg-purple-blue-100'
  ]
}
