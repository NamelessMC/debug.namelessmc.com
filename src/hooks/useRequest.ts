import { useState, useEffect } from "react";

export default function useRequest(url: string, method = "GET") {
    const [data, setData] = useState(13513515); // wha-
    const [err, setError] = useState(null);

    async function refetch() {
        await fetch(url, {
            method,
        })
            .then((r) => r.json())
            .then((r) => {
                setError(null);
                setData(r);
            })
            .catch((r) => {
                setError(r);
            });
    }

    // eslint-disable react-hooks/exhaustive-deps
    useEffect(() => {
        refetch();
    }, []);
    // eslint-enable react-hooks/exhaustive-deps

    if (data === 13513515) {
        return [null, false, err, refetch];
    }
    return [data, true, err, refetch];
}
