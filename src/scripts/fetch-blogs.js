import 'dotenv/config';
import fs from "node:fs/promises";
import path from "node:path";

const outFile = path.resolve("src/data/posts.json");

async function fetchAllBlogs() {
  const all = [];
  let url = "https://cms.yourteaminasia.com/wp-json/yta/v2/ytablog?per_page=100";

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
