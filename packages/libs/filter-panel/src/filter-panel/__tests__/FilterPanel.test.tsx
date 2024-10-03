import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, ThemeProvider } from "@volocopter/design-library-react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useFilterParams } from "../../useFilterParams";
import { FilterPanel } from "../FilterPanel";
import type { FilterProps, FilterSet } from "../FilterPanelTypes";

type TestType = {
    selectStuff1: string;
};

type FilterPanelTemplateProps = {
    filters: FilterProps<TestType>[];
    closeSideMenu: Function;
    setFilterSetMock: (filterSet: FilterSet<TestType>) => void;
    initFilterSet?: FilterSet<TestType>;
};

const setItemMock = jest.spyOn(Storage.prototype, "setItem");
const getItemMock = jest.spyOn(Storage.prototype, "getItem");

const FilterPanelTemplate = (props: FilterPanelTemplateProps) => {
    const { closeSideMenu, filters, setFilterSetMock, initFilterSet = { filters: [] } } = props;

    const [filterSet, setFilterSet] = useState<FilterSet<TestType>>(initFilterSet);

    useFilterParams<TestType>(filters, filterSet, setFilterSet, "testFilterSet");

    const onChange = (filterSet: FilterSet<TestType>) => {
        setFilterSet(filterSet);
        setFilterSetMock(filterSet);
    };

    return (
        <>
            <Button onClick={() => setFilterSet({ filters: [] })}>empty filterSet</Button>
            <FilterPanel
                filters={filters}
                onChange={onChange}
                applyButtonLabel="Apply"
                cancelButtonLabel="Cancel"
                title="Filter"
                onCancel={() => closeSideMenu(false)}
                onClose={() => closeSideMenu(false)}
                backButtonAriaLabel="Back"
                activeFilterSet={filterSet}
                filterTagListAriaLabel="Filter Tag List"
            />
        </>
    );
};

const FilterPanelWrapper = (props: FilterPanelTemplateProps) => (
    <ThemeProvider>
        <BrowserRouter>
            <FilterPanelTemplate {...props} />
        </BrowserRouter>
    </ThemeProvider>
);

afterEach(() => {
    getItemMock.mockReset();
    setItemMock.mockReset();
});

test("User can type number, apply it and see the filter tag as a cause of the resulting filter object", async () => {
    const closeSideMenu = jest.fn();
    const setFilterSet = jest.fn();

    const filters: FilterProps<TestType>[] = [
        {
            type: "number",
            propertyName: "numberStuff1",
            displayName: "Number Test",
        },
    ];

    render(<FilterPanelWrapper filters={filters} closeSideMenu={closeSideMenu} setFilterSetMock={setFilterSet} />);

    const submitButton = screen.getByRole("button", { name: /apply/i });
    const numberInput = screen.getByRole("spinbutton", { name: "Number Test" });

    fireEvent.change(numberInput, { target: { value: 123 } });
    userEvent.click(submitButton);
    await screen.findByText(/number test: 123/i);

    expect(setFilterSet).toHaveBeenCalled();
    expect(screen.getByText(/number test: 123/i)).toBeInTheDocument();
});

test("User can type a number, apply it and remove the filter by clicking on the filter tag", async () => {
    const closeSideMenu = jest.fn();
    const setFilterSet = jest.fn();

    const filters: FilterProps<TestType>[] = [
        {
            type: "number",
            propertyName: "numberStuff1",
            displayName: "Number Test",
        },
    ];

    render(<FilterPanelWrapper filters={filters} closeSideMenu={closeSideMenu} setFilterSetMock={setFilterSet} />);
    const submitButton = screen.getByRole("button", { name: /apply/i });
    const numberInput = screen.getByRole("spinbutton", { name: "Number Test" });

    fireEvent.change(numberInput, { target: { value: 123 } });
    userEvent.click(submitButton);
    await screen.findByText(/number test: 123/i);

    userEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(screen.queryByText(/number test: 123/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/123/i)).not.toBeInTheDocument();
});

test("User can select a filter option, apply it and see the filter tag as a cause of the resulting filter object", async () => {
    const closeSideMenu = jest.fn();
    const setFilterSet = jest.fn();

    const filters: FilterProps<TestType>[] = [
        {
            type: "select",
            propertyName: "selectStuff1",
            options: [
                { label: "VC", value: "VC" },
                { label: "VD", value: "VD" },
            ],
            displayName: "Select Test",
        },
    ];

    render(<FilterPanelWrapper filters={filters} closeSideMenu={closeSideMenu} setFilterSetMock={setFilterSet} />);

    const submitButton = screen.getByRole("button", { name: /apply/i });
    const select = screen.getByRole("combobox", { name: "Select Test" });

    userEvent.click(select);
    userEvent.click(screen.getByRole("button", { name: "VC" }));
    userEvent.click(submitButton);
    await screen.findByText(/select test: vc/i);

    expect(setFilterSet).toHaveBeenCalled();
    expect(screen.getByText(/select test: vc/i)).toBeInTheDocument();
});

