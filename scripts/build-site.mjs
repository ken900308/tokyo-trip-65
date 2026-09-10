// Sites-only generated output. GitHub Pages deploys public/ directly.
import {cp, mkdir, rm, access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root = new URL('../', import.meta.url);
const source = new URL('public/', root);
const output = new URL('dist/client/', root);
const pages = ['index.html', 'itinerary.html', 'currency.html', 'checklist.html',
  'tickets.html', 'phrases.html', 'itinerary-map.html', 'day1-guide.html',
  'day2-guide.html', 'day3-guide.html', 'sumida-aquarium.html'];
const entries = [...pages, 'assets', 'data'];
for (const entry of entries) await access(new URL(entry, source));
// Fixed project-local generated directory; never remove dist/server or source.
await rm(output, {recursive: true, force: true});
await mkdir(output, {recursive: true});
for (const entry of entries) {
  await cp(new URL(entry, source), new URL(entry, output), {recursive: true});
}
for (const holder of ['me', 'dad', 'mom', 'jin']) {
  const name = `images/sumida-ticket-${holder}.png`;
  try { await access(new URL(name, source)); }
  catch (error) { if (error.code === 'ENOENT') continue; throw error; }
  await mkdir(new URL('images/', output), {recursive: true});
  await cp(new URL(name, source), new URL(name, output));
}
console.log(`Sites output generated: ${fileURLToPath(output)}`);
