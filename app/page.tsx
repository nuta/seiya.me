import Image from "next/image";
import MyPicture from "./me.jpg";
import Link from "next/link";
export default function Home() {
  return (
    <div className="font-['Times']">
      <div className="flex flex-row items-center">
        <div className="">
          <Image src={MyPicture} alt="selfie" className="rounded max-w-24" />
        </div>
        <div className="ml-5 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold">Seiya Nuta</h1>
            <p>
              An operating system kernel enthusiast.
            </p>
          </div>
          <nav className="flex flex-row gap-2">
            <Link href="https://github.com/nuta" prefetch={false}>GitHub</Link>
            <Link href="https://twitter.com/seiyanuta" prefetch={false}>Twitter</Link>
            <Link href="https://www.linkedin.com/in/seiyanuta/" prefetch={false}>LinkedIn</Link>
          </nav>
        </div>
      </div>
      <p>
      </p>
    </div>
  );
}
