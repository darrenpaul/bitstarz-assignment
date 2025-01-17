import { NextRequest, NextResponse } from "next/server";
import { favorites } from "@/app/data/favorites";
import { headers } from "next/headers";

let favoritesState = [...favorites];

function unauthorizedResponse() {
  return Response.json(
    {
      error: "Unauthorized",
    },
    {
      status: 401,
    },
  );
}

function getApiKeyFromHeader() {
  const headersList = headers();
  return headersList.get("x-api-key");
}

export async function GET(req: NextRequest) {
  const apiKey = getApiKeyFromHeader();

  console.log(apiKey);

  if (!apiKey || apiKey !== "Apples") {
    return unauthorizedResponse();
  }

  return NextResponse.json({
    favorites: favoritesState,
  });
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  favoritesState.push(data.productId);

  return NextResponse.json({
    favorites: favoritesState,
  });
}

export async function DELETE(req: NextRequest) {
  const data = await req.json();

  favoritesState = favoritesState.filter((id) => id !== data.productId);

  return NextResponse.json({
    favorites: favoritesState,
  });
}