test("User can select a filter option, apply it and remove the filter by clicking on the filter tag", async () => {
    const closeSideMenu = jest.fn();
    const setFilterSet = jest.fn();

    const filters: FilterProps<TestType>[] = [
        {
            type: "select",
            propertyName: "selectStuff1",
            options: [
                { label: "VC", value: "VC" },
                { label: "VD", value: "VD" },
            ],
            displayName: "Select Test",
        },
    ];

    render(<FilterPanelWrapper filters={filters} closeSideMenu={closeSideMenu} setFilterSetMock={setFilterSet} />);

    const submitButton = screen.getByRole("button", { name: /apply/i });
    const select = screen.getByRole("combobox", { name: "Select Test" });

    userEvent.click(select);
    userEvent.click(screen.getByRole("button", { name: "VC" }));
    userEvent.click(submitButton);
    await screen.findByText(/select test: vc/i);

    userEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(screen.queryByText(/select test: vc/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/vc/i)).not.toBeInTheDocument();
});

test("User can add a filter, remove it by clicking on the filter tag and bring it back by clicking cancel", async () => {
    const closeSideMenu = jest.fn();
    const setFilterSet = jest.fn();

    const filters: FilterProps<TestType>[] = [
        {
            type: "select",
            propertyName: "selectStuff1",
            options: [
                { label: "VC", value: "VC" },
                { label: "VD", value: "VD" },
            ],
            displayName: "Select Test",
        },
    ];

    render(<FilterPanelWrapper filters={filters} closeSideMenu={closeSideMenu} setFilterSetMock={setFilterSet} />);

    const submitButton = screen.getByRole("button", { name: /apply/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    const select = screen.getByRole("combobox", { name: "Select Test" });

    userEvent.click(select);
    userEvent.click(screen.getByRole("button", { name: "VC" }));
    userEvent.click(submitButton);
    await screen.findByText(/select test: vc/i);

    userEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(screen.queryByText(/select test: vc/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/vc/i)).not.toBeInTheDocument();

    userEvent.click(cancelButton);

    await screen.findByText(/select test: vc/i);
    expect(screen.getByText("VC")).toBeInTheDocument();
    expect(closeSideMenu).toHaveBeenCalled();
});

test("User can provide and see initial filterSet", async () => {
    const closeSideMenu = jest.fn();
    const setFilterSet = jest.fn();

    const filters: FilterProps<TestType>[] = [
        {
            type: "select",
            propertyName: "selectStuff1",
            options: [
                { label: "VC", value: "VC" },
                { label: "VD", value: "VD" },
            ],
            displayName: "Select Test",
        },
    ];

    const initFilterSet: FilterSet<TestType> = {
        filters: [
            {
                type: "select",
                displayName: "Select Test",
                value: { label: "VC", value: "VC" },
                propertyName: "selectStuff1",
                isActive: true,
            },
        ],
    };

    render(
        <FilterPanelWrapper
            filters={filters}
            closeSideMenu={closeSideMenu}
            setFilterSetMock={setFilterSet}
            initFilterSet={initFilterSet}
        />
    );

    await screen.findByText(/select test: vc/i);
    expect(screen.getByText("VC")).toBeInTheDocument();
});

test("User can modify filterSet in parent component and the filter panel will sync to changes", async () => {
    const closeSideMenu = jest.fn();
    const setFilterSet = jest.fn();

    const filters: FilterProps<TestType>[] = [
        {
            type: "select",
            propertyName: "selectStuff1",
            options: [
                { label: "VC", value: "VC" },
                { label: "VD", value: "VD" },
            ],
            displayName: "Select Test",
        },
    ];

    render(<FilterPanelWrapper filters={filters} closeSideMenu={closeSideMenu} setFilterSetMock={setFilterSet} />);

    const submitButton = screen.getByRole("button", { name: /apply/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    const select = screen.getByRole("combobox", { name: "Select Test" });

    userEvent.click(select);
    userEvent.click(screen.getByRole("button", { name: "VC" }));
    userEvent.click(submitButton);
    await screen.findByText(/select test: vc/i);

    userEvent.click(screen.getByRole("button", { name: /empty filterset/i }));

    await waitFor(() => expect(screen.queryByText(/select test: vc/i)).not.toBeInTheDocument());

    expect(screen.queryByText(/vc/i)).not.toBeInTheDocument();

    userEvent.click(cancelButton);

    expect(screen.queryByText(/select test: vc/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/vc/i)).not.toBeInTheDocument();
});

test("The user gets initial filters when he specifies them in the URL", async () => {
    const closeSideMenu = jest.fn();
    const setFilterSet = jest.fn();

    const filters: FilterProps<TestType>[] = [
        {
            type: "select",
            propertyName: "selectStuff1",
            options: [
                { label: "VC", value: "VC" },
                { label: "VD", value: "VD" },
            ],
            displayName: "Select Test",
        },
    ];

    window.history.pushState({}, "", "/?select-selectStuff1=VD");
    render(<FilterPanelWrapper filters={filters} closeSideMenu={closeSideMenu} setFilterSetMock={setFilterSet} />);

    await waitFor(() => expect(screen.getByText(/select test: vd/i)).toBeVisible());

    window.history.pushState({}, "", "/?select-selectStuff1=VC");
    render(<FilterPanelWrapper filters={filters} closeSideMenu={closeSideMenu} setFilterSetMock={setFilterSet} />);

    await waitFor(() => expect(screen.getByText(/select test: vc/i)).toBeVisible());
});

test("FilterSet is set from url parameters", async () => {
    const closeSideMenu = jest.fn();
    const setFilterSet = jest.fn();

    const filters: FilterProps<TestType>[] = [
        {
            type: "select",
            propertyName: "selectStuff1",
            options: [
                { label: "VC", value: "VC" },
                { label: "VD", value: "VD" },
            ],
            displayName: "Select Test",
        },
    ];

    window.history.pushState({}, "", "/?select-selectStuff1=VD");
    render(<FilterPanelWrapper filters={filters} closeSideMenu={closeSideMenu} setFilterSetMock={setFilterSet} />);

    expect(screen.getByText(/select test: vd/i)).toBeVisible();

    expect(setItemMock).toHaveBeenCalled();
    expect(setItemMock.mock.calls[0]).toEqual([
        "testFilterSet",
        '{"filters":[{"propertyName":"selectStuff1","type":"select","value":{"label":"VD","value":"VD"},"isActive":true,"displayName":"Select Test"}]}',
    ]);
});

test("FilterSet from url parameters overwrites localStorage filterSet", async () => {
    const closeSideMenu = jest.fn();
    const setFilterSet = jest.fn();

    getItemMock.mockImplementation(
        () =>
            '{"filters":[{"propertyName":"selectStuff1","type":"select","value":{"label":"VC","value":"VC"},"isActive":true,"displayName":"Select Test"}]}'
    );

    const filters: FilterProps<TestType>[] = [
        {
            type: "select",
            propertyName: "selectStuff1",
            options: [
                { label: "VC", value: "VC" },
                { label: "VD", value: "VD" },
            ],
            displayName: "Select Test",
        },
    ];

    window.history.pushState({}, "", "/?select-selectStuff1=VD");
    render(<FilterPanelWrapper filters={filters} closeSideMenu={closeSideMenu} setFilterSetMock={setFilterSet} />);

    expect(screen.getByText(/select test: vd/i)).toBeVisible();

    expect(setItemMock).toHaveBeenCalled();
    expect(setItemMock.mock.calls[0]).toEqual([
        "testFilterSet",
        '{"filters":[{"propertyName":"selectStuff1","type":"select","value":{"label":"VD","value":"VD"},"isActive":true,"displayName":"Select Test"}]}',
    ]);
});

test("FilterSet is retrieved from localStorage", async () => {
    const closeSideMenu = jest.fn();
    const setFilterSet = jest.fn();

    const filters: FilterProps<TestType>[] = [
        {
            type: "select",
            propertyName: "selectStuff1",
            options: [
                { label: "VC", value: "VC" },
                { label: "VD", value: "VD" },
            ],
            displayName: "Select Test",
        },
    ];

    window.history.pushState({}, "", "/");
    getItemMock.mockImplementation(
        () =>
            '{"filters":[{"propertyName":"selectStuff1","type":"select","value":{"label":"VC","value":"VC"},"isActive":true,"displayName":"Select Test"}]}'
    );
    render(<FilterPanelWrapper filters={filters} closeSideMenu={closeSideMenu} setFilterSetMock={setFilterSet} />);

    expect(screen.getByText(/select test: vc/i)).toBeVisible();
    expect(getItemMock).toHaveBeenCalled();
    expect(getItemMock.mock.calls[0]).toEqual(["testFilterSet"]);
});
