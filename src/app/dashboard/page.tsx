"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { signOut, useSession } from "next-auth/react";
import Loader from "@/components/loaderComponent/page";
// import Styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface File {
    readonly lastModified: number;
    readonly name: string;
    readonly size: number;
    readonly type: string;
    readonly webkitRelativePath: string;
    arrayBuffer(): Promise<ArrayBuffer>;
    slice(start?: number, end?: number, contentType?: string): Blob;
    stream(): ReadableStream<Uint8Array>;
    text(): Promise<string>;
}

interface InpData {
    name: string;
    file?: File;
    price: number;
}

let socket;

interface itemObj {
    id: number;
    name: string;
    ownerName: string;
    ownerId: string;
    price: number;
}

export default function Home() {
    const router = useRouter();
    const [inp, setInp] = useState<string>("");
    const [inpData, setInpData] = useState<InpData>({
        name: "",
        price: 0,
    });
    const [items, setItems] = useState<itemObj[]>([
        {
            id: 123,
            name: "drafter",
            ownerName: "kp",
            ownerId: "2324rfrrgerg",
            price: 129,
        },
        {
            id: 132,
            name: "razor",
            ownerName: "bhav",
            ownerId: "fe324rsrgr213",
            price: 349,
        },
    ]);
    const [sock, setSock] = useState(null);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/");
        },
    });

    let socketInitializer = async () => {
        await fetch("/api/socket");

        socket = io("", {
            path: "/api/socket_io",
        });

        setSock(socket);

        socket.on("connect", () => {
            console.log("connected");
            socket.emit("test-s", "item from client");
        });

        socket.on("test-c", (v: string) => {
            console.log("received from server - ", v);
        });
    };

    useEffect(() => {
        if (status === "authenticated") {
            socketInitializer();
            return () => {
                socket.disconnect();
            };
        }
    }, [status]);

    console.log(inpData);

    if (status == "loading") {
        return <Loader />;
    } else if (status == "authenticated") {
        return (
            <div>
                {/* <Image
                    src={`/${inpData.file?.name}`}
                    width={200}
                    height={200}
                /> */}
                <div className="center">
                    <Link className="btnO" href="/">
                        Home
                    </Link>
                    {/* <button
                    className="btnW"
                    onClick={() => {
                        signOut();
                    }}
                >
                    logout
                </button> */}
                    <input
                        type="text"
                        placeholder="search here"
                        onChange={(e) => {
                            setInp(e.target.value);
                            // setItems(
                            //     items.filter((i) => i.name.includes(e.target.value))
                            // );
                        }}
                        value={inp}
                    />
                    <div className="allCards">
                        {items
                            .filter((i) => i.name.includes(inp))
                            .map((i) => {
                                return (
                                    <div className="card">
                                        <div>{i.name}</div>
                                        <div>{i.ownerName}</div>
                                        <div>{i.price}</div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="item name"
                        onChange={(e) => {
                            setInpData({ ...inpData, name: e.target.value });
                        }}
                        value={inpData.name}
                    />
                    <input
                        type="file"
                        onChange={(e) => {
                            // console.log(e.target.files?.[0]);

                            setInpData({
                                ...inpData,
                                file: e.target.files?.[0],
                            });
                        }}
                    />
                    <input
                        type="number"
                        placeholder="price"
                        onChange={(e) => {
                            setInpData({ ...inpData, price: +e.target.value });
                        }}
                        value={inpData.price}
                    />
                </div>
            </div>
        );
    }
}
