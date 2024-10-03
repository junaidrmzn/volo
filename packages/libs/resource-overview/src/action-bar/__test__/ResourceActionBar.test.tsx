import { Button } from "@volocopter/design-library-react";
import { render, screen, userEvent } from "@voloiq/testing";
import { ResourceOverview } from "../../ResourceOverview";
import { renderListItemWithId } from "../../utils/renderListItemWithId";
import { anyActionBarMachine } from "./anyActionBarMachine";

test("User can view the action bar", async () => {
    const getResourceInfo = jest.fn(() => "Resource Info");
    const onActionButtonClick = jest.fn(() => {});
    const testStateMachine = anyActionBarMachine(getResourceInfo);
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.ActionBar>
                {() => <Button onClick={onActionButtonClick}>Action Button</Button>}
            </ResourceOverview.ActionBar>
        </ResourceOverview>
    );

    expect(await screen.findByText("Resource Info")).toBeVisible();
    const actionButton = await screen.findByRole("button", { name: "Action Button" });
    expect(actionButton).toBeVisible();
    userEvent.click(actionButton);
    expect(onActionButtonClick).toHaveBeenCalledTimes(1);
});
