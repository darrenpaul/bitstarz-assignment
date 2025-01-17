import { NextRequest, NextResponse, NextApiRequest } from "next/server";
import { products } from "@/app/data/products";
import filterProductsByCategory from "@/app/utils/filter-products-by-category";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { category: string } },
) {
  try {
    const searchParams = req.nextUrl.searchParams;
    console.log("asdasdasdasdsa");

    const offset = parseInt(searchParams.get("offset") || "0");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (isNaN(offset) || isNaN(limit)) {
      return NextResponse.json(
        { error: "Invalid offset or limit parameters" },
        { status: 400 },
      );
    }

    if (offset < 0 || limit < 0) {
      return NextResponse.json(
        { error: "Offset and limit must be positive numbers" },
        { status: 400 },
      );
    }

    const paginatedProducts = products.slice(offset, offset + limit);

    return NextResponse.json({
      products: paginatedProducts,
      metadata: {
        total: products.length,
        offset,
        limit,
        count: paginatedProducts.length,
      },
    });
  } catch (error) {
    console.error("Error in GET products:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
