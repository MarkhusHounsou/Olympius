/**
 * Post-build script to fix absolute asset paths for GitHub Pages subdirectory deployment.
 * 
 * Expo SDK 53's `expo export --platform web` with `output: "single"` does not apply
 * the `web.baseUrl` config to the generated `index.html` script tag or the JS bundle
 * asset paths. This script rewrites them to use the correct `/Olympius/` prefix.
 */
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const BASE_URL = '/Olympius/';

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function fixIndexHtml() {
  const indexPath = path.join(DIST, 'index.html');
  if (!fs.existsSync(indexPath)) return;
  let html = fs.readFileSync(indexPath, 'utf8');

  // Fix the script tag from absolute /_expo/... to relative ./_expo/...
  html = html.replace(/src="\/_expo\//g, `src="${BASE_URL}_expo/`);
  // Also handle any absolute /assets/ references in HTML
  html = html.replace(/href="\/assets\//g, `href="${BASE_URL}assets/`);
  html = html.replace(/src="\/assets\//g, `src="${BASE_URL}assets/`);

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log(`✓ Fixed index.html (${BASE_URL} prefix)`);
}

function fixJsBundle() {
  const files = walk(path.join(DIST, '_expo'));
  for (const file of files) {
    if (!file.endsWith('.js')) continue;
    let content = fs.readFileSync(file, 'utf8');
    // Prefix root-relative asset paths with the base URL
    content = content.replace(/["'`]\/assets\//g, `"${BASE_URL}assets/`);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✓ Fixed ${path.relative(DIST, file)}`);
  }
}

function main() {
  if (!fs.existsSync(DIST)) {
    console.error('❌ dist folder not found. Run `npm run build:web` first.');
    process.exit(1);
  }
  fixIndexHtml();
  fixJsBundle();
  console.log('✅ Base path fixes applied.');
}

main();
