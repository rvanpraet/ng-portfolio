const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    './dist/portfolio-components/runtime.js',
    './dist/portfolio-components/polyfills.js',
    './dist/portfolio-components/scripts.js',
    './dist/portfolio-components/main.js',
  ]
  await fs.ensureDir('portfolio-components')
  await concat(files, 'portfolio-components/portfolio-components.js');
  await fs.copyFile('./dist/portfolio-components/styles.css', 'portfolio-components/styles.css')
  // await fs.copy('./dist/portfolio-components/assets/', 'portfolio-components/assets/' )

})()