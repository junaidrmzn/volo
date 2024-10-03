import { render, screen, userEvent, waitFor } from "@voloiq/testing";
import { ResourceOverview } from "../../ResourceOverview";
import { anyPagination } from "../../list/__tests__/anyListMachineConfig";
import type { BaseResource } from "../../state-machine/BaseResource";
import { renderListItemWithId } from "../../utils/renderListItemWithId";
import { anyDetailsMachine } from "./anyDetailsMachine";

test("Invokes getDetailsTitle callback on mount and renders the returned string as a header", async () => {
    const getDetailsTitle = jest.fn(() => "Details Title");
    const getListItemName = jest.fn((resource: BaseResource) => `ListItem ${resource.id}`);
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyDetailsMachine({ getDetailsTitle }, { fetchAllResources, getListItemName });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Details>{(resource: BaseResource) => `Details ${resource.id}`}</ResourceOverview.Details>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "ListItem 1" }));
    userEvent.click(await screen.findByRole("button", { name: "Details" }));
    await waitFor(() => expect(getDetailsTitle).toHaveBeenCalled());
    expect(await screen.findByRole("heading", { name: "Details Title" }));
});

test("Invokes fetchDetailsResource callback on mount and renders returned resource details", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );

    const getListItemName = jest.fn((resource: BaseResource) => `ListItem ${resource.id}`);
    const fetchDetailsResource = jest.fn((resourceId: string) => Promise.resolve({ data: { id: resourceId } }));
    const testStateMachine = anyDetailsMachine({ fetchDetailsResource }, { fetchAllResources, getListItemName });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Details>{(resource: BaseResource) => `Details ${resource.id}`}</ResourceOverview.Details>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "ListItem 1" }));
    userEvent.click(await screen.findByRole("button", { name: "Details" }));
    await waitFor(() => expect(fetchDetailsResource).toHaveBeenCalledWith("1"));
    expect(await screen.findByText("Details 1")).toBeVisible();
});

test("User cannot see the details button without the canRead permission", async () => {
    const testStateMachine = anyDetailsMachine(undefined, undefined, {
        canRead: false,
    });

    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Details>{(resource: BaseResource) => `Details ${resource.id}`}</ResourceOverview.Details>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    expect(await screen.findByText("You do not have permission to access the requested page")).toBeVisible();
});

test("Hide edit button when resource is not editable on detail page", async () => {
    const getDetailsTitle = jest.fn(() => "Details Title");
    const getListItemName = jest.fn((resource: BaseResource) => `ListItem ${resource.id}`);
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyDetailsMachine(
        {
            getDetailsTitle,
        },
        { fetchAllResources, getListItemName }
    );

    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Details>{(resource: BaseResource) => `Details ${resource.id}`}</ResourceOverview.Details>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "ListItem 1" }));
    userEvent.click(await screen.findByRole("button", { name: "Details" }));
    expect(await screen.findByRole("heading", { name: "Details Title" }));
    expect(screen.queryByRole("button", { name: "Edit" })).not.toBeInTheDocument();
});

test("Show edit button when resource is editable on detail page", async () => {
    const getDetailsTitle = jest.fn(() => "Details Title");
    const getListItemName = jest.fn((resource: BaseResource) => `ListItem ${resource.id}`);
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyDetailsMachine(
        {
            getDetailsTitle,
            checkIfResourceIsEditable: () => ({
                isResourceEditable: true,
            }),
        },
        { fetchAllResources, getListItemName }
    );

    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Details>{(resource: BaseResource) => `Details ${resource.id}`}</ResourceOverview.Details>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "ListItem 1" }));
    userEvent.click(await screen.findByRole("button", { name: "Details" }));
    expect(await screen.findByRole("heading", { name: "Details Title" }));
    expect(await screen.findByRole("button", { name: "Edit" })).toBeVisible();
});
