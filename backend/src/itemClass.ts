// import { faker } from "@faker-js/faker/locale/en_US";
import prisma from "../lib/prisma.ts";

// import dotenv from "dotenv";
// dotenv.config({ path: "../.env" });

class User {
    email: string;

    constructor({ email }) {
        this.email = email;
    }

    async createUser({ name, role = "user" }: { name: string; role: string }) {
        let data: userObj = {
            name,
            email: this.email,
            createdAt: +new Date().getTime(),
            role: role,
        };
        try {
            await prisma.user.create({
                data,
            });
        } catch (e) {
            if (e.code == "P2002") {
                throw "\n----- Error : Email already exists -----\n";
            }
            throw `Error creating User with email ${this.email}`;
        }
        console.log(
            `\n\n----\n\nCreated new user email '${this.email}' and name '${name}'\n\n----\n\n`
        );

        return data;
    }

    async addItem({
        name,
        age,
        price,
    }: {
        name: string;
        age: number;
        price: number;
    }) {
        let c = await prisma.user.findUnique({
            where: {
                email: this.email,
            },
            select: {
                id: true,
            },
        });

        let time = +new Date().getTime();

        let data: itemObj = {
            name,
            age,
            price,
            lastModified: time,
            uploadedAt: time,
            userId: c.id,
        };
        await prisma.item.create({
            data,
        });
        console.log(
            `\n\n----\n\nAdded new item with name '${name}' to the user with email '${this.email}'\n\n----\n\n`
        );
        return data;
    }

    async addItemMany(count: number) {
        let c = await prisma.user.findUnique({
            where: {
                email: this.email,
            },
            select: {
                id: true,
            },
        });

        let data = [];

        for (let i = 0; i < count; i++) {
            data.push({
                name: "Item " + +(i + 1),
                age: +Math.floor(Math.random() * 90 + 10).toString(),
                lastModified: +new Date().getTime(),
                price: Math.floor(Math.random() * 900 + 100),
                uploadedAt: +new Date().getTime(),
                userId: c.id,
            });
        }

        await prisma.item.createMany({
            data,
        });

        console.log(
            `\n\n----\n\nAdded '${count}' items with name to the user with email '${this.email}'\n\n----\n\n`
        );

        return data;
    }
}

export default User;
