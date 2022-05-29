import { writeFileSync } from 'fs';
import { allPosts } from '../.contentlayer/generated/Post/_index.mjs';
import { Feed } from "feed";

const feed = new Feed({
    title: 'seiya.me',
    id: 'https://seiya.me',
    link: 'https://seiya.me',
    copyright: 'CC BY 4.0',
    generator: 'https://github.com/nuta/seiya.me',
    author: {
        name: 'Seiya Nuta',
        link: 'https://seiya.me',
    }
});

for (const post of allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())) {
    const date = new Date(post.date);
    console.log(`[${date}] ${post.title}`);
    feed.addItem({
        title: post.title,
        link: `https://seiya.me/blog/${post.slug}`,
        date,
    });
}

writeFileSync('public/atom.xml', feed.atom1());
console.log('Generated feeds!');
