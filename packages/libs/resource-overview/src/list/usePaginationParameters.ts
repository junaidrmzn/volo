import { useCallback } from "react";
import { useLocalStorageUrlSync } from "@voloiq/routing";

export const usePaginationParameters = (localStorageKey: string) => {
    const { parameters, setParameters } = useLocalStorageUrlSync(localStorageKey);

    const setPage = useCallback(
        (page: number) => {
            setParameters((previous) => ({ ...previous, page: String(page) }));
        },
        [setParameters]
    );

    return { page: Number(parameters.page || 1), setPage };
};
