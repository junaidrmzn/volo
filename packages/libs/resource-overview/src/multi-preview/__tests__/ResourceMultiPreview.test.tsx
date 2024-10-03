import { Box } from "@volocopter/design-library-react";
import { render, screen, userEvent, waitFor } from "@voloiq/testing";
import { ResourceOverview } from "../../ResourceOverview";
import { anyPagination } from "../../list/__tests__/anyListMachineConfig";
import type { BaseResource } from "../../state-machine/BaseResource";
import { renderListItemWithId } from "../../utils/renderListItemWithId";
import type { RenderMultiPreviewHandler } from "../ResourceMultiPreview";
import type { TestResource } from "./anyMultiPreviewMachineBuilder";
import { anyMultiPreviewMachineBuilder } from "./anyMultiPreviewMachineBuilder";

const renderCountOfItems: RenderMultiPreviewHandler<TestResource> = (props) => {
    const { selectedElements } = props;
    return <Box>{selectedElements.length} elements</Box>;
};

test("Invokes getMultiPreviewTitle callback when opening preview and renders returned string as multi preview heading", async () => {
    const getMultiPreviewTitle = jest.fn(() => `MultiPreview Title`);
    const testStateMachineConfig = anyMultiPreviewMachineBuilder({
        getMultiPreviewTitle,
    }).build();
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.MultiPreview>{renderCountOfItems}</ResourceOverview.MultiPreview>
        </ResourceOverview>
    );

    const selectAllButton = await screen.findByRole("button", {
        name: /select all/i,
    });
    userEvent.click(selectAllButton);
    await waitFor(() => expect(getMultiPreviewTitle).toBeCalledTimes(1));
    expect(await screen.findByRole("heading", { name: "MultiPreview Title" })).toBeVisible();
});

test("Invokes fetchAllResources callback when opening preview and renders returned resources", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({ data: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }], pagination: anyPagination() })
    );
    const fetchAllResourcesPreview = jest.fn(() =>
        Promise.resolve({ data: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }], pagination: anyPagination() })
    );

    const testStateMachineConfig = anyMultiPreviewMachineBuilder(
        { fetchAllResources: fetchAllResourcesPreview },
        {
            fetchAllResources,
        }
    ).build();
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.MultiPreview>{renderCountOfItems}</ResourceOverview.MultiPreview>
        </ResourceOverview>
    );

    const selectAllButton = await screen.findByRole("button", {
        name: /select all/i,
    });
    userEvent.click(selectAllButton);

    expect(fetchAllResourcesPreview).toHaveBeenNthCalledWith(1, {
        filterSet: { filters: [] },
        page: 1,
        size: Number.MAX_SAFE_INTEGER,
    });
    expect(await screen.findByText("4 elements")).toBeVisible();
});

test("Selecting a list entry is closing the multiPreview", async () => {
    const getMultiPreviewTitle = jest.fn(() => `MultiPreview Title`);
    const getListItemName = jest.fn((resource: BaseResource) => `ListItem ${resource.id}`);
    const testStateMachineConfig = anyMultiPreviewMachineBuilder(
        { getMultiPreviewTitle },
        {
            getListItemName,
        }
    ).build();
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.MultiPreview>{renderCountOfItems}</ResourceOverview.MultiPreview>
        </ResourceOverview>
    );

    const selectAllButton = await screen.findByRole("button", {
        name: /select all/i,
    });
    userEvent.click(selectAllButton);

    const previewHeading = await screen.findByRole("heading", { name: "MultiPreview Title" });

    const listItemButton = await screen.findByRole("button", { name: "ListItem 1", hidden: true });
    userEvent.click(listItemButton);

    expect(previewHeading).not.toBeVisible();
});

