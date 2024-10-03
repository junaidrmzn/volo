import {
    Box,
    Center,
    Table as ChakraTable,
    ErrorBoundary,
    Flex,
    Pagination,
    SortIcon,
    Spinner,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@volocopter/design-library-react";
import type { CellProps, ColumnDefinition, HeaderProps } from "react-table";
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import type { PaginationProps } from "./PaginationProps";
import type { RowSelectProps } from "./RowSelectProps";
import { defaultRowSelectProps } from "./RowSelectProps";
import { SelectableCheckbox } from "./SelectableCheckbox";
import type { SortingProps } from "./SortingProps";
import { defaultSortingProps } from "./SortingProps";
import { getCustomTableProps } from "./getCustomTableProps";
import { useOnFetchData } from "./useOnFetchData";
import { useOnRowSelect } from "./useOnRowSelect";
import { usePageSize } from "./usePageSize";

export type Column<Data extends object> = ColumnDefinition<Data>;

export type TableProps<Data extends object> = {
    data: Data[];
    columns: Column<Data>[];
    rowSelectProps?: RowSelectProps<Data>;
    paginationProps?: PaginationProps<Data>;
    sortingProps?: SortingProps;
};

export const Table = <Data extends object>(props: TableProps<Data>) => {
    const {
        data,
        columns,
        rowSelectProps = defaultRowSelectProps,
        paginationProps,
        sortingProps = defaultSortingProps,
    } = props;

    const { totalPages, itemsCount, paginationInitialState, sortingTableOptions, initialSelectedRowIds } =
        getCustomTableProps(paginationProps, data, sortingProps, rowSelectProps);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        setPageSize,
        gotoPage,
        state: { pageIndex, sortBy },
        prepareRow,
        selectedFlatRows,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                selectedRowIds: initialSelectedRowIds,
                ...paginationInitialState,
            },
            ...sortingTableOptions,
        },
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            if (rowSelectProps.isRowSelectable) {
                hooks.visibleColumns.push((allColumns) => [
                    {
                        id: "selection",
                        Header: (headerProps: HeaderProps<Data>) => {
                            const { getToggleAllRowsSelectedProps } = headerProps;
                            return (
                                <SelectableCheckbox
                                    {...getToggleAllRowsSelectedProps()}
                                    title={rowSelectProps.toggleAllRowsSelectLabel}
                                />
                            );
                        },
                        Cell: (cellProps: CellProps<Data>) => {
                            const { row } = cellProps;
                            return (
                                <SelectableCheckbox
                                    {...row.getToggleRowSelectedProps()}
                                    title={rowSelectProps.toggleRowSelectLabel}
                                />
                            );
                        },
                    },
                    ...allColumns,
                ]);
            }
        }
    );

    useOnFetchData(
        paginationProps?.onFetchData ?? (() => null),
        paginationProps?.itemsPerPage ?? 0,
        pageIndex,
        paginationProps?.hasServerSidePagination ?? false,
        sortBy
    );

    useOnRowSelect(selectedFlatRows, rowSelectProps.onRowSelect);

    usePageSize(paginationProps?.itemsPerPage ?? 0, setPageSize);

    return (
        <ErrorBoundary>
            {paginationProps && paginationProps.isLoading ? (
                <Center>
                    <Spinner />
                </Center>
            ) : (
                <Box>
                    <ChakraTable {...getTableProps()}>
                        <Thead>
                            {headerGroups.map((headerGroup) => (
                                <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
                                    {headerGroup.headers.map((column) => (
                                        <Th
                                            {...column.getHeaderProps(
                                                sortingProps.isSortable ? column.getSortByToggleProps() : undefined
                                            )}
                                            key={column.getHeaderProps().key}
                                            title={column.Header?.toString()}
                                        >
                                            <Flex alignItems="center">
                                                {column.render("Header")}
                                                {column.id !== "selection" &&
                                                sortingProps.isSortable &&
                                                !column.disableSortBy ? (
                                                    column.isSorted ? (
                                                        column.isSortedDesc ? (
                                                            <SortIcon sortDirection="DESC" />
                                                        ) : (
                                                            <SortIcon sortDirection="ASC" />
                                                        )
                                                    ) : (
                                                        <SortIcon />
                                                    )
                                                ) : null}
                                            </Flex>
                                        </Th>
                                    ))}
                                </Tr>
                            ))}
                        </Thead>
                        <Tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <Tr {...row.getRowProps()} key={row.getRowProps().key} isSelected={row.isSelected}>
                                        {row.cells.map((cell) => (
                                            <Td {...cell.getCellProps()} key={cell.getCellProps().key}>
                                                {cell.render("Cell")}
                                            </Td>
                                        ))}
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </ChakraTable>
                    {paginationProps && ((totalPages && totalPages > 1) || paginationProps.hasClientSidePagination) && (
                        <Pagination
                            mt={6}
                            ariaLabel={paginationProps.paginationAriaLabel}
                            nextPageAriaLabel={paginationProps.nextPageAriaLabel}
                            previousPageAriaLabel={paginationProps.previousPageAriaLabel}
                            currentPage={pageIndex + 1}
                            totalItems={itemsCount}
                            onCurrentPageChange={(newPage) => {
                                gotoPage(newPage - 1);
                            }}
                            itemsPerPage={paginationProps.itemsPerPage}
                        />
                    )}
                </Box>
            )}
        </ErrorBoundary>
    );
};
