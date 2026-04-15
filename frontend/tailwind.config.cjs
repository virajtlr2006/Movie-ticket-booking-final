function tryRequire(name){
  try{ return require(name); }catch(e){ return null; }
}

const formsPlugin = tryRequire('@tailwindcss/forms');
const typographyPlugin = tryRequire('@tailwindcss/typography');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6f2dbd',
          light: '#8e57d6',
          dark: '#4a1f84'
        }
      }
    },
  },
  plugins: [
    ...(formsPlugin ? [formsPlugin] : []),
    ...(typographyPlugin ? [typographyPlugin] : []),
  ],
};