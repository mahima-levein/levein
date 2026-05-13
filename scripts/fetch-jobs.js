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

const WP_URL = process.env.WP_BASE;
if (!WP_URL) {
  console.error("Missing env var: WP_BASE");
  process.exit(1);
}

const outFile = path.resolve("src/data/jobs.json");

async function fetchAll() {
  let all = [];
  let page = 1;
  let perPage = 100;

  while (true) {
    const res = await fetch(`${WP_URL}/wp-json/remoteasia/v2/jobs?per_page=${perPage}&page=${page}`);
    if (!res.ok) {
      if (res.status === 400 || res.status === 404) break; // no more pages
      throw new Error(`WP error ${res.status}`);
    }
    const data = await res.json();
    if (data.length === 0) break;

    // Map posts data ( for my purpose )
    all = all.concat(
      data.map((p) => ({
        ...p,
        title: typeof p.title === "string" ? p.title : (p.title?.rendered ?? ""),
        company: p.company || p.meta?.company || "Levein Group",
        image_url: p.image_url,
      }))
    );

    if (data.length < perPage) break;
    page++;
  }
  return all;
}

const posts = await fetchAll();
await fs.mkdir(path.dirname(outFile), { recursive: true });
await fs.writeFile(outFile, JSON.stringify(posts, null, 2), "utf-8");
console.log(`Wrote ${posts.length} jobs → ${outFile}`);
