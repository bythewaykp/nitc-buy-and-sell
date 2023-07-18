"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchProjects, pushItems } from "@/actions/prismaGetData";

const LIMIT = 6;

export default () => {
    const { ref, inView } = useInView();

    const {
        isStale,
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery(
        ["items"],
        async ({ pageParam = "" }) => {
            let res = await fetchProjects({
                pageParam,
            });

            // let res = await fetch("/api/items?cursor=" + pageParam);
            // res = await res.json();

            return res;
        },
        {
            getNextPageParam: (lastPage, pages) => {
                return lastPage.nextCursor;
            },
            keepPreviousData: true,
        }
    );
    console.log(data);

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
                grid grid-cols-10 gap-x-1 gap-y-2
                {flex flex-col gap-4}
                "
                >
                    {data.pages.map((page, k) =>
                        page?.out.map((item, i) => {
                            let chek =
                                k * LIMIT + i + 1 ===
                                data.pageParams.length * LIMIT;

                            return (
                                <div
                                    ref={chek ? ref : null}
                                    className={`bg-slate-400 w-2/3 mx-auto ${
                                        chek && "bg-slate-500"
                                    }`}
                                    key={item.id}
                                >
                                    {item.name}
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
            <div>
                <div>
                    <form action={pushItems}>
                        <input name="pName" type="text" placeholder="name" />
                        <input name="pAge" type="number" placeholder="age" />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
