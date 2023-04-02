
export default function NavBar() {
    return (
        <div className="flex justify-between bg-neutral-100 px-4 py-2 rounded-lg not-prose">
            <div>
                <a className="text-neutral-600 no-underline hover:text-neutral-700 hover:underline" href="/">seiya.me</a>
            </div>
            <div>
                <a className="text-neutral-600 no-underline hover:text-neutral-700 hover:underline" href="/blog">Blog</a>
                <span className="text-neutral-400">&nbsp;・&nbsp;</span>
                <a className="text-neutral-600 no-underline hover:text-neutral-700 hover:underline" href="/atom.xml">Feed</a>
            </div>
        </div>
    );
}