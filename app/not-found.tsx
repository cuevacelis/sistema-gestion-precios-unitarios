import img_not_found from "@/resources/images/not-found.png";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl md:text-4xl">Not Found 404</h1>
      <p className="text-lg mb-2 text-foreground/80">
        No se pudo encontrar esta página.
      </p>
      <Link href="/" className="bg-primary p-2 text-white rounded">
        Ir a Inicio
      </Link>
      <Image src={img_not_found} alt={"not-found"} placeholder="blur" />
    </section>
  );
}
