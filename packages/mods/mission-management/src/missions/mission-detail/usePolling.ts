import { useEffect } from "react";

export const usePolling = <T>(fetchData: () => Promise<T | undefined>, interval: number) => {
    useEffect(() => {
        fetchData();

        const intervalId = setInterval(fetchData, interval);

        return () => {
            clearInterval(intervalId);
        };
    }, [fetchData, interval]);
};
