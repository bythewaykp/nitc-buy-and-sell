"use client";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

let dataAtom = atom({ name: "Abhraim K P", email: "abhiramjuly16@gmail.com" });
let contentAtom = atom("");

export default () => {
    const [data, setData] = useAtom(dataAtom);
    const [text, setText] = useAtom(contentAtom);
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef) {
            textAreaRef.current.style.height = "0px";
            const scrollHeight = textAreaRef.current.scrollHeight;
            textAreaRef.current.style.height = scrollHeight + "px";
        }
    }, [text]);

    return (
        <div className="w-2/3 mx-auto font-outfit font-semibold text-3xl mt-10">
            <div className="flex flex-row mx-auto w-fit">
                <div className="p-4 flex flex-col gap-2 items-end">
                    <div className="text-[#A9A9A9]">Name</div>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={data.name}
                        // value="Abhiram"
                        className="bg-inherit outline-none text-[#5C5C5D] hover:placeholder:text-slate-500 text-end"
                        onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                        }
                    />
                </div>
                <div className="p-4 flex flex-col gap-2">
                    <div className="text-[#A9A9A9]">Email</div>
                    <input
                        type="text"
                        placeholder="Your Email"
                        onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                        }
                        value={data.email}
                        className="bg-inherit outline-none text-[#5C5C5D] hover:placeholder:text-slate-500"
                    />
                </div>
            </div>
            <div className="mt-16 w-fit mx-auto bg-[#D9D9D9] pt-20 rounded-[30px] bg-clip-border shadow-sm">
                <div className="px-10 py-4 bg-white ">
                    <textarea
                        id="text"
                        className="hover:placeholder:text-slate-500 overflow-hidden resize-none font-outfit font-normal tracking-widest text-[#2E2E2E] outline-none p-4 text-xl"
                        ref={textAreaRef}
                        cols="40"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter your query"
                    ></textarea>
                </div>
                <div className="flex flex-row justify-between p-6 px-10 bg-[#D9D9D9] rounded-[inherit]">
                    <button
                        className="text-[#5C5C5D] bg-white px-4 py-2 rounded-full text-base shadow-md hover:bg-[#CD5888] hover:text-white hover:scale-90 transition-all duration-300"
                        onClick={() => {
                            setText("");
                        }}
                        onMouseEnter={() => {
                            // document.querySelector("#text").style.color = "red";
                            document
                                .querySelector("#text")
                                ?.classList.add("text-red-600");
                        }}
                        onMouseLeave={() => {
                            document
                                .querySelector("#text")
                                ?.classList.remove("text-red-600");
                        }}
                    >
                        Clear
                    </button>
                    <button
                        id="submit"
                        className="bg-[#5C5C5D] text-white px-4 py-2 rounded-full text-base shadow-md hover:bg-[#3A98B9] hover:scale-110 transition-all duration-300"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};
