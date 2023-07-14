"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { fetchCaller } from "lib/utils";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

let dataAtom = atom({
    name: "",
    age: 0,
    price: 0,
});

let itemsAtom = atom([]);

export default () => {
    const [data, setData] = useAtom(dataAtom);
    const [items, setItems] = useAtom(itemsAtom);

    let clickhandler = async () => {
        let b = await fetchCaller("/profile/createitem", { ...data, email });
        console.log(b);
    };

    let caller = async () => {
        let b = await fetchCaller("/profile/items", { email });
        // console.log(b);
        setItems(b.data);
    };
    useEffect(() => {
        caller();
    }, []);
    let email = "abhiramjuly16@gmail.com";
    let status = "authenticated";
    // const { data: session, status } = useSession({
    //     required: false,
    //     // onUnauthenticated() {
    //     //     router.push("/login");
    //     // },
    // });

    if (status == "loading") {
        return <div>loading</div>;
    }
    if (status == "authenticated") {
        return (
            <div>
                {/* <Image
                    className="fixed right-0 top-0 m-10 w-16 rounded-full"
                    src={session.user?.image || ""}
                    width={200}
                    height={200}
                    alt="user google profile image"
                ></Image> */}
                <div className="w-2/3 mx-auto">
                    <div className="text-2xl">Your Items</div>
                    <div>
                        {items.map((i) => (
                            <div key={i.id}>{i.name}</div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col w-fit gap-2 mx-auto">
                    <input
                        type="text"
                        placeholder="Item name"
                        onChange={(e) =>
                            setData({
                                ...data,
                                name: e.target.value,
                            })
                        }
                        value={data.name}
                    />
                    <input
                        type="number"
                        placeholder="Item Age"
                        onChange={(e) =>
                            setData({
                                ...data,
                                age: +e.target.value,
                            })
                        }
                        value={data.age}
                    />
                    <input
                        type="number"
                        placeholder="Item Price"
                        onChange={(e) =>
                            setData({
                                ...data,
                                price: +e.target.value,
                            })
                        }
                        value={data.price}
                    />
                    <button
                        onClick={clickhandler}
                        className="px-6 py-2 bg-slate-400 rounded-full"
                    >
                        Create New Post
                    </button>
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};
