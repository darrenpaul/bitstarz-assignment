"use server";

import ProductList from "@/app/components/product-list";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/products/slots", {
    method: "GET",
  });
  const { products } = await response.json();

  return (
    <div className="">
      <ProductList products={products} />

      <ProductList products={products} />

      <ProductList products={products} />
    </div>
  );
}
