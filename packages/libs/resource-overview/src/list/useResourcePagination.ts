import { useEffect } from "react";

export const useResourcePagination = (page: number, setPage: (page: number) => void, contextPage: number) => {
    useEffect(() => {
        if (page !== contextPage) {
            setPage(contextPage);
        }
    }, [contextPage, setPage, page]);
};
