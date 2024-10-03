import { render, screen, userEvent, within } from "@voloiq/testing";
import { ResourceOverview } from "../../ResourceOverview";
import type { BaseResource } from "../../state-machine/BaseResource";
import { renderListItemWithId } from "../../utils/renderListItemWithId";
import { anyDeleteMachine, anyDeleteMachineWithCallback } from "./anyDeleteMachine";

test("User can delete a list item", async () => {
    const handleDelete = jest.fn(() => Promise.resolve());
    const testStateMachine = anyDeleteMachine({ deleteResource: handleDelete });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    const listItemButton = await screen.findByRole("button", { name: "ListItem 1" });
    userEvent.click(listItemButton);

    userEvent.click(await screen.findByRole("button", { name: "Delete" }));

    const deletionModal = await screen.findByRole("dialog");
    userEvent.click(within(deletionModal).getByRole("button", { name: "Delete" }));

    expect(handleDelete).toHaveBeenCalledTimes(1);
    const toast = await screen.findByRole("status");
    expect(within(toast).getByText("Success")).toBeVisible();
    expect(within(toast).getByText("Resource deleted")).toBeVisible();
});

test("User cannot see the add button without the canDelete permission", async () => {
    const testStateMachine = anyDeleteMachine(undefined, { canDelete: false });

    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    const listItemButton = await screen.findByRole("button", { name: "ListItem 1" });
    userEvent.click(listItemButton);

    expect(screen.queryByRole("button", { name: "Delete" })).not.toBeInTheDocument();
});

test("User can delete a list item and execute a callback after item is deleted", async () => {
    const invokeOnDeleted = jest.fn(() => {});
    const testStateMachine = anyDeleteMachineWithCallback(invokeOnDeleted);
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    const listItemButton = await screen.findByRole("button", { name: "ListItem 1" });
    userEvent.click(listItemButton);

    userEvent.click(await screen.findByRole("button", { name: "Delete" }));

    const deletionModal = await screen.findByRole("dialog");
    userEvent.click(within(deletionModal).getByRole("button", { name: "Delete" }));

    const toast = await screen.findByRole("status");
    expect(within(toast).getByText("Success")).toBeVisible();
    expect(within(toast).getByText("Resource deleted")).toBeVisible();
    expect(invokeOnDeleted).toHaveBeenCalledTimes(1);
});
