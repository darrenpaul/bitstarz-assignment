"use server";

import { Url } from "@/app/constants/url";
import Image from "next/image";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [productResponse, commentsResponse] = await Promise.all([
    fetch(`${Url.BASE_URL}/product?id=${params.id}`),
    fetch(`${Url.BASE_URL}/comments?id=${params.id}`),
  ]);

  const product = await productResponse.json();

  let comments = [];

  try {
    comments = await commentsResponse.json();
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        className="bg-neutral-800 text-white px-4 py-2 rounded-md w-fit"
        href="/"
      >
        Home
      </Link>

      <h1 className="text-3xl font-bold uppercase text-white">
        {product.title}
      </h1>

      <Image
        src={product.image}
        alt={product.title}
        width={256}
        height={200}
        className="rounded-md"
      />

      <div>
        <h2 className="text-xl font-bold uppercase text-white">Comments</h2>
        <div className="flex flex-col gap-2">
          {comments &&
            comments.length > 0 &&
            comments.map((comment: string, index: number) => {
              return (
                <div
                  className="text-blue-200 bg-blue-200 w-full max-w-[80ch] px-4 py-2 rounded-md"
                  key={index}
                >
                  <p className="text-blue-950">{comment}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
