import { NextResponse } from "next/server";
import prisma from "lib/prisma";

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const email = searchParams.get("email") ?? "";
    const name = searchParams.get("name") ?? "";
    const age = +searchParams.get("age") ?? "";
    const price = +searchParams.get("price") ?? 0;

    const user = await prisma.user.findFirst({
        where: { email },
        select: { id: true },
    });

    let data: itemObj = {
        uploadedAt: +new Date().getTime(),
        lastModified: +new Date().getTime(),
        name,
        age,
        price,
    };

    await prisma.item.create({
        data: { ...data, author: { connect: { id: user?.id } } },
    });

    return NextResponse.json({ data });
}
