import img_not_found from "@/resources/images/not-found.png";
import Image from "next/image";
import Link from "next/link";

export default async function NotFound() {
  const responseRandomImage = await fetch(
    `https://api.unsplash.com/photos/random?page=1&per_page=1&query=dogs&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
    {
      next: {
        tags: ["image-not-found"],
        revalidate: 10 * 24,
      },
    }
  );
  const dataRandomImage = await responseRandomImage.json();

  return (
    <main className="w-full h-screen overflow-auto flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        404 - Página no encontrada
      </h1>
      <p className="text-lg mb-4 text-muted-foreground">
        No se pudo encontrar esta página. Es posible que haya sido eliminada o
        que nunca haya existido.
      </p>
      <Link
        href="/"
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition duration-300 mb-4"
      >
        Volver a Inicio
      </Link>
      <div className="w-full flex justify-center">
        <Image
          src={dataRandomImage?.urls?.small || img_not_found}
          width={300}
          height={300}
          alt="Not Found"
          className="rounded shadow-lg"
          blurDataURL={dataRandomImage?.blur_hash}
          placeholder={dataRandomImage?.blur_hash ? "blur" : "empty"}
        />
      </div>
    </main>
  );
}
