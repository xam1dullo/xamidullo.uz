import type { APIRoute } from "astro";
import { SITE_URL, getPublishedPosts, isoDate } from "../lib/blog";

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const newest = posts[0] ? isoDate(posts[0].data.updatedDate ?? posts[0].data.pubDate) : undefined;

  const entries = [
    { loc: `${SITE_URL}/`, lastmod: newest ?? "2026-07-06", changefreq: "monthly", priority: "1.0" },
    ...(posts.length > 0
      ? [{ loc: `${SITE_URL}/blog/`, lastmod: newest, changefreq: "weekly", priority: "0.8" }]
      : []),
    ...posts.map((post) => ({
      loc: `${SITE_URL}/blog/${post.id}/`,
      lastmod: isoDate(post.data.updatedDate ?? post.data.pubDate),
      changefreq: "yearly",
      priority: "0.7",
    })),
  ];

  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ""}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