test("Opening the filter is closing the multiPreview", async () => {
    const getMultiPreviewTitle = jest.fn(() => `MultiPreview Title`);
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({ data: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }], pagination: anyPagination() })
    );
    const fetchAllResourcesPreview = jest.fn(() =>
        Promise.resolve({ data: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }], pagination: anyPagination() })
    );

    const testStateMachineConfig = anyMultiPreviewMachineBuilder(
        { fetchAllResources: fetchAllResourcesPreview, getMultiPreviewTitle },
        {
            fetchAllResources,
        }
    )
        .withFilter({
            getAllFilters: () => [
                {
                    type: "numberRange",
                    propertyName: "flightHeight",
                    fromLabel: "min",
                    toLabel: "max",
                    displayName: "Flight height",
                },
                {
                    type: "numberRange",
                    propertyName: "flightDuration",
                    fromLabel: "min",
                    toLabel: "max",
                    displayName: "Flight Duration",
                },
            ],
            getAllFiltersAsync: () =>
                Promise.resolve([
                    {
                        type: "numberRange",
                        propertyName: "flightHeight",
                        fromLabel: "min",
                        toLabel: "max",
                        displayName: "Flight height",
                    },
                    {
                        type: "numberRange",
                        propertyName: "flightDuration",
                        fromLabel: "min",
                        toLabel: "max",
                        displayName: "Flight Duration",
                    },
                ]),
        })
        .build();
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.MultiPreview>{renderCountOfItems}</ResourceOverview.MultiPreview>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "Filter" }));

    const filterHeader = await screen.findByRole("heading", {
        name: /filter/i,
    });

    expect(filterHeader).toBeVisible();

    const selectAllButton = await screen.findByRole("button", {
        name: /select all/i,
        hidden: true,
    });
    userEvent.click(selectAllButton);

    expect(filterHeader).not.toBeVisible();

    expect(await screen.findByRole("heading", { name: "MultiPreview Title" })).toBeVisible();
});

test("User can try again on failure", async () => {
    const fetchAllResources = jest.fn(() => Promise.resolve({ data: [{ id: "1" }], pagination: anyPagination() }));
    const getMultiPreviewTitle = jest.fn(() => `MultiPreview Title`);
    const fetchAllResourcesFail = jest.fn(() => Promise.resolve({ data: [{ id: "1" }], pagination: anyPagination() }));
    fetchAllResourcesFail.mockImplementationOnce(() => Promise.reject());
    const testStateMachineConfig = anyMultiPreviewMachineBuilder(
        { fetchAllResources: fetchAllResourcesFail, getMultiPreviewTitle },
        {
            fetchAllResources,
        }
    ).build();
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.MultiPreview>{renderCountOfItems}</ResourceOverview.MultiPreview>
        </ResourceOverview>
    );

    const selectAllButton = await screen.findByRole("button", {
        name: /select all/i,
    });
    userEvent.click(selectAllButton);

    userEvent.click(await screen.findByRole("button", { name: "Try again" }));

    expect(await screen.findByRole("heading", { name: "MultiPreview Title" }, { timeout: 3000 })).toBeVisible();
});

test("User can see the multi preview button when authorized", async () => {
    const testStateMachineConfig = anyMultiPreviewMachineBuilder({
        canOpenMultiPreview: true,
    })
        .withAdd()
        .build();
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.MultiPreview>{renderCountOfItems}</ResourceOverview.MultiPreview>
        </ResourceOverview>
    );

    await screen.findByRole("button", { name: "Add" });

    expect(
        screen.getByRole("button", {
            name: /select all/i,
        })
    ).toBeVisible();
});

test("User cannot see the multi preview button when unauthorized", async () => {
    const testStateMachineConfig = anyMultiPreviewMachineBuilder({
        canOpenMultiPreview: false,
    })
        .withAdd()
        .build();
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.MultiPreview>{renderCountOfItems}</ResourceOverview.MultiPreview>
        </ResourceOverview>
    );

    await screen.findByRole("button", { name: "Add" });

    expect(
        screen.queryByRole("button", {
            name: /select all/i,
        })
    ).not.toBeInTheDocument();
});
