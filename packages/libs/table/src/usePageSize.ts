import { useEffect } from "react";

export const usePageSize = (itemsPerPage: number | undefined, setPageSize: (pageSize: number) => void) => {
    useEffect(() => {
        if (itemsPerPage) {
            setPageSize(itemsPerPage);
        }
    }, [itemsPerPage, setPageSize]);
};
