/**
 * copy-standalone.mjs
 *
 * After `next build` with `output: "standalone"`, Next.js does NOT
 * automatically copy the static assets into the standalone folder.
 * This script handles that — required for `node .next/standalone/server.js`
 * to serve CSS, JS, images, and public files correctly.
 *
 * Run automatically via the "build" script in package.json.
 */

import { cpSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const pairs = [
  // Public folder → standalone/public
  {
    src: resolve(root, "public"),
    dest: resolve(root, ".next/standalone/public"),
    optional: true,
  },
  // Static assets → standalone/.next/static
  {
    src: resolve(root, ".next/static"),
    dest: resolve(root, ".next/standalone/.next/static"),
    optional: false,
  },
];

for (const { src, dest, optional } of pairs) {
  if (!existsSync(src)) {
    if (optional) {
      console.log(`[copy-standalone] Skipping ${src} (not found)`);
      continue;
    }
    console.error(`[copy-standalone] Required path missing: ${src}`);
    process.exit(1);
  }
  cpSync(src, dest, { recursive: true });
  console.log(`[copy-standalone] Copied ${src} → ${dest}`);
}

console.log("[copy-standalone] Done.");
