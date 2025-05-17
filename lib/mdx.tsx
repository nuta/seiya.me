import { Frontmatter } from "./blog";
import { Scope } from "./blog";
import { evaluate } from "next-mdx-remote-client/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import path from "path";
import { readFileSync } from "node:fs";
import sizeOf from "image-size";
import Image from "next/image";
import Link from "next/link";

function MyImage(props: Record<string, any>) {
    const src = props.src;
    if (typeof src !== "string") {
        throw new Error(`Image src is required`);
    }

    if (!src.startsWith("/")) {
        throw new Error(`Image src must start with /: ${props.src}`);
    }

    const imagePath = path.join(process.cwd(), "public", src);
    const image = readFileSync(imagePath);

    let size;
    try {
        size = sizeOf(image);
    } catch (e) {
        throw new Error(`Error getting image size for ${props.src}: ${e}`);
    }

    return <Image className="my-8" src={`${props.src}`} alt={props.alt} width={size.width} height={size.height} />;
}

export async function renderMDX(source: string) {
    const { content, frontmatter, scope, error } = await evaluate<Frontmatter, Scope>({
        source,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    [rehypePrettyCode, {
                        theme: "github-dark",
                    }]
                ]
            }
        },
        components: {
            img: MyImage,
            a: (props) => <Link href={props.href} prefetch={false}>{props.children}</Link>,
            h2: (props) => <h2 className="font-sans text-2xl font-bold mt-14 mb-6 pb-1 border-b border-gray-300 dark:border-gray-700">{props.children}</h2>,
            h3: (props) => <h3 className="font-sans text-xl font-semibold mt-10 mb-4">{props.children}</h3>,
            h4: (props) => <h4 className="font-sans text-lg font-semibold mt-8 mb-3">{props.children}</h4>,
            h5: (props) => <h5 className="font-sans text-lg font-semibold mt-6 mb-2">{props.children}</h5>,
            p: (props) => <p className="text-base leading-relaxed mb-6 max-w-prose">{props.children}</p>,
            code: (props) => <code className="font-mono text-[92%]">{props.children}</code>,
            pre: (props) => <pre className="my-6 px-4 py-4 text-slate-200 bg-slate-900 leading-5 rounded-lg overflow-x-auto border border-slate-700">{props.children}</pre>,
            ul: (props) => <ul className="list-disc pl-6 text-base mb-5 space-y-2">{props.children}</ul>,
            ol: (props) => <ol className="list-decimal pl-6 text-base mb-5 space-y-2">{props.children}</ol>,
            strong: (props) => <strong className="font-bold text-gray-900 dark:text-gray-100">{props.children}</strong>,
            em: (props) => <em className="italic text-gray-900 dark:text-gray-100">{props.children}</em>,
            blockquote: (props) => <blockquote className="text-base mb-6 border-l-4 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 pl-6 italic py-2">{props.children}</blockquote>,
            hr: (props) => <hr className="my-10 border-t border-gray-300 dark:border-gray-700" />,
        },
    });

    if (error) {
        throw new Error(`MDX rendering error: ${error}`);
    }

    return { content, frontmatter, scope };
}