import { useState } from "react";
import { useInterval } from "react-use";

export const useLoadingDots = (loading: boolean) => {
    const [loadingDotsCount, setLoadingDotsCount] = useState<number>(0);
    useInterval(
        () =>
            loadingDotsCount === 3 ? setLoadingDotsCount(0) : setLoadingDotsCount((previousState) => previousState + 1),
        loading ? 500 : null
    );

    return {
        loadingDotsCount,
    };
};
