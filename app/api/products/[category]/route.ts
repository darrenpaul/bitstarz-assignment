import { NextRequest, NextResponse } from "next/server";
import { Url } from "@/app/constants/url";

export async function GET(
  req: NextRequest,
  { params }: { params: { category: string } },
) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const offset = parseInt(searchParams.get("offset") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const response = await fetch(
      `${Url.BASE_URL}/products/${params.category.toLowerCase()}?${new URLSearchParams(
        {
          limit: limit.toString(),
          offset: offset.toString(),
        },
      ).toString()}`,
      {
        method: "GET",
      },
    );

    const products = await response.json();

    return NextResponse.json({
      products: products,
    });
  } catch (error) {
    console.error("Error in GET products:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
