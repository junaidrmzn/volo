import { Button } from "@volocopter/design-library-react";
import { render, screen, userEvent, waitFor } from "@voloiq/testing";
import { ResourceOverview } from "../../ResourceOverview";
import { anyPagination } from "../../list/__tests__/anyListMachineConfig";
import type { BaseResource } from "../../state-machine/BaseResource";
import { renderListItemWithId } from "../../utils/renderListItemWithId";
import type { ResourcePreviewOptions } from "../ResourcePreview";
import { anyPreviewMachineBuilder } from "./anyPreviewMachineBuilder";

type TestResource = { id: string; name: string };

test("Invokes getPreviewTitle callback when opening preview and renders returned string as preview heading", async () => {
    const fetchAllResources = jest.fn(() => Promise.resolve({ data: [{ id: "1" }], pagination: anyPagination() }));
    const getPreviewTitle = jest.fn((resource: BaseResource) => `Preview Title ${resource.id}`);
    const getListItemName = jest.fn((resource: BaseResource) => `ListItem ${resource.id}`);
    const testStateMachineConfig = anyPreviewMachineBuilder(
        { getPreviewTitle },
        { getListItemName, fetchAllResources }
    ).build();
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>{renderListItemWithId}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    const listItemButton = await screen.findByRole("button", { name: "ListItem 1" });
    userEvent.click(listItemButton);
    await waitFor(() => expect(getPreviewTitle).toHaveBeenNthCalledWith(1, { id: "1" }));
    expect(await screen.findByRole("heading", { name: "Preview Title 1" })).toBeVisible();
});

test("Invokes fetchPreviewResource callback when opening preview and renders returned resource", async () => {
    const fetchAllResources = jest.fn(() => Promise.resolve({ data: [{ id: "1" }], pagination: anyPagination() }));
    const fetchPreviewResource = jest.fn((resourceId: string) => Promise.resolve({ data: { id: resourceId } }));
    const getListItemName = jest.fn((resource: BaseResource) => `ListItem ${resource.id}`);
    const testStateMachineConfig = anyPreviewMachineBuilder(
        { fetchPreviewResource },
        { getListItemName, fetchAllResources }
    ).build();
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    const listItemButton = await screen.findByRole("button", { name: "ListItem 1" });
    userEvent.click(listItemButton);
    expect(fetchPreviewResource).toHaveBeenNthCalledWith(1, "1");
    expect(await screen.findByText("Preview 1")).toBeVisible();
});

test("Hide edit button when resource is not editable", async () => {
    const fetchAllResources = jest.fn(() => Promise.resolve({ data: [{ id: "1" }], pagination: anyPagination() }));
    const testStateMachineConfig = anyPreviewMachineBuilder(
        {
            checkIfResourceIsEditable: () => ({
                isResourceEditable: false,
                notEditableReason: "This resource cannot be edited because that's the way it is",
            }),
        },
        {
            getListItemName: (resource: BaseResource) => `ListItem ${resource.id}`,
            fetchAllResources,
        }
    )
        .withEdit()
        .build();
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "ListItem 1" }));

    expect(await screen.findByText("Preview 1")).toBeVisible();
    expect(screen.getByText("This resource cannot be edited because that's the way it is")).toBeVisible();
    expect(screen.queryByRole("button", { name: "Edit" })).not.toBeInTheDocument();
});

test("Show edit button when resource is editable", async () => {
    const fetchAllResources = jest.fn(() => Promise.resolve({ data: [{ id: "1" }], pagination: anyPagination() }));
    const testStateMachineConfig = anyPreviewMachineBuilder(undefined, {
        getListItemName: (resource: BaseResource) => `ListItem ${resource.id}`,
        fetchAllResources,
    })
        .withEdit()
        .build();
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "ListItem 1" }));

    expect(await screen.findByText("Preview 1")).toBeVisible();
    expect(await screen.findByRole("button", { name: "Edit" })).toBeVisible();
});

