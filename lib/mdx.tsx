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
            h2: (props) => <h2 className="text-3xl mt-14 mb-4 pb-2 font-bold">{props.children}</h2>,
            h3: (props) => <h3 className="text-lg mt-8 mb-4 font-bold">{props.children}</h3>,
            h4: (props) => <h4 className="text-base mt-6 mb-4 font-bold">{props.children}</h4>,
            h5: (props) => <h5 className="text-base mt-4 mb-4 font-bold">{props.children}</h5>,
            p: (props) => <p className=" text-base leading-relaxed mb-6 max-w-prose">{props.children}</p>,
            code: (props) => <code className="font-mono text-[90%]">{props.children}</code>,
            pre: (props) => <pre className="my-8 px-4 py-6 bg-slate-800 rounded-lg overflow-x-scroll">{props.children}</pre>,
            ul: (props) => <ul className="list-disc list-inside text-base leading-loose">{props.children}</ul>,
            strong: (props) => <strong className="font-bold text-gray-900 dark:text-gray-100">{props.children}</strong>,
            em: (props) => <em className="italic text-gray-900 dark:text-gray-100">{props.children}</em>,
            hr: (props) => <hr className="my-8 border-t border-gray-200 dark:border-gray-600" />,
        },
    });

    if (error) {
        throw new Error(`MDX rendering error: ${error}`);
    }

    return { content, frontmatter, scope };
}