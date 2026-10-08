// Prerender the React app into dist/index.html at build time.
// Runs after the client build (`vite build`) and the SSR bundle build
// (`vite build --ssr`). Injects the server-rendered HTML into the
// <div id="root"> placeholder so crawlers see full content.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const template = readFileSync(path.join(root, 'dist/index.html'), 'utf-8');
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);

const html = render('/');
if (!html || html.length < 1000) {
  throw new Error(`Prerender produced suspiciously little HTML (${html?.length ?? 0} chars)`);
}

const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
  throw new Error('Could not find <div id="root"></div> placeholder in dist/index.html');
}

writeFileSync(path.join(root, 'dist/index.html'), template.replace(placeholder, `<div id="root">${html}</div>`));
console.log(`Prerendered ${html.length} chars of HTML into dist/index.html`);
