import { NextResponse } from "next/server";
import prisma from "lib/prisma";
function unserialize(str) {
    str = decodeURIComponent(str);
    var chunks = str.split("&"),
        obj = {};
    for (var c = 0; c < chunks.length; c++) {
        var split = chunks[c].split("=", 2);
        obj[split[0]] = split[1];
    }
    return obj;
}
export async function GET(request) {
    let w = 3;

    var searchParams = unserialize(request.nextUrl.searchParams);
    let newid = searchParams.id;

    let c = await prisma.user.findFirst({
        skip: w * (newid - 1),
        select: { id: true },
    });

    if (c == null) {
        return NextResponse.json({ data: "empty" });
    }

    let res = await prisma.user.findMany({
        take: w,
        // skip: 1,
        cursor: {
            id: c.id,
        },
        orderBy: {
            id: "asc",
        },
    });

    // const lastPostInResults = res[res.length - 1]; // Remember: zero-based index! :)
    // const myCursor = lastPostInResults.id;

    return NextResponse.json({ data: res });
}
