import type { Column } from "react-table";
import { render, screen, userEvent, waitFor, within } from "@voloiq/testing";
import type { ClientSidePaginationProps, ServerSidePaginationProps } from "./PaginationProps";
import type { TableProps } from "./Table";
import { Table } from "./Table";

type CrewMember = {
    passportNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "PILOT" | "PASSENGER";
};

const header = "First Name";
const column: Column<CrewMember> = { accessor: "firstName", Header: header };
const crewMembers: CrewMember[] = [
    {
        passportNumber: "ABD2323245",
        firstName: "Tony",
        lastName: "Stark",
        email: "tony.stark@stark-industries.com",
        role: "PILOT",
    },
    {
        passportNumber: "ABF5656567",
        firstName: "Natasha",
        lastName: "Romanoff",
        email: "natasha.romanoff@stabby-stab.com",
        role: "PILOT",
    },
    {
        passportNumber: "GRE94568534",
        firstName: "Bruce",
        lastName: "Banner",
        email: "hulk.banner@the-guy-with-7phds.com",
        role: "PASSENGER",
    },
    {
        passportNumber: "IRE9338534",
        firstName: "Elon",
        lastName: "Musk",
        email: "elon.musk@the-boring-company.com",
        role: "PASSENGER",
    },
];

const toggleAllRowsSelectLabel = "toggle all";
const toggleRowSelectLabel = "toggle row";

const tableProps: TableProps<CrewMember> = {
    columns: [column],
    data: crewMembers,
    rowSelectProps: {
        toggleAllRowsSelectLabel,
        toggleRowSelectLabel,
        isRowSelectable: true,
    },
};

const clientSidePaginationProps: ClientSidePaginationProps = {
    hasClientSidePagination: true,
    paginationAriaLabel: "Pagination Example",
    nextPageAriaLabel: "Next",
    previousPageAriaLabel: "Previous",
    itemsPerPage: 1,
};

const serverSidePaginationProps: ServerSidePaginationProps<CrewMember> = {
    hasServerSidePagination: true,
    paginationAriaLabel: "Pagination Example",
    nextPageAriaLabel: "Next",
    previousPageAriaLabel: "Previous",
    itemsPerPage: 1,
    onFetchData: jest.fn(),
    isLoading: false,
    totalItems: crewMembers.length,
};

