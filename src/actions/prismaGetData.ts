"use server";
import prisma from "lib/prisma";
import { revalidateTag } from "next/cache";

const LIMIT = 6;
let email = "keerthi512@gmail.com";

export const fetchProjects = async ({ pageParam }) => {
    let cursorObj = pageParam == "" ? undefined : { id: pageParam };
    let res = await prisma.item.findMany({
        skip: pageParam == "" ? 0 : 1,
        cursor: cursorObj,
        take: LIMIT,
    });

    return {
        out: res,
        nextCursor: res.length == LIMIT ? res[res.length - 1].id : undefined,
    };
};

export const pushItems = async (e: FormData) => {
    let name = e.get("pName")?.toString() || "";
    let age = +e.get("pAge");

    await prisma.item.create({
        data: {
            name,
            age,
            price: Math.floor(Math.random() * 90 + 10),
            uploadedAt: new Date().getTime(),
            lastModified: new Date().getTime(),
            author: { connect: { id: "64b18d462c99d56c064b19a5" } },
        },
    });
    // revalidateTag("items");
};
