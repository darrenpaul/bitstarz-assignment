"use server";

import ProductList from "@/app/components/product-list";
import { Url } from "@/app/constants/url";

export default async function Home() {
  const [topResponse, recentResponse, exclusiveResponse] = await Promise.all([
    fetch(`${Url.BASE_URL}/products/top?offset=0&limit=10`, {
      method: "GET",
    }),
    fetch(`${Url.BASE_URL}/products/recent?offset=0&limit=10`, {
      method: "GET",
    }),
    fetch(`${Url.BASE_URL}/products/exclusive?offset=0&limit=10`, {
      method: "GET",
    }),
  ]);

  const topData = await topResponse.json();
  const recentData = await recentResponse.json();
  const exclusiveData = await exclusiveResponse.json();

  return (
    <div className="flex flex-col gap-6">
      <ProductList products={topData} category="Top" />

      <ProductList products={recentData} category="Exclusive" />

      <ProductList products={exclusiveData} category="Recent" />
    </div>
  );
}
