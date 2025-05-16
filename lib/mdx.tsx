import { Frontmatter } from "./blog";
import { Scope } from "./blog";
import { evaluate } from "next-mdx-remote-client/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import path from "path";
import { readFileSync } from "node:fs";
import sizeOf from "image-size";
import Image from "next/image";

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

    return <Image src={`${props.src}`} alt={props.alt} width={size.width} height={size.height} />;
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
        },
    });

    if (error) {
        throw new Error(`MDX rendering error: ${error}`);
    }

    return { content, frontmatter, scope };
}