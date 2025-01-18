"use client";

import { useState } from "react";
import ProductCard from "@/app/components/product-card";
import { Product } from "@/app/types/item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

enum Direction {
  NEXT = "next",
  PREV = "prev",
}

function SwiperNavButtons({
  onSwipeButtonClick,
}: {
  onSwipeButtonClick: (direction: Direction) => void;
}) {
  const swiper = useSwiper();

  return (
    <div className="flex gap-2 mt-3">
      <button
        className="h-14 py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
        aria-label="Previous slide"
        onClick={() => {
          swiper.slidePrev();
          onSwipeButtonClick(Direction.PREV);
        }}
      >
        Prev
      </button>

      <button
        className="h-14 py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
        aria-label="Previous slide"
        onClick={() => {
          swiper.slideNext();
          onSwipeButtonClick(Direction.NEXT);
        }}
      >
        Next
      </button>
    </div>
  );
}

type Props = {
  products: Product[];
  category: string;
};

export default function ProductList(props: Props) {
  const initialLimit = 10;

  const [count, setCount] = useState(0);
  const [products, setProducts] = useState(props.products);
  const [limit, setLimit] = useState(initialLimit);

  async function refreshProducts() {
    const response = await fetch(
      `http://localhost:3000/api/products/${props.category}?${new URLSearchParams(
        {
          limit: limit.toString(),
          offset: "0",
        },
      ).toString()}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    if (data.products.length > 0) {
      setProducts(data.products);
    }
  }

  function handleSwiperButtonClick(direction: Direction) {
    if (direction === Direction.PREV) {
      setCount(Math.max(count - 1, 0));

      if (count % 5 === 0) {
        setLimit(Math.max(limit - initialLimit, 0));
      }
    }

    if (direction === Direction.NEXT) {
      setCount(count + 1);

      if (count % 5 === 0) {
        setLimit(limit + initialLimit);
        refreshProducts();
      }
    }
  }

  return (
    <div className="max-w-screen-2xl mx-auto relative rounded-lg px-10 py-6 bg-blue-200 shadow-md">
      <p className="text-2xl font-bold uppercase mb-3">{props.category}</p>

      {count}

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={12}
        slidesPerView={1}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
          // when window width is >= 1280px
          1280: {
            slidesPerView: 6,
            spaceBetween: 12,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}

        <SwiperNavButtons onSwipeButtonClick={handleSwiperButtonClick} />
      </Swiper>
    </div>
  );
}
