import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Url } from "@/app/constants/url";

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

export async function GET() {
  const apiKey = getApiKeyFromHeader();

  if (!apiKey || apiKey !== "Apples") {
    return unauthorizedResponse();
  }

  const response = await fetch(`${Url.BASE_URL}/favorites`, {
    method: "GET",
    headers: {
      "x-api-key": "secret-key-apples",
    },
  });

  const data = await response.json();

  return NextResponse.json({
    favorites: data,
  });
}

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const response = await fetch(`${Url.BASE_URL}/favorites`, {
    method: "POST",
    headers: {
      "x-api-key": "secret-key-apples",
    },
    body: JSON.stringify({ id: payload.productId }),
  });

  const data = await response.json();

  return NextResponse.json({
    favorites: data,
  });
}

export async function DELETE(req: NextRequest) {
  const payload = await req.json();

  const response = await fetch(`${Url.BASE_URL}/favorites`, {
    method: "DELETE",
    headers: {
      "x-api-key": "secret-key-apples",
    },
    body: JSON.stringify({ id: payload.productId }),
  });

  const data = await response.json();

  return NextResponse.json({
    favorites: data,
  });
}
