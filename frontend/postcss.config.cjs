let plugins = [];

try {
  // prefer explicit requires so missing modules can be handled gracefully
  plugins.push(require('tailwindcss'));
  plugins.push(require('autoprefixer'));
} catch (err) {
  /* eslint-disable no-console */
  console.warn('[postcss] Some PostCSS plugins are not installed:', err.message);
  console.warn('[postcss] Run `npm install -D tailwindcss autoprefixer` in the frontend folder to enable Tailwind.');
}

module.exports = { plugins };