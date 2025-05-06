import Image from "next/image";
import MyPicture from "./me.jpg";
export default function Home() {
  return (
    <div className="font-['Times']">
      <Image src={MyPicture} alt="selfie" />
      <h1 className="text-2xl font-bold">Seiya Nuta</h1>
      <p>
      </p>
    </div>
  );
}
