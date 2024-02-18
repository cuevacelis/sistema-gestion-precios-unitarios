import { Link } from "@nextui-org/link";
import Image from "next/image";
import img from "./_resources/images/not-found.png";

export default function NotFound() {
  return (
    <section className="w-full flex flex-row justify-center">
      <div>
        <h2 className="text-8xl">Not Found</h2>
        <p className="text-lg">No se pudo encontrar esta página.</p>
        <p>
          Vamos a <Link href="/">SGPU Home</Link>
        </p>
        <Image src={img} alt={"not-found"} />
      </div>
    </section>
  );
}
