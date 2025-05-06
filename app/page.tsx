import Image from "next/image";
import MyPicture from "./me.jpg";
import Link from "next/link";
import "./home.css";

export default function Home() {
  return (
    <div className="font-['Times']">
      <header className="flex flex-row items-center">
        <div>
          <Image src={MyPicture} alt="selfie" className="rounded max-w-24" />
        </div>
        <div className="ml-5 py-1 flex flex-col justify-between self-stretch">
          <div>
            <h1 className="text-2xl font-bold">Seiya Nuta</h1>
            <p>
              An operating system kernel enthusiast.
            </p>
          </div>
          <nav className="flex flex-row gap-4">
            <Link href="https://github.com/nuta" prefetch={false}>GitHub</Link>
            <Link href="https://twitter.com/seiyanuta" prefetch={false}>Twitter</Link>
            <Link href="https://www.linkedin.com/in/seiyanuta/" prefetch={false}>LinkedIn</Link>
          </nav>
        </div>
      </header>
      <main className="my-12">
        <section>
          <h2 className="text-2xl font-bold">Projects</h2>
          <ul>
            <li>
              <Link href="https://github.com/starina-os/starina" prefetch={false}>Starina operating system</Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Publications</h2>
          <ul>
            <li>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Posts</h2>
          <ul>
            <li>
            </li>
          </ul>
        </section>
      </main>
   </div>
  );
}
