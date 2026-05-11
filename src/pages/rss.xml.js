import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { business } from '../data/business.ts';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return rss({
    title: `${business.name} — Blog`,
    description: 'Artículos y guías sobre hipotecas en Castellón.',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.id}`,
      })),
    customData: `<language>es-ES</language>`,
  });
}
