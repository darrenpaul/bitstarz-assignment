import { NextRequest, NextResponse } from "next/server";
import { comments } from "@/app/data/comments";

let initialComments = [...comments];

export async function GET(
  req: NextRequest,
  context: { params: { id: string } },
) {
  try {
    const productId = parseInt(await Promise.resolve(context.params.id));
    const productComments = initialComments.filter(
      (c) => c.productId === productId,
    );
    return NextResponse.json({ comments: productComments });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
