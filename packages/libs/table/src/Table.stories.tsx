import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import { Icon } from "@volocopter/design-library-react";
import _ from "lodash";
import { useCallback, useRef, useState } from "react";
import type { SortingRule } from "react-table";
import type { ServerSidePaginationProps } from "./PaginationProps";
import type { Column, TableProps } from "./Table";
import { Table } from "./Table";

const meta: Meta = {
    title: "Table/Table",
    component: Table,
};
export default meta;

type CrewMember = {
    name: {
        first: string;
        last: string;
    };
    email: string;
    role: "PILOT" | "PASSENGER";
    isVerified: boolean;
    passportNumber: string;
};

const data: CrewMember[] = [
    {
        name: { first: "Tony", last: "Stark" },
        email: "tony.stark@stark-industries.com",
        role: "PILOT",
        isVerified: true,
        passportNumber: "ABA9875413",
    },
    {
        name: { first: "Natasha", last: "Romanoff" },
        email: "natasha.romanoff@stabby-stab.com",
        role: "PILOT",
        isVerified: true,
        passportNumber: "ABC9877713",
    },
    {
        name: { first: "Bruce", last: "Banner" },
        email: "hulk.banner@the-guy-with-7phds.com",
        role: "PASSENGER",
        isVerified: true,
        passportNumber: "ABD9872213",
    },
    {
        name: { first: "Loki", last: "Laufeyson" },
        email: "loki.laufeyson@god-of-mischief.com",
        role: "PILOT",
        isVerified: true,
        passportNumber: "AEA9815413",
    },
    {
        name: { first: "Thor", last: "Odinson" },
        email: "thundergod@worthy-of-mjollnir.com",
        role: "PASSENGER",
        isVerified: true,
        passportNumber: "ABF9875418",
    },
    {
        name: { first: "Steve", last: "Rogers" },
        email: "captain.america@no-gym-needed.com",
        role: "PILOT",
        isVerified: true,
        passportNumber: "ABG9875477",
    },
    {
        name: { first: "Elon", last: "Musk" },
        email: "elon.musk@the-boring-company.com",
        role: "PASSENGER",
        isVerified: false,
        passportNumber: "AHA9875416",
    },
    {
        name: { first: "Tyr", last: "Odinson" },
        email: "tyr@snack-for-fenris.com",
        role: "PASSENGER",
        isVerified: true,
        passportNumber: "ABK9876413",
    },
];

const columns: Column<CrewMember>[] = [
    { Header: "First Name", accessor: (data) => data.name.first, id: "name.first" },
    { Header: "Last Name", accessor: (data) => data.name.last, id: "name.last" },
    { Header: "E-Mail", accessor: "email" },
    { Header: "Role", accessor: "role" },
    {
        Header: "Verified",
        accessor: "isVerified",
        Cell: (cell) => {
            const { value } = cell;
            return <Icon icon={value ? "check" : "xMark"} />;
        },
    },
];

const sort = (sortBy: SortingRule<CrewMember>[], data: CrewMember[]) => {
    return _.orderBy(
        data,
        sortBy.map((sortingRule) => sortingRule.id),
        sortBy.map((sortingRule) => (sortingRule.desc ? "desc" : "asc"))
    );
};

export const Basic: StoryFn<TableProps<CrewMember>> = (props) => <Table {...props} data={data} columns={columns} />;

export const SortableTable = Basic.bind({});
SortableTable.args = {
    sortingProps: { isSortable: true },
};

export const TableWithSelectableRows = Basic.bind({});
TableWithSelectableRows.args = {
    rowSelectProps: {
        toggleAllRowsSelectLabel: "toggle all",
        toggleRowSelectLabel: "toggle row",
        isRowSelectable: true,
        onRowSelect: action("onRowSelect"),
    },
};

export const TableWithAllRowsPreselected = Basic.bind({});
TableWithAllRowsPreselected.args = {
    rowSelectProps: {
        toggleAllRowsSelectLabel: "toggle all",
        toggleRowSelectLabel: "toggle row",
        isRowSelectable: true,
        onRowSelect: action("onRowSelect"),
        initialSelectAllRows: true,
    },
};

export const TableWithSomeRowsPreselected = Basic.bind({});
TableWithSomeRowsPreselected.args = {
    rowSelectProps: {
        toggleAllRowsSelectLabel: "toggle all",
        toggleRowSelectLabel: "toggle row",
        isRowSelectable: true,
        onRowSelect: action("onRowSelect"),
        initialSelectedIds: ["ABD9872213", "ABK9876413", "ABG9875477"],
        uniqueIdentifier: "passportNumber",
    },
};

export const TableWithServerSidePagination: StoryFn<TableProps<CrewMember>> = (props) => {
    const [tabledata, setTableData] = useState<CrewMember[]>([]);
    const [loading, setLoading] = useState(false);
    const pendingTimeoutIdRef = useRef<number | undefined>(undefined);
    const [unsortedCopy] = useState({ ...data });
    const { paginationProps } = props;

    const fetchData = useCallback(
        (pageSize: number, pageIndex: number, sortBy?: SortingRule<CrewMember>[]) => {
            const { current: pendingTimeoutId } = pendingTimeoutIdRef;
            if (pendingTimeoutId !== undefined) {
                window.clearTimeout(pendingTimeoutId);
            }
            setLoading(true);

            const sortData = sort(sortBy || [], unsortedCopy);
            paginationProps?.onFetchData?.(pageSize, pageIndex, sortBy);

            pendingTimeoutIdRef.current = window.setTimeout(() => {
                const startRow = pageSize * pageIndex;
                const endRow = startRow + pageSize;

                setTableData(sortData.slice(startRow, endRow));
                setLoading(false);
                pendingTimeoutIdRef.current = undefined;
            }, 1000);
        },
        [paginationProps, unsortedCopy]
    );

    const serverSidePaginationProps: ServerSidePaginationProps<CrewMember> = {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        ...(paginationProps as ServerSidePaginationProps<CrewMember>),
        isLoading: loading,
        onFetchData: fetchData,
    };

    return <Table {...props} data={tabledata} columns={columns} paginationProps={serverSidePaginationProps} />;
};

TableWithServerSidePagination.args = {
    rowSelectProps: {
        isRowSelectable: true,
        toggleAllRowsSelectLabel: "toggle all",
        toggleRowSelectLabel: "toggle row",
        onRowSelect: action("onRowSelect"),
    },
    sortingProps: { isSortable: true },
    paginationProps: {
        hasServerSidePagination: true,
        isLoading: false,
        itemsPerPage: 3,
        nextPageAriaLabel: "Next",
        previousPageAriaLabel: "Previous",
        paginationAriaLabel: "Pagination",
        onFetchData: action("onFetchData"),
        totalItems: data.length,
    },
};

export const TableWithClientSidePagination = Basic.bind({});
TableWithClientSidePagination.args = {
    paginationProps: {
        hasClientSidePagination: true,
        itemsPerPage: 3,
        nextPageAriaLabel: "Next",
        previousPageAriaLabel: "Previous",
        paginationAriaLabel: "Pagination",
    },
    rowSelectProps: {
        toggleAllRowsSelectLabel: "toggle all",
        toggleRowSelectLabel: "toggle row",
        isRowSelectable: true,
        onRowSelect: action("onRowSelect"),
    },
    sortingProps: { isSortable: true },
};
