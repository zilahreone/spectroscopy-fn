/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  darkMode: 'selector',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Prompt', ...defaultTheme.fontFamily.sans],
        serif: ['Prompt'],
        mono: ['Prompt'],
        display: ['Prompt'],
      },
      fontWeight: {
        thin: '100',
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        'extra-bold': '800',
        black: '900',
      },
      colors: {
        'charcoal': {
          DEFAULT: '#264653',
          100: '#080e11',
          200: '#0f1c22',
          300: '#172b32',
          400: '#1f3943',
          500: '#264653',
          600: '#3f7489',
          700: '#609db6',
          800: '#95bece',
          900: '#cadee7'
        },
        'persian_green': {
          DEFAULT: '#2a9d8f',
          100: '#081f1d',
          200: '#113f39',
          300: '#195e56',
          400: '#217e73',
          500: '#2a9d8f',
          600: '#3acbba',
          700: '#6cd8cb',
          800: '#9de5dc',
          900: '#cef2ee'
        },
        'saffron': {
          DEFAULT: '#e9c46a',
          100: '#3b2c09',
          200: '#755912',
          300: '#b0851a',
          400: '#e0ad2e',
          500: '#e9c46a',
          600: '#edd086',
          700: '#f1dca4',
          800: '#f6e7c3',
          900: '#faf3e1'
        },
        'sandy_brown': {
          DEFAULT: '#f4a261',
          100: '#401f04',
          200: '#803e09',
          300: '#c05e0d',
          400: '#f07e22',
          500: '#f4a261',
          600: '#f6b681',
          700: '#f8c8a1',
          800: '#fbdac0',
          900: '#fdede0'
        },
        'burnt_sienna': {
          DEFAULT: '#e76f51',
          100: '#371107',
          200: '#6e220f',
          300: '#a43316',
          400: '#db441e',
          500: '#e76f51',
          600: '#ec8b73',
          700: '#f1a896',
          800: '#f5c5b9',
          900: '#fae2dc'
        }
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    // themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    themes: [
      {
        mytheme: {
          "primary": "#a991f7",
          "secondary": "#f6d860",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      }
    ],
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}

