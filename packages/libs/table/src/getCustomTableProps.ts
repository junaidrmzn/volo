import { match } from "ts-pattern";
import type { ServerSidePaginationProps } from "./PaginationProps";
import type { RowSelectProps } from "./RowSelectProps";
import type { SortingProps } from "./SortingProps";
import { getDataProperty } from "./utils/getDataProperty";

export const getCustomTableProps = <Data extends object>(
    paginationProps: unknown,
    data: Data[],
    sortingProps: SortingProps,
    rowSelectProps: RowSelectProps<Data>
) => {
    const totalPages = match(paginationProps)
        .with({ hasServerSidePagination: true }, (serverSidePaginationProps: ServerSidePaginationProps<Data>) => {
            return Math.ceil(serverSidePaginationProps.totalItems / serverSidePaginationProps.itemsPerPage);
        })
        .otherwise(() => 1);

    const itemsCount = match(paginationProps)
        .with(
            { hasServerSidePagination: true },
            (serverSidePaginationProps: ServerSidePaginationProps<Data>) => serverSidePaginationProps.totalItems
        )
        .otherwise(() => data.length);

    const paginationInitialState = match(paginationProps)
        .with({ hasServerSidePagination: true }, (serverSidePaginationProps: ServerSidePaginationProps<Data>) => {
            return {
                pageIndex: 0,
                pageSize: serverSidePaginationProps.itemsPerPage,
            };
        })
        .otherwise(() => {
            return {
                pageIndex: 0,
            };
        });

    const sortingTableOptions = sortingProps.isSortable
        ? match(paginationProps)
              .with({ hasServerSidePagination: true }, () => {
                  return {
                      manualPagination: true,
                      pageCount: totalPages,
                      manualSortBy: true,
                      disableMultiSort: true,
                  };
              })
              .otherwise(() => {
                  return { disableMultiSort: true };
              })
        : {};

    const setInitialSelection = () => {
        const { initialSelectAllRows, initialSelectedIds, uniqueIdentifier } = rowSelectProps;
        if (initialSelectAllRows) {
            return Object.fromEntries(data.map((_, currentIndex) => [currentIndex, true]));
        }
        if (initialSelectedIds && uniqueIdentifier) {
            const selectedRowIds: Record<string, boolean> = {};
            for (const [currentIndex, currentEntry] of Object.entries(data)) {
                const currentId = getDataProperty(currentEntry, uniqueIdentifier);
                if (initialSelectedIds.includes(currentId)) selectedRowIds[currentIndex] = true;
            }
            return selectedRowIds;
        }
        return {};
    };

    const initialSelectedRowIds: Record<string, boolean> | undefined = setInitialSelection();

    return { totalPages, itemsCount, paginationInitialState, sortingTableOptions, initialSelectedRowIds };
};
