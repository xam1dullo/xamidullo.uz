import type { APIRoute } from "astro";
import { SITE_URL, getPublishedPosts } from "../lib/blog";

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const lastBuild = posts[0]?.data.pubDate ?? new Date();

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.id}/`;
      const categories = post.data.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n");
      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <description>${escapeXml(post.data.description)}</description>
${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Xamidullo Xudoyberdiyev · Blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>PostgreSQL, Node.js, Docker va production backend tizimlari bo‘yicha amaliy maqolalar.</description>
    <language>uz</language>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
