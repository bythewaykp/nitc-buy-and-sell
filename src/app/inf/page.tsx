"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

// let d = [
//     { name: "1erge", id: 1 },
//     { name: "5regerwerge", id: 2 },
//     { name: "43eegrrge", id: 3 },
//     { name: "e43ergrge", id: 4 },
//     { name: "253eergrge", id: 5 },
//     { name: "2453erwge", id: 6 },
// ];

const LIMIT = 10;

export default () => {
    const { ref, inView } = useInView();
    const fetchProjects = async ({ pageParam = 1 }) => {
        // const res = await fetch("/api/projects?cursor=" + pageParam);
        // return res.json();
        // await new Promise<void>((resolve) => {
        //     setTimeout(() => {
        //         resolve();
        //     }, 2000);
        // });

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}&_limit=${LIMIT}`
        );
        return response.json();
        // await new Promise((resolve) => {
        //     setTimeout(resolve, 1000);
        // });
        // return d.slice((pageParam - 1) * n, pageParam * n);
    };

    const {
        isStale,
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery(["query"], fetchProjects, {
        getNextPageParam: (lastPage, pages) => {
            return lastPage.length === LIMIT ? pages.length + 1 : undefined;
        },
        keepPreviousData: true,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [data, inView]);

    return status === "loading" ? (
        <p>Init...</p>
    ) : status === "error" ? (
        <p>Error: {error.message}</p>
    ) : (
        <div>
            <div>
                {isFetching && !isFetchingNextPage ? "Fetching..." : null}
            </div>
            <div className="w-2/3 mx-auto mt-10">
                <div
                    className="p-3 bg-slate-800 
                {grid grid-cols-4 gap-y-20 gap-x-1}
                flex flex-col gap-4
                "
                >
                    {data.pages.map((page, k) =>
                        page.map((item, i) => {
                            let chek =
                                k * LIMIT + i + 1 ===
                                data.pageParams.length * LIMIT;

                            return (
                                <div
                                    ref={chek ? ref : null}
                                    className={`px-6 py-4 bg-slate-400 w-2/3 mx-auto ${
                                        chek && "bg-slate-500"
                                    }`}
                                    key={item.id}
                                >
                                    {item.title}
                                    {/* {project.name} */}
                                </div>
                            );
                        })
                    )}
                </div>
                <div className="w-full">
                    <button
                        onClick={fetchNextPage}
                        className="w-fit mx-auto"
                        disabled={!hasNextPage || isFetchingNextPage}
                    >
                        {isFetchingNextPage
                            ? "Loading more..."
                            : hasNextPage
                            ? "Next"
                            : "Nothing more to load"}
                    </button>
                </div>
            </div>
        </div>
    );
};
