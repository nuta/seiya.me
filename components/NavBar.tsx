
export default function NavBar({ breadcrumb }: { breadcrumb: { title: string, dest: string }[] }) {
    return (
        <div className="flex justify-between bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-lg not-prose">
            <div>
                <a className="text-neutral-600 dark:text-neutral-200 no-underline hover:text-neutral-700 dark:hover:text-neutral-400 hover:underline" href="/">seiya.me</a>
                {breadcrumb.map((b, idx) => (
                    <span key={idx}>
                        <span className="text-neutral-400">&nbsp;/&nbsp;</span>
                        <a className="text-neutral-600 dark:text-neutral-200 no-underline hover:text-neutral-700 dark:hover:text-neutral-400 hover:underline"
                            href={b.dest}>{b.title}</a>
                    </span>
                ))}
            </div>
            <div>
                <a className="text-neutral-600 dark:text-neutral-200 no-underline hover:text-neutral-700 dark:hover:text-neutral-400 hover:underline" href="/atom.xml">Feed</a>
            </div>
        </div>
    );
}