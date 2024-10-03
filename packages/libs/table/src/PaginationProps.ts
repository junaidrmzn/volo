import type { SortingRule } from "react-table";

export type PaginationProps<Data extends object> = ServerSidePaginationProps<Data> | ClientSidePaginationProps;

export type ClientSidePaginationProps = {
    hasClientSidePagination: true;
    hasServerSidePagination?: never;
    paginationAriaLabel: string;
    previousPageAriaLabel: string;
    nextPageAriaLabel: string;
    itemsPerPage: number;
    isLoading?: never;
    totalItems?: never;
    onFetchData?: never;
};

export type ServerSidePaginationProps<Data extends object> = {
    hasClientSidePagination?: never;
    hasServerSidePagination: true;
    paginationAriaLabel: string;
    previousPageAriaLabel: string;
    nextPageAriaLabel: string;
    itemsPerPage: number;
    isLoading: boolean;
    totalItems: number;
    onFetchData: (itemsPerPage: number, pageIndex: number, sortBy?: SortingRule<Data>[]) => void;
};
