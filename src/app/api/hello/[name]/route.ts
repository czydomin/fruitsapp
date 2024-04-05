import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const searchParams = request.nextUrl.searchParams;
  const age = searchParams.get("age");
  const hand = searchParams.get("hand");

  if (age && Number(age) < 0) {
    return new Response("Invalid age", {
      status: 400,
    });
  }

  if (hand && hand !== "left" && hand !== "right") {
    return new Response(
      "invalid hand params. Available options: left or right",
      {
        status: 400,
      }
    );
  }

  const name = params.name;
  console.log({ name, age, hand });
  return new Response(
    `hello ${name}! You are ${age} years old. You are ${hand}-handed`
  );
}
