import { render, screen, userEvent, within } from "@voloiq/testing";
import { ResourceOverview } from "../../ResourceOverview";
import type { BaseResource } from "../../state-machine/BaseResource";
import { renderListItemWithId } from "../../utils/renderListItemWithId";
import { anyDeleteMachine } from "./anyDeleteMachine";

// We use a new test suite so that jsdom properly cleans the DOM, otherwise within the same test suite
// there are leftovers in the DOM from the previous tests (e.g. toasts).
test("User can see a custom deletion toast", async () => {
    const testStateMachine = anyDeleteMachine({
        deleteSuccessTexts: {
            successToastHeaderText: "Journey Cancelled",
            successToastBodyText: "A confirmation email for your cancellation has been sent",
        },
    });
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
    expect(within(toast).getByText("Journey Cancelled")).toBeVisible();
    expect(within(toast).getByText("A confirmation email for your cancellation has been sent")).toBeVisible();
});
