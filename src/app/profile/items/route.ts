import { NextResponse } from "next/server";
import prisma from "lib/prisma";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") ?? "";

    let { id } = await prisma.user.findFirst({
        where: {
            email,
        },
        select: {
            id: true,
        },
    });

    const items: itemObj[] = await prisma.item.findMany({
        where: {
            userId: id,
        },
    });

    return NextResponse.json({ data: items });
}
