"use client";
import { Product } from "@/app/types/item";
import { useFavourites } from "@/app/providers/favorites";
import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  product: Product;
};

export default function ProductCard(props: Props) {
  const { favorites, handleAddToFavourites, handleRemoveToFavourites } =
    useFavourites();

  const isFavourite = useMemo(() => {
    return !favorites.includes(props.product.id);
  }, [favorites, props.product.id]);

  return (
    <div className="bg-blue-100 h-fit p-4 rounded-lg flex flex-col gap-3 shadow-md">
      <Link
        className="uppercase font-bold"
        href={`/product/${props.product.id}`}
      >
        {props.product.title}
      </Link>

      <Image
        className="w-64 h-fit object-cover rounded-lg"
        src={props.product.image}
        alt={props.product.title}
        width={100}
        height={100}
      />

      {isFavourite && (
        <button
          className="w-full py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          onClick={() => handleAddToFavourites(props.product.id)}
        >
          Add To Favorites
        </button>
      )}

      {!isFavourite && (
        <button
          className="w-full py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
          onClick={() => handleRemoveToFavourites(props.product.id)}
        >
          Remove From Favorites
        </button>
      )}
    </div>
  );
}
