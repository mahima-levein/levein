
import fs from "node:fs/promises";
import path from "node:path";

async function loadEnvFile() {
  try {
    const contents = await fs.readFile(path.resolve('.env'), 'utf-8');

    for (const line of contents.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;

      const [key, ...valueParts] = trimmed.split('=');
      if (!process.env[key]) {
        process.env[key] = valueParts.join('=').trim();
      }
    }
  } catch {
    // Fall back to whatever is already present in the process environment.
  }
}

await loadEnvFile();

const WP_URL = process.env.WP_BASE_BLOGS;
if (!WP_URL) {
  console.error("Missing env var: WP_BASE_BLOGS");
  process.exit(1);
}

const outFile = path.resolve("src/data/posts.json");

async function fetchAllBlogs() {
  const all = [];
  let url = `${WP_URL}wp-json/yta/v2/ytablog?category=levein&per_page=100`;

  while (url) {
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`CMS error ${res.status}: ${text}`);
    }
    const data = await res.json();
    //shape of yta blog data set
    for (const r of data) {
      all.push({
        ...r,
        updatedAt: r["Last Modified"] || r.createdTime,
      });
    }
    url = null;
  }
  return all;
}

const posts = await fetchAllBlogs();

await fs.mkdir(path.dirname(outFile), { recursive: true });

await fs.writeFile(outFile, JSON.stringify(posts, null, 2), "utf-8");
console.log(`Wrote ${posts.length} records → ${outFile}`);
