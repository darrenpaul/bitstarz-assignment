"use client";
import { Product } from "@/app/types/item";
import { useFavourites } from "@/app/providers/favorites";
import { useMemo } from "react";

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
    <div className="bg-blue-300 h-full p-4 rounded-lg">
      <p>{props.product.name}</p>

      {isFavourite && (
        <button
          className="w-full bg-blue-800 rounded-md p-2 text-white"
          onClick={() => handleAddToFavourites(props.product.id)}
        >
          Add To Favorites
        </button>
      )}

      {!isFavourite && (
        <button
          className="w-full bg-red-800 rounded-md p-2 text-white"
          onClick={() => handleRemoveToFavourites(props.product.id)}
        >
          Remove From Favorites
        </button>
      )}
    </div>
  );
}
