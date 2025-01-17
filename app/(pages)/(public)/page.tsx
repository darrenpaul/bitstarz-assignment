"use server";

import ProductList from "@/app/components/product-list";

export default async function Home({ searchParams }) {
  const response = await fetch(
    `http://localhost:3000/api/products/slots?${new URLSearchParams(searchParams).toString()}`,
    {
      method: "GET",
    },
  );
  const { products } = await response.json();

  return (
    <div className="flex flex-col gap-6">
      <ProductList products={products} label="Top" />

      <ProductList products={products} label="Exclusive" />

      <ProductList products={products} label="Recent" />
    </div>
  );
}
