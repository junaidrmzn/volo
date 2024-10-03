import type { FilterProps } from "@voloiq/filter-panel";
import { render, screen, userEvent, within } from "@voloiq/testing";
import { ResourceOverview } from "../../ResourceOverview";
import { anyPagination } from "../../list/__tests__/anyListMachineConfig";
import { renderListItemWithId } from "../../utils/renderListItemWithId";
import type { TestResource } from "./anyFilterMachineConfig";
import { anyFilterMachineConfig } from "./anyFilterMachineConfig";

const applyFilters = async () =>
    userEvent.click(
        await screen.findByRole("button", {
            name: "Apply",
        })
    );

test("Do not reload list when filters are not changed", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachineConfig = anyFilterMachineConfig({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "Filter" }));

    const maxFlightDuration = await screen.findByRole("group", { name: "Flight Duration" });
    userEvent.type(within(maxFlightDuration).getByRole("spinbutton", { name: "min" }), "10");

    fetchAllResources.mockClear();
    userEvent.click(
        screen.getByRole("button", {
            name: "Back",
        })
    );

    expect(screen.queryByRole("listitem", { name: "Filter Tags : Flight Duration" })).not.toBeInTheDocument();
    expect(fetchAllResources).toHaveBeenCalledTimes(0);
});

test("User can try again on failure", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const getAllFilters = jest.fn((): FilterProps<TestResource>[] => [
        {
            type: "numberRange",
            propertyName: "flightHeight",
            fromLabel: "min",
            toLabel: "max",
            displayName: "Flight height",
        },
    ]);
    const getAllFiltersAsync = jest.fn((): Promise<FilterProps<TestResource>[]> => Promise.reject());

    const testStateMachineConfig = anyFilterMachineConfig({ fetchAllResources }, { getAllFilters, getAllFiltersAsync });
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    getAllFiltersAsync.mockImplementation(() =>
        Promise.resolve([
            {
                type: "numberRange",
                propertyName: "flightHeight",
                fromLabel: "min",
                toLabel: "max",
                displayName: "Flight height",
            },
        ])
    );

    userEvent.click(await screen.findByRole("button", { name: "Try again" }));

    expect(await screen.findByText("Flight height")).toBeVisible();
});

test("Apply filter and use filter tag in list view to remove it", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachineConfig = anyFilterMachineConfig({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "Filter" }));

    const maxFlightDuration = await screen.findByRole("group", { name: "Flight Duration" });
    userEvent.type(within(maxFlightDuration).getByRole("spinbutton", { name: "min" }), "10");

    fetchAllResources.mockClear();

    await applyFilters();
    userEvent.click(
        screen.getByRole("button", {
            name: "Back",
        })
    );

    const filterTagList = screen.getByRole("list", { name: "Filter Tags" });
    expect(within(filterTagList).getByText("Flight Duration: 10 -")).toBeVisible();

    userEvent.click(within(filterTagList).getByRole("button", { name: "close" }));

    expect(fetchAllResources).toHaveBeenCalledTimes(2);
    expect(fetchAllResources).toHaveBeenCalledWith({
        filterSet: {
            filters: [],
        },
        page: 1,
        size: 10,
    });

    userEvent.click(await screen.findByRole("button", { name: "Filter" }));
    await screen.findByLabelText("Flight Duration");

    expect(
        screen.queryByRole("list", {
            name: /filter tag list/i,
        })
    ).not.toBeInTheDocument();

    // TODO: Please fix this test. It is related to the NumberInput change in the Design Library https://jira.volocopter.org/browse/FECOP-299
    // expect(within(maxFlightDuration).getByRole("spinbutton", { name: "min" })).toBeEmpty();
});

test("User cannot see the filter button without the canRead permission", async () => {
    const testStateMachineConfig = anyFilterMachineConfig(undefined, undefined, {
        canRead: false,
    });

    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    expect(screen.getByText("You do not have permission to access the requested page")).toBeVisible();
});
