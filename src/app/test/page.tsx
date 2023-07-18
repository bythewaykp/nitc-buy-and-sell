export default async () => {
    let pageParam = 1;
    let email = "keerthi";
    let dat = await fetch(
        process.env.URL + `/api/items?pageParam=${pageParam}&email=${email}`,
        {
            cache: "no-cache",
        }
    );

    return <div>hey</div>;
};
