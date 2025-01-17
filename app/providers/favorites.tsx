"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  favorites: number[];
  handleAddToFavourites: (productId: number) => void;
  handleRemoveToFavourites: (productId: number) => void;
};

const FavoritesContext = createContext<Props>({
  favorites: [],
  handleAddToFavourites: () => {},
  handleRemoveToFavourites: () => {},
});

export default function FavoritesProvider({ children }: PropsWithChildren) {
  const [favorites, setFavourites] = useState<number[]>([]);

  async function handleAddToFavourites(productId: number) {
    fetch("/api/favorites", {
      method: "POST",
      headers: {
        "x-api-key": "Apples",
      },
      body: JSON.stringify({ productId }),
    }).then((res) => res.json().then((data) => setFavourites(data.favorites)));
  }

  async function handleRemoveToFavourites(productId: number) {
    fetch("/api/favorites", {
      method: "DELETE",
      headers: {
        "x-api-key": "Apples",
      },
      body: JSON.stringify({ productId }),
    }).then((res) => res.json().then((data) => setFavourites(data.favorites)));
  }

  useEffect(() => {
    function fetchFavorites() {
      fetch("/api/favorites", {
        method: "GET",
        headers: {
          "x-api-key": "Apples",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFavourites(data.favorites);
        })
        .catch((err) => {
          console.error("Error fetching favorites:", err);
        });
    }

    fetchFavorites();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        handleAddToFavourites,
        handleRemoveToFavourites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavoritesContext);
}
