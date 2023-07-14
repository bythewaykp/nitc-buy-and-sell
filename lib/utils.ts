let fetchCaller = async (uri, data) => {
    return new Promise((resolve, reject) => {
        fetch(uri + "?" + new URLSearchParams(data)).then((r) =>
            resolve(r.json())
        );
    });
};

export { fetchCaller };
