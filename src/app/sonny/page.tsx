import { useEffect } from "react";
import { formSubmit } from "@/actions/formSubmit";
import prisma from "lib/prisma";
interface dataObj {
    id?: number;
    name: string;
    phone: number;
}

let apiURL = "https://64b433410efb99d86268dd5a.mockapi.io/api/v1/data";

export default async () => {
    let data = await fetch(apiURL, {
        cache: "no-cache",
        next: {
            tags: ["items"],
        },
    });
    data = await data.json();

    // let data: dataObj = await res.json();

    // let data = await prisma.item.findMany();

    // useEffect(() => {}, []);
    return (
        <div>
            <div>
                <form action={formSubmit}>
                    <input name="pName" type="text" placeholder="name" />
                    <input name="pAge" type="number" placeholder="age" />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                {data?.map((i) => {
                    return (
                        <div key={i.id}>
                            {i.name} {i.age}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
