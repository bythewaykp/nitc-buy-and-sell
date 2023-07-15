"use client";
import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";

let pageAtom = atom(1);

let LIMIT = 2;

let d = [
    { title: "1erge", id: 1 },
    { title: "5regerwerge", id: 2 },
    { title: "43eegrrge", id: 3 },
    { title: "e43ergrge", id: 4 },
    { title: "253eergrge", id: 5 },
    { title: "2453erwge", id: 6 },
    { title: "2453erwge", id: 7 },
];

const fetchProjects = async (pageParam) => {
    // const response = await fetch(
    //     `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}&_limit=${LIMIT}`
    // );
    // return response.json();

    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    let hasMore = d.length > pageParam * LIMIT ?? false;
    return {
        result: d.slice((pageParam - 1) * LIMIT, pageParam * LIMIT),
        hasMore,
    };
    // return d.slice((pageParam - 1) * LIMIT, pageParam * LIMIT);
};

export default () => {
    const [page, setPage] = useAtom(pageAtom);
    const { isLoading, isError, error, data, isFetching, isPreviousData } =
        useQuery(["projects", page], () => fetchProjects(page), {
            keepPreviousData: true,
        });

    return (
        <div>
            {/* {isFetching ? "Fetching..." : null} */}
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <div>
                    {data.result.map((project) => (
                        <p key={project.id}>{project.title}</p>
                    ))}
                </div>
            )}
            <span>Current Page: {page}</span>
            <button
                className="bg-blue-400"
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 1}
            >
                Previous Page
            </button>{" "}
            <button
                className="bg-red-400"
                onClick={() => {
                    if (!isPreviousData) {
                        setPage((old) => old + 1);
                    }
                }}
                disabled={isPreviousData || !data?.hasMore}
            >
                Next Page
            </button>
        </div>
    );
};
