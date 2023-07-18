import { NextResponse, NextRequest } from "next/server";
import prisma from "lib/prisma";
const LIMIT = 6;

export async function GET(req: NextRequest) {
    const cursor = req.nextUrl.searchParams.get("cursor") ?? "";

    const cursorObj = cursor === "" ? undefined : { id: cursor };

    const res = await prisma.item.findMany({
        skip: cursor == "" ? 0 : 1,
        cursor: cursorObj,
        take: LIMIT,
    });

    return NextResponse.json({
        out: res,
        nextCursor: res.length === LIMIT ? res[res.length - 1].id : undefined,
    });
}
