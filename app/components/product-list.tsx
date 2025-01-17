"use client";

import Link from "next/link";
import ProductCard from "@/app/components/product-card";
import { Product } from "@/app/types/item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
type Props = {
  products: Product[];
};

const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="absolute top-1/2 -translate-y-1/2 z-10 w-full">
      <Link
        href={{ query: { limit: 10 } }}
        className="absolute left-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        aria-label="Previous slide"
        onClick={() => {
          swiper.slidePrev();
        }}
      >
        L
      </Link>

      <Link
        href={{ query: { limit: 20 } }}
        className="absolute right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        aria-label="Previous slide"
        onClick={() => {
          swiper.slideNext();
        }}
      >
        R
      </Link>
    </div>
  );
};

export default function ProductList(props: Props) {
  return (
    <div className="max-w-screen-xl mx-auto relative px-10 ">
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
        className="relative"
      >
        {props.products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
        <SwiperNavButtons />
      </Swiper>
    </div>
  );
}
