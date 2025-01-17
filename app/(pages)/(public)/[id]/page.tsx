"use server";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(
    `http://localhost:3000/api/product/${params.id}`,
    {
      method: "GET",
    },
  );

  const { product } = await response.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {JSON.stringify(product)}
    </div>
  );
}
