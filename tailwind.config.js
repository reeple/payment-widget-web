/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './config/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '6rem',
        '3xl': '7rem',
        DEFAULT: '1rem',
        lg: '4rem',
        sm: '2rem',
        xl: '5rem',
      },
    },
    extend: {
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
      },
      backgroundColor: {
        dynamic: {
          a11y: withOpacity('--color-a11y'),
          primary: withOpacity('--color-primary'),
        },
      },
      backgroundImage: () => ({
        'abstract-circle': 'url(/images/abstract-circle.svg)',
        'cta-lines': 'url(/images/cta-lines.svg)',
        planetary: 'url(/images/planetary.svg)',
      }),
      borderColor: {
        dynamic: {
          a11y: withOpacity('--color-a11y'),
          primary: withOpacity('--color-primary'),
        },
      },
      boxShadow: {
        'finver-100': '0px 2px 5px rgba(0, 0, 0, 0.05);',
        'finver-200': '0px 12px 20px rgba(85, 113, 197, 0.1);',
        'finver-300': '0px 4px 4px rgba(9, 11, 33, 0.02)',
        'finver-400': ' 0px 8px 8px rgba(50, 50, 71, 0.08), 0px 8px 16px rgba(50, 50, 71, 0.06);',
        'finver-500': ' 0px 5px 25px rgba(0, 0, 0, 0.1)',
        'finver-600': '0px 4px 5px rgba(50, 50, 93, 0.05)',
        'finver-700': '0px 5px 15px rgba(68, 68, 79, 0.1)',
      },
      colors: {
        'finver-black': 'rgb(5,9,41)',
        'finver-border': '#EFEFEF',
        'finver-error': '#C5292A',
        'finver-gray': '#667085',
        'finver-primary': '#0A6CFF',
        'finver-success': '#22B02E',
        'finver-text': '#1B2124',
        'finver-text-secondary': '#748AA1',
        'finver-warning': '#ff7a17',
      },
      fontFamily: {
        primary: ['Work Sans', 'sans-serif'],
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-position': 'left center',
            'background-size': '200% 200%',
          },
          '50%': {
            'background-position': 'right center',
            'background-size': '200% 200%',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-position': 'left center',
            'background-size': '400% 400%',
          },
          '50%': {
            'background-position': 'right center',
            'background-size': '200% 200%',
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-position': 'center top',
            'background-size': '400% 400%',
          },
          '50%': {
            'background-position': 'center center',
            'background-size': '200% 200%',
          },
        },
      },
      ringColor: {
        dynamic: {
          primary: withOpacity('--color-primary'),
        },
      },
      screens: {
        '3xl': '1600px',
      },
      textColor: {
        dynamic: {
          a11y: withOpacity('--color-a11y'),
          primary: withOpacity('--color-primary'),
        },
      },
    },
  },
};