test("Show delete button when resource is deletable", async () => {
    const fetchAllResources = jest.fn(() => Promise.resolve({ data: [{ id: "1" }], pagination: anyPagination() }));
    const testStateMachineConfig = anyPreviewMachineBuilder(undefined, {
        getListItemName: (resource: BaseResource) => `ListItem ${resource.id}`,
        fetchAllResources,
    })
        .withDelete<TestResource>({
            deleteResource: async () => {},
            getDeleteTexts: () => ({
                confirmationModal: {
                    headerText: "Cancel Mission",
                    bodyText: "Do you really want to cancel mission",
                    deleteButtonText: "Yes",
                    cancelButtonText: "No",
                },
                deleteButtonText: "Delete",
            }),
            deleteSuccessTexts: {
                successToastBodyText: "Mission cancelled",
            },
        })
        .build();

    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "ListItem 1" }));

    expect(await screen.findByText("Preview 1")).toBeVisible();
    expect(await screen.findByRole("button", { name: "Delete" })).toBeVisible();
});

test("Do not show delete button when resource is not deletable", async () => {
    const fetchAllResources = jest.fn(() => Promise.resolve({ data: [{ id: "1" }], pagination: anyPagination() }));
    const testStateMachineConfig = anyPreviewMachineBuilder(
        {
            checkIfResourceIsDeletable: () => ({
                isResourceDeletable: false,
                notDeletableReason: "This resource cannot be deleted because that's the way it is",
            }),
        },
        {
            getListItemName: (resource: BaseResource) => `ListItem ${resource.id}`,
            fetchAllResources,
        }
    )
        .withDelete<TestResource>({
            deleteResource: async () => {},
            getDeleteTexts: () => ({
                confirmationModal: {
                    headerText: "Cancel Mission",
                    bodyText: "Do you really want to cancel mission",
                    deleteButtonText: "Yes",
                    cancelButtonText: "No",
                },
                deleteButtonText: "Delete",
            }),
            deleteSuccessTexts: {
                successToastBodyText: "Mission cancelled",
            },
        })
        .build();
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "ListItem 1" }));

    expect(await screen.findByText("Preview 1")).toBeVisible();
    expect(screen.getByText("This resource cannot be deleted because that's the way it is")).toBeVisible();
    expect(screen.queryByRole("button", { name: "Delete" })).not.toBeInTheDocument();
});

test("User can try again on failure", async () => {
    const fetchAllResources = jest.fn(() => Promise.resolve({ data: [{ id: "1" }], pagination: anyPagination() }));
    const getListItemName = jest.fn((resource: BaseResource) => `ListItem ${resource.id}`);
    const fetchPreviewResource = jest.fn((resourceId: string) => Promise.resolve({ data: { id: resourceId } }));
    fetchPreviewResource.mockImplementationOnce(() => Promise.reject());
    const testStateMachineConfig = anyPreviewMachineBuilder(
        { fetchPreviewResource },
        { getListItemName, fetchAllResources }
    ).build();
    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    const listItemButton = await screen.findByRole("button", { name: "ListItem 1" });
    userEvent.click(listItemButton);

    userEvent.click(await screen.findByRole("button", { name: "Try again" }));

    expect(await screen.findByText("Preview 1")).toBeVisible();
});

test("User cannot see the preview without the canRead permission", async () => {
    const testStateMachineConfig = anyPreviewMachineBuilder(undefined, undefined, {
        canRead: false,
    }).build();

    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    expect(await screen.findByText("You do not have permission to access the requested page")).toBeVisible();
});

