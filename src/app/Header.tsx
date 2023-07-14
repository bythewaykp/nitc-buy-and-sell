"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default () => {
    const pathname = usePathname();

    let a = [
        { path: "/", name: "Home", id: 0 },
        { path: "/test", name: "Test", id: 1 },
        { path: "/profile", name: "Profile", id: 1 },
        { path: "/contact-us", name: "Contact Us", id: 2 },
    ];

    let RouteComp = ({ path, name }) => {
        return (
            <Link
                className={`p-2 font-outfit font-semibold text-xl ${
                    pathname == path ||
                    (pathname.split("/")[1] == "service" && path == "/services")
                        ? "text-white"
                        : "text-[#a9a9a9]"
                } hover:text-white`}
                href={path}
            >
                <div className="flex flex-col items-center">
                    <div>{name}</div>
                    {(pathname == path ||
                        (pathname.split("/")[1] == "service" &&
                            path == "/services")) && (
                        // <div className="w-1 bg-black h-1 rounded-[30px]"></div>
                        <Image
                            className="mt-1"
                            src="/assets/dot.svg"
                            width={10}
                            height={10}
                            alt="logo"
                        />
                    )}
                </div>
            </Link>
        );
    };

    return (
        <>
            <Image
                className="fixed left-0 top-0 w-16 m-8"
                src="/assets/logo.svg"
                width={200}
                height={200}
                alt="logo"
            />
            <div className="flex flex-row mx-auto w-fit gap-4 mt-10">
                {a.map((i) => (
                    <RouteComp path={i.path} name={i.name} key={i.path} />
                ))}
            </div>
        </>
    );
};
