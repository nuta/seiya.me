import {
    defineDocumentType,
    makeSource
} from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';

const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: 'posts/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'string', required: true },
        lang: { type: 'string', required: true }
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, '')
        }
    }
}));

const contentLayerConfig = makeSource({
    contentDirPath: 'data',
    documentTypes: [Post],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            rehypeCodeTitles,
            rehypePrism,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: 'wrap',
                    properties: {
                        className: ['anchor']
                    }
                }
            ]
        ]
    }
});

export default contentLayerConfig;
