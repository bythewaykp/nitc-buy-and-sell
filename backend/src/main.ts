// import { faker } from "@faker-js/faker/locale/en_US";
import prisma from "../lib/prisma.ts";

// import dotenv from "dotenv";
// dotenv.config({ path: "../.env" });

let CreateItem = async (email) => {
    return new Promise<any>(async (resolve, reject) => {
        let c = await prisma.user.findFirst({
            where: {
                email,
            },
            select: {
                id: true,
            },
        });
        let data: itemObj = {
            name: "Item" + Math.floor(Math.random() * 10),
            age: +Math.floor(Math.random() * 90 + 10).toString(),
            lastModified: +new Date().getTime(),
            price: Math.floor(Math.random() * 900 + 100),
            uploadedAt: +new Date().getTime(),
        };

        await prisma.item.create({
            data: { ...data, author: { connect: { id: c.id } } },
        });
        resolve(data);
    });
};

let CreateUser = async (name, email) => {
    return new Promise<any>(async (resolve, reject) => {
        let b: userObj = {
            name,
            email,
            createdAt: +new Date().getTime(),
            role: "user",
        };
        await prisma.user.create({
            data: b,
        });
        resolve(b);
    });
};
// let email = "abhiramjuly16@gmail.com";
// let name = "Abhiram K P";
let email = "keerthi512@gmail.com";
let name = "Keerthi N P";
// let c = await CreateUser(name, email);
let c = await CreateItem(email);
console.log(c);
