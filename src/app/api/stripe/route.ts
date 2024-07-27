import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  await prisma.user.update({
    where: {
      email: data.data.object.customer_email,
    },
    data: {
      hasAccess: true,
    },
  });

  return Response.json(null, { status: 200 });
}
