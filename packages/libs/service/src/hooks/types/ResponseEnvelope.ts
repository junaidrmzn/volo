import type { Error } from "../../error/error";

export type ResponseEnvelope<TData> = {
    data?: TData;
    error?: Error;
    pagination?: Pagination;
    meta?: TData;
};

/* ToDo: https://jira.volocopter.org/browse/SWARCH-38
 *  At the moment this type supports the old pagination approach using offset/limit
 *  as well as the new one using page/size:
 *  Clean this up once everyone has changed to new pagination
 */
export type OffsetBasedPagination = {
    total: number;
    limit: number;
    offset: number;
};

export type SizeBasedPagination = {
    page: number;
    size: number;
    totalPages: number;
    totalElements?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isOffsetBasedPagination = (pagination: any): pagination is OffsetBasedPagination => {
    return (
        pagination &&
        typeof pagination.total === "number" &&
        typeof pagination.limit === "number" &&
        typeof pagination.offset === "number"
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSizeBasedPagination = (pagination: any): pagination is SizeBasedPagination => {
    return (
        pagination &&
        typeof pagination.page === "number" &&
        typeof pagination.size === "number" &&
        typeof pagination.totalPages === "number"
    );
};

export type Pagination = OffsetBasedPagination | SizeBasedPagination;
