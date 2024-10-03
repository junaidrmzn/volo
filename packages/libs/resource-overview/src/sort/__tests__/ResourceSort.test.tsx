import { render, screen, userEvent } from "@voloiq/testing";
import { ResourceOverview } from "../../ResourceOverview";
import { anyPagination } from "../../list/__tests__/anyListMachineConfig";
import { renderListItemWithId } from "../../utils/renderListItemWithId";
import { anySortMachineConfig } from "./anySortMachineConfig";

const applySort = async () =>
    userEvent.click(
        await screen.findByRole("button", {
            name: "Apply",
        })
    );

test("Apply sort and invoke fetchAllResources callback", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachineConfig = anySortMachineConfig({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "Sort" }));
    userEvent.click(await screen.findByRole("radio", { name: "Speed" }));

    fetchAllResources.mockClear();

    await applySort();

    expect(fetchAllResources).toHaveBeenCalledTimes(1);
    expect(fetchAllResources).toHaveBeenCalledWith({
        sortingConfiguration: {
            selectedOption: "speed",
            selectedOrder: "DESC",
        },
        filterSet: {
            filters: [],
        },
        page: 1,
        size: 10,
    });
}, 10_000);

test("Apply sort and invoke fetchAllResources callback with new sorting option", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachineConfig = anySortMachineConfig({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "Sort" }));
    userEvent.click(await screen.findByRole("radio", { name: "Speed" }));

    userEvent.click(await screen.findByRole("radio", { name: "Ascending" }));

    fetchAllResources.mockClear();

    await applySort();

    expect(fetchAllResources).toHaveBeenCalledTimes(1);
    expect(fetchAllResources).toHaveBeenCalledWith({
        sortingConfiguration: {
            selectedOption: "speed",
            selectedOrder: "ASC",
        },
        filterSet: {
            filters: [],
        },
        page: 1,
        size: 10,
    });
}, 10_000);

test("Do not reload list when sort is not changed", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachineConfig = anySortMachineConfig({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "Sort" }));

    userEvent.click(await screen.findByRole("radio", { name: "Speed" }));

    fetchAllResources.mockClear();
    userEvent.click(
        screen.getByRole("button", {
            name: "Back",
        })
    );

    expect(fetchAllResources).toHaveBeenCalledTimes(0);
});

test("Select current sort parameters when sorting is opened", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachineConfig = anySortMachineConfig({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "Sort" }));

    userEvent.click(await screen.findByRole("radio", { name: "Speed" }));
    userEvent.click(await screen.findByRole("radio", { name: "Ascending" }));

    userEvent.click(
        screen.getByRole("button", {
            name: "Apply",
        })
    );
    userEvent.click(
        screen.getByRole("button", {
            name: "Back",
        })
    );

    userEvent.click(await screen.findByRole("button", { name: "Sort" }));

    expect(await screen.findByRole("radio", { name: "Speed", checked: true }));
    expect(await screen.findByRole("radio", { name: "Ascending", checked: true }));
});

test("User cannot see the sort button without the canRead permission", async () => {
    const testStateMachineConfig = anySortMachineConfig(undefined, undefined, {
        canRead: false,
    });

    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    expect(screen.getByText("You do not have permission to access the requested page")).toBeVisible();
});
