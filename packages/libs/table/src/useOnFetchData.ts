import { useEffect } from "react";
import type { SortingRule } from "react-table";

export const useOnFetchData = <Data extends object>(
    onFetchData: (itemsPerPage: number, pageIndex: number, sortBy?: SortingRule<Data>[]) => void,
    itemsPerPage: number | undefined,
    pageIndex: number,
    hasServerSidePagination: boolean,
    sortBy?: SortingRule<Data>[]
) => {
    useEffect(() => {
        if (hasServerSidePagination && itemsPerPage) {
            onFetchData(itemsPerPage, pageIndex, sortBy || []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onFetchData, pageIndex, itemsPerPage, hasServerSidePagination, JSON.stringify(sortBy)]);
};
