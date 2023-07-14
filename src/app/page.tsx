"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { signIn, signOut, useSession } from "next-auth/react";
import Loader from "@/components/loaderComponent/page";
import Styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";

let socket;

export default function Home() {
    const [sock, setSock] = useState(null);
    const { data: session, status } = useSession({
        required: false,
        // onUnauthenticated() {
        //     router.push("/login");
        // },
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
            // socketInitializer();
            // console.log(session);
        }
    }, [status]);

    if (status == "loading") {
        return <Loader />;
    } else if (status == "unauthenticated") {
        return (
            <div className="flex flex-col mx-auto w-fit">
                <div>not logged in</div>
                <button
                    className="py-2 px-6 bg-purple-600 w-fit"
                    onClick={() => {
                        signIn("google");
                    }}
                >
                    login
                </button>
            </div>
        );
    } else if (status == "authenticated") {
        console.log(session);

        return (
            <div className="w-fit mx-auto flex flex-col">
                <div>logged in</div>
                <div>{session.user?.name}</div>
                <div>{session.user?.email}</div>
                <Image
                    className="icon"
                    src={session.user?.image || ""}
                    width={200}
                    height={200}
                    alt="user google profile image"
                ></Image>
                <Link className="btnO" href="/dashboard">
                    Dashboard
                </Link>
                <button
                    className="py-2 px-6 bg-purple-600 w-fit"
                    onClick={() => {
                        signOut();
                    }}
                >
                    logout
                </button>
            </div>
        );
    }
}
