"use server";
import prisma from "lib/prisma";
import { revalidateTag } from "next/cache";

let apiURL = "https://64b433410efb99d86268dd5a.mockapi.io/api/v1/data";

interface dataObj {
    id?: number;
    name: string;
    phone: number;
}

interface itemObj {
    name: string;
    age: number;
    uploadedAt: number;
    lastModified: number;
    price: number;
}

export let formSubmit = async (e: FormData) => {
    // let data = [];
    // for (let i of e.entries()) {
    //     data[i[0]] = i[1];
    // }
    // console.log(data);

    let name = e.get("pName")?.toString() || "";
    let age = +e.get("pAge");

    // await prisma.item.create({
    //     data: {
    //         name,
    //         age,
    //         price: Math.floor(Math.random() * 90 + 10),
    //         uploadedAt: new Date().getTime(),
    //         lastModified: new Date().getTime(),
    //         author: { connect: { id: "64b18d462c99d56c064b19a5" } },
    //     },
    // });
    await fetch(apiURL, {
        method: "POST",
        body: JSON.stringify({ name, age }),
        headers: { "Content-Type": "application/json" },
    });
    // console.log(res);
    revalidateTag("items");
};
