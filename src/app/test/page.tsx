"use client";
import { useEffect } from "react";
import { atom, useAtom } from "jotai";
let cursorAtom = atom(1);
let itemsAtom = atom([]);
let posAtom = atom(0);

export default (params) => {
    const [items, setItems] = useAtom(itemsAtom);
    const [cursor, setCursor] = useAtom(cursorAtom);
    const [pos, setPos] = useAtom(posAtom);

    let caller = async () => {
        let b = await fetch(`/test/api?id=${cursor}`);
        b = await b.json();
        if (b.data !== "empty") {
            setItems(b.data);
            setPos(1);
        } else {
            console.log("last");
            setPos(2);
            setCursor((c) => c - 1);
        }
    };

    useEffect(() => {
        caller();
    }, [cursor]);
    return (
        <div>
            <div className="grid grid-cols-4 gap-2 p-5 bg-red-300">
                {items.map((i) => (
                    <div key={i.id} className="w-72 p-4  bg-slate-500">
                        <div>{i.name}</div>
                        <div>{i.email}</div>
                    </div>
                ))}
            </div>
            <button
                className={`px-6 py-2 bg-slate-300 rounded-full ${
                    cursor == 1 && "bg-violet-600"
                }`}
                onClick={() => {
                    if (cursor == 1) {
                        console.log("beginning");
                    } else {
                        setCursor((c) => c - 1);
                    }
                }}
            >
                Prev
            </button>
            <button
                className={`px-6 py-2 bg-slate-300 rounded-full ${
                    pos == 2 && "bg-violet-600"
                }`}
                onClick={() => {
                    setCursor((c) => c + 1);
                }}
            >
                Next
            </button>
        </div>
    );
};
