import { render, screen, userEvent } from "@voloiq/testing";
import { ResourceOverview } from "../../ResourceOverview";
import { renderListItemWithId } from "../../utils/renderListItemWithId";
import { anyQuickFilterMachine } from "./anyQuickFilterMachine";

const getAllQuickFilters = jest.fn(() => [
    { displayName: "Quick Filter", propertyName: "quick_filter", value: "quickFilter" },
]);

test("User can view the quick filters", async () => {
    const testStateMachine = anyQuickFilterMachine(getAllQuickFilters);

    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    expect(await screen.findByText("Quick Filter")).toBeVisible();
    expect(getAllQuickFilters).toHaveBeenCalledTimes(1);
});

test("User can apply the quick filter", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: { size: 1, page: 1, totalElements: 1, totalPages: 1 },
        })
    );
    const testStateMachine = anyQuickFilterMachine(getAllQuickFilters, { fetchAllResources });

    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByText("Quick Filter"));
    expect(fetchAllResources).toHaveBeenCalledTimes(2);
});