describe("Table", () => {
    it("displays column with data", () => {
        render(<Table {...tableProps} />);
        const columnheaders = screen.getAllByRole("columnheader");
        expect(columnheaders[0]).toContainElement(screen.getByTitle(toggleAllRowsSelectLabel));
        expect(columnheaders[1]).toHaveTextContent(header);
        const cells = screen.getAllByRole("cell");
        expect(within(cells[0]!).getByTitle(toggleRowSelectLabel)).toBeInTheDocument();
        expect(cells[1]).toHaveTextContent("Tony");
    });

    it("selects all row when the header checkbox is clicked", () => {
        render(<Table {...tableProps} />);
        const headerCheckbox = screen.getByTitle(toggleAllRowsSelectLabel);
        const checkboxes = screen.getAllByTitle(toggleRowSelectLabel);

        expect(headerCheckbox).toBeInTheDocument();
        expect(headerCheckbox).not.toHaveAttribute("data-checked");
        for (const box of checkboxes) {
            expect(box).toBeInTheDocument();
            expect(box).not.toHaveAttribute("data-checked");
        }
        userEvent.click(headerCheckbox);

        expect(headerCheckbox).toHaveAttribute("data-checked");
        for (const box of checkboxes) {
            expect(box).toHaveAttribute("data-checked");
        }
    });

    it("selects one row when one body checkbox is clicked", () => {
        render(<Table {...tableProps} />);
        const headerCheckbox = screen.getByTitle(toggleAllRowsSelectLabel);
        const headerCheckboxControl = headerCheckbox.lastElementChild;
        const checkboxes = screen.getAllByTitle(toggleRowSelectLabel);
        const firstCheckbox = checkboxes[0];
        const secondCheckBox = checkboxes[1];

        expect(headerCheckbox).not.toHaveAttribute("data-checked");
        expect(headerCheckboxControl).not.toHaveAttribute("data-indeterminate");
        expect(firstCheckbox).not.toHaveAttribute("data-checked");
        expect(secondCheckBox).not.toHaveAttribute("data-checked");

        if (firstCheckbox) {
            userEvent.click(firstCheckbox);
        }

        expect(headerCheckbox).not.toHaveAttribute("data-checked");
        expect(headerCheckboxControl).toHaveAttribute("data-indeterminate");
        expect(firstCheckbox).toHaveAttribute("data-checked");
        expect(secondCheckBox).not.toHaveAttribute("data-checked");
    });

    it("selects all checkboxes when all body checkboxes are clicked", () => {
        render(<Table {...tableProps} data={crewMembers.slice(0, 2)} />);
        const headerCheckbox = screen.getByTitle(toggleAllRowsSelectLabel);
        const checkboxes = screen.getAllByTitle(toggleRowSelectLabel);
        const firstCheckbox = checkboxes[0];
        const secondCheckBox = checkboxes[1];

        expect(headerCheckbox).not.toHaveAttribute("data-checked");
        expect(firstCheckbox).not.toHaveAttribute("data-checked");
        expect(secondCheckBox).not.toHaveAttribute("data-checked");

        if (firstCheckbox && secondCheckBox) {
            userEvent.click(firstCheckbox);
            userEvent.click(secondCheckBox);
        }

        expect(headerCheckbox).toHaveAttribute("data-checked");
        expect(firstCheckbox).toHaveAttribute("data-checked");
        expect(secondCheckBox).toHaveAttribute("data-checked");
    });

    it("invokes onClick callback", () => {
        const onClick = jest.fn();
        render(
            <Table
                {...tableProps}
                rowSelectProps={{
                    toggleAllRowsSelectLabel,
                    toggleRowSelectLabel,
                    isRowSelectable: true,
                    onRowSelect: onClick,
                }}
            />
        );

        const checkbox = screen.getAllByTitle(toggleAllRowsSelectLabel)[0];
        expect(onClick).not.toHaveBeenCalled();
        if (checkbox) {
            userEvent.click(checkbox);
        }
        expect(onClick).toHaveBeenCalled();
    });

    it("displays a table without checkboxes", () => {
        render(<Table columns={[column]} data={crewMembers.slice(0, 2)} rowSelectProps={{ isRowSelectable: false }} />);
        const columnheader = screen.getByRole("columnheader");
        expect(columnheader).toHaveTextContent(header);
        const firstCell = screen.getAllByRole("cell")[0];
        const secondCell = screen.getAllByRole("cell")[1];
        expect(firstCell).toHaveTextContent("Tony");
        expect(secondCell).toHaveTextContent("Natasha");
    });
    it("displays a table with client-side pagination and updates the displayed data when the next/previous button is clicked", () => {
        render(<Table columns={[column]} data={crewMembers.slice(0, 2)} paginationProps={clientSidePaginationProps} />);

        const previousButton = screen.getByRole("button", { name: "Previous" });
        const nextButton = screen.getByRole("button", { name: "Next" });
        expect(previousButton).toBeDisabled();
        expect(nextButton).toBeEnabled();
        const cellBeforeClick = screen.getByRole("cell");
        expect(cellBeforeClick).toHaveTextContent("Tony");

        userEvent.click(nextButton);

        expect(previousButton).toBeEnabled();
        expect(nextButton).toBeDisabled();
        const cellAfterFirstClick = screen.getByRole("cell");
        expect(cellAfterFirstClick).toHaveTextContent("Natasha");

        userEvent.click(previousButton);

        expect(nextButton).toBeEnabled();
        expect(previousButton).toBeDisabled();
        const cellAfterSecondClick = screen.getByRole("cell");
        expect(cellAfterSecondClick).toHaveTextContent("Tony");
    });

    it("displays a table with client-side pagination and updates the displayed data when a navigation item is clicked", () => {
        render(<Table columns={[column]} data={crewMembers} paginationProps={clientSidePaginationProps} />);

        const navItem1 = screen.getByRole("button", { name: "1" });
        const navItem2 = screen.getByRole("button", { name: "2" });
        const navItem3 = screen.getByRole("button", { name: "3" });
        const cellBeforeClick = screen.getByRole("cell");
        expect(cellBeforeClick).toHaveTextContent("Tony");

        expect(navItem1).toHaveAttribute("aria-current", "true");
        expect(navItem2).not.toHaveAttribute("aria-current");
        expect(navItem3).not.toHaveAttribute("aria-current");

        userEvent.click(navItem3);

        expect(navItem3).toHaveAttribute("aria-current", "true");
        expect(navItem1).not.toHaveAttribute("aria-current");
        expect(navItem2).not.toHaveAttribute("aria-current");

        const cellAfterFirstClick = screen.getByRole("cell");
        expect(cellAfterFirstClick).toHaveTextContent("Bruce");

        userEvent.click(navItem2);

        expect(navItem2).toHaveAttribute("aria-current", "true");
        expect(navItem1).not.toHaveAttribute("aria-current");
        expect(navItem3).not.toHaveAttribute("aria-current");

        const cellAfterSecondClick = screen.getByRole("cell");
        expect(cellAfterSecondClick).toHaveTextContent("Natasha");
    });

    describe("with server-side pagination", () => {
        it("displays the loadingspinner if isLoading is true", () => {
            render(
                <Table
                    columns={[column]}
                    data={crewMembers}
                    paginationProps={{ ...serverSidePaginationProps, isLoading: true }}
                />
            );

            expect(screen.getByText("Loading...")).toBeInTheDocument();
        });

        it("invokes the fetchData callback when the next/previous button is clicked", async () => {
            const { onFetchData } = serverSidePaginationProps;

            render(<Table columns={[column]} data={crewMembers} paginationProps={serverSidePaginationProps} />);

            const previousButton = screen.getByTitle("Previous");
            const nextButton = screen.getByTitle("Next");

            expect(nextButton).toBeEnabled();
            expect(previousButton).toBeDisabled();

            userEvent.click(nextButton);
            await waitFor(() => {
                expect(onFetchData).toHaveBeenCalledWith(1, 1, []);
            });

            userEvent.click(previousButton);
            await waitFor(() => {
                expect(onFetchData).toHaveBeenCalledWith(1, 0, []);
            });
        });

        it("checks if the table has the right amount of pages", async () => {
            render(<Table columns={[column]} data={crewMembers} paginationProps={serverSidePaginationProps} />);

            expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
            expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
        });
    });

    it("invokes the fetchData callback with sorting rules when the column header is clicked", () => {
        const { onFetchData } = serverSidePaginationProps;
        render(
            <Table
                columns={[column]}
                data={crewMembers}
                paginationProps={serverSidePaginationProps}
                sortingProps={{ isSortable: true }}
            />
        );

        const columnheader = screen.getByRole("columnheader");

        userEvent.click(columnheader);

        expect(onFetchData).toHaveBeenCalledWith(1, 0, [{ id: "firstName", desc: false }]);
    });

    it("displays the column data in ascending order when column header is clicked", () => {
        render(<Table columns={[column]} data={crewMembers} sortingProps={{ isSortable: true }} />);
        const columnheader = screen.getByRole("columnheader");

        userEvent.click(columnheader);

        const cells = screen.getAllByRole("cell");
        expect(cells[0]).toHaveTextContent("Bruce");
        expect(cells[1]).toHaveTextContent("Elon");
        expect(cells[2]).toHaveTextContent("Natasha");
        expect(cells[3]).toHaveTextContent("Tony");
    });

    it("displays the column data in descending order when column header is clicked twice", () => {
        render(<Table columns={[column]} data={crewMembers} sortingProps={{ isSortable: true }} />);
        const columnheader = screen.getByRole("columnheader");

        userEvent.click(columnheader);
        userEvent.click(columnheader);

        const cells = screen.getAllByRole("cell");
        expect(cells[0]).toHaveTextContent("Tony");
        expect(cells[1]).toHaveTextContent("Natasha");
        expect(cells[2]).toHaveTextContent("Elon");
        expect(cells[3]).toHaveTextContent("Bruce");
    });

    it("displays the table with all rows selected initially", () => {
        render(
            <Table
                columns={[column]}
                data={crewMembers}
                rowSelectProps={{
                    isRowSelectable: true,
                    toggleRowSelectLabel: "toggle row",
                    toggleAllRowsSelectLabel: "toggle all",
                    initialSelectAllRows: true,
                }}
            />
        );

        const headerCheckbox = screen.getByTitle(toggleAllRowsSelectLabel);
        const rowCheckboxes = screen.getAllByTitle(toggleRowSelectLabel);

        expect(headerCheckbox).toHaveAttribute("data-checked");
        for (const checkbox of rowCheckboxes) {
            expect(checkbox).toHaveAttribute("data-checked");
        }
    });

    it("displays the table with two rows selected initially", () => {
        render(
            <Table
                columns={[column]}
                data={crewMembers}
                rowSelectProps={{
                    isRowSelectable: true,
                    toggleRowSelectLabel: "toggle row",
                    toggleAllRowsSelectLabel: "toggle all",
                    initialSelectedIds: ["ABF5656567", "IRE9338534"],
                    uniqueIdentifier: "passportNumber",
                }}
            />
        );

        const headerCheckbox = screen.getByTitle(toggleAllRowsSelectLabel);
        const [first, second, third, fourth] = screen.getAllByTitle(toggleRowSelectLabel);
        const checkboxesChecked = [second, fourth];
        const checkboxesUnchecked = [first, third];

        expect(headerCheckbox).not.toHaveAttribute("data-checked");
        for (const checkbox of checkboxesChecked) {
            expect(checkbox).toHaveAttribute("data-checked");
        }
        for (const checkbox of checkboxesUnchecked) {
            expect(checkbox).not.toHaveAttribute("data-checked");
        }
    });
});
