import * as cheerio from 'cheerio';

export default async function LinkCard({ url, }) {
    const { title, description, image } = await fetchOG(url);
    const hostname = new URL(url).hostname;
    return (
        <div className="not-prose my-8 h-32 overflow-hidden border border-neutral-300 shadow rounded-md w-full">
            <a href={url} target="_blank" rel="noopener noreferrer" className="no-underline hover:no-underline hover:bg-neutral-100 transition ease-in-out duration-150 inline-block w-full h-32">
                <div className="flex h-32">
                    <div className="px-4 py-2 flex-grow flex flex-col justify-between">
                        <div>
                            <p className="text-neutral-900 font-bold text-lg text-ellipsis overflow-hidden max-h-8">{title}</p>
                            <p className="pt-2 text-gray-700 text-ellipsis overflow-hidden max-h-8">{description}</p>
                        </div>
                        <div>
                            <p className="pt-2 text-gray-500">{hostname}</p>
                        </div>
                    </div>
                    <div className="h-48 flex-shrink-0">
                        <img src={image} className="object-cover w-full h-full" alt="a thumbnail image of the link" />
                    </div>
                </div>
            </a>
        </div>
    );
};

async function fetchOG(url: string) {
    const resp = await fetch(url);
    const $ = cheerio.load(await resp.text());
    const title = $('meta[property="og:title"]').attr('content');
    const description = $('meta[property="og:description"]').attr('content');
    const image = $('meta[property="og:image"]').attr('content');

    return { title, description, image };
}