test("User can close preview after reloading list", async () => {
    const fetchAllResources = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve({ data: [{ id: "1" }], pagination: anyPagination() }))
        .mockImplementationOnce(() =>
            Promise.resolve({ data: [{ id: "1" }, { id: "2" }], pagination: anyPagination() })
        );
    const getListItemName = jest.fn((resource: BaseResource) => `ListItem ${resource.id}`);
    const testStateMachineConfig = anyPreviewMachineBuilder(undefined, { getListItemName, fetchAllResources }).build();

    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>
                {(_: unknown, options: ResourcePreviewOptions) => (
                    <Button onClick={options.reloadList}>Reload List</Button>
                )}
            </ResourceOverview.Preview>
        </ResourceOverview>
    );

    await waitFor(() => expect(fetchAllResources).toHaveBeenCalledTimes(1));
    const listItemButton = await screen.findByRole("button", { name: "ListItem 1" });
    userEvent.click(listItemButton);

    userEvent.click(await screen.findByRole("button", { name: "Reload List" }));
    await waitFor(() => expect(fetchAllResources).toHaveBeenCalledTimes(2));

    userEvent.click(screen.getByRole("button", { name: "Close preview" }));
    await waitFor(() => expect(screen.queryByRole("button", { name: "Reload List" })).not.toBeInTheDocument());
});

test("User can reload preview", async () => {
    const fetchPreviewResource = jest
        .fn()
        .mockImplementationOnce((resourceId: string) => Promise.resolve({ data: { id: resourceId, name: "Foo" } }))
        .mockImplementationOnce((resourceId: string) =>
            Promise.resolve({ data: { id: resourceId, name: "Updated Foo" } })
        );
    const getListItemName = jest.fn((resource: BaseResource) => `ListItem ${resource.id}`);
    const testStateMachineConfig = anyPreviewMachineBuilder({ fetchPreviewResource }, { getListItemName }).build();

    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>
                {(resource: BaseResource & { name: string }, options: ResourcePreviewOptions) => (
                    <>
                        {resource.name}
                        <Button onClick={options.reloadPreview}>Reload Preview</Button>
                    </>
                )}
            </ResourceOverview.Preview>
        </ResourceOverview>
    );

    const listItemButton = await screen.findByRole("button", { name: "ListItem 1" });
    userEvent.click(listItemButton);
    await waitFor(() => expect(fetchPreviewResource).toHaveBeenCalledTimes(1));
    expect(await screen.findByText("Foo")).toBeVisible();

    userEvent.click(await screen.findByRole("button", { name: "Reload Preview" }));
    await waitFor(() => expect(fetchPreviewResource).toHaveBeenCalledTimes(2));
    expect(await screen.findByText("Updated Foo")).toBeVisible();

    userEvent.click(screen.getByRole("button", { name: "Close preview" }));
    await waitFor(() => expect(screen.queryByRole("button", { name: "Reload Preview" })).not.toBeInTheDocument());
});

test("Opens for the first list item after loading the list", async () => {
    const fetchAllResources = jest.fn(() => Promise.resolve({ data: [{ id: "1" }], pagination: anyPagination() }));
    const getPreviewTitle = jest.fn((resource: BaseResource) => `Preview Title ${resource.id}`);
    const getListItemName = jest.fn((resource: BaseResource) => `ListItem ${resource.id}`);
    const testStateMachineConfig = anyPreviewMachineBuilder(
        { getPreviewTitle },
        { getListItemName, fetchAllResources }
    ).build();

    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>,
        { "iq-777-resource-management": { enabled: true } }
    );

    expect(await screen.findByText("Preview 1")).toBeVisible();
});

test("Keeps the first list item open after changing the page", async () => {
    const fetchAllResources = jest.fn((params) =>
        Promise.resolve({
            data: [{ id: params.page }],
            pagination: {
                page: params.page,
                size: params.size,
                totalElements: 3,
                totalPages: 3,
            },
        })
    );
    const pageSize = 1;
    const getPreviewTitle = jest.fn((resource: BaseResource) => `Preview Title ${resource.id}`);
    const getListItemName = jest.fn((resource: BaseResource) => `ListItem ${resource.id}`);
    const testStateMachineConfig = anyPreviewMachineBuilder(
        { getPreviewTitle },
        { getListItemName, fetchAllResources, pageSize }
    ).build();

    render(
        <ResourceOverview machineConfig={testStateMachineConfig}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>,
        { "iq-777-resource-management": { enabled: true } }
    );

    expect(await screen.findByText("Preview 1")).toBeVisible();

    userEvent.click(await screen.findByRole("button", { name: "2", hidden: true }));

    expect(await screen.findByText("Preview 1")).toBeVisible();
});
