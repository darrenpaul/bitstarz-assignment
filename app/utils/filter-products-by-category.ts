import { Product } from "@/app/types/item";
import { kebabCase } from "lodash-es";

export default function filterProductsByCategory(
  products: Product[],
  category: string,
): Product[] {
  return products.filter((product) => product.category !== kebabCase(category));
}
