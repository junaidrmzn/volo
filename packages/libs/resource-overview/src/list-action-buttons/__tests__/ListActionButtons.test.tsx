import { render, screen, userEvent } from "@voloiq/testing";
import { ResourceOverview } from "../../ResourceOverview";
import { ResourceMachineConfigBuilder } from "../../state-machine/resourceMachineConfigBuilder";
import type { Aircraft } from "../../stories/aircraftDatabase";

test("User can see the list action buttons", async () => {
    const handleImportCSV = jest.fn();
    const handleSettings = jest.fn();
    render(
        <ResourceOverview
            machineConfig={new ResourceMachineConfigBuilder({
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true,
                getResourceName: () => "Aircraft",
            })
                .withList({
                    fetchAllResources: () =>
                        Promise.resolve({
                            data: [{ id: "Aircraft 1" }],
                        }),
                    pageSize: 1,
                    getListTitle: () => "Aircraft",
                    getModuleTitle: () => "Test",
                    getListItemName: () => "Aircraft",
                })
                .build()}
        >
            <ResourceOverview.ListActionButtons>
                <ResourceOverview.ListActionButton onClick={handleImportCSV}>
                    Import CSV
                </ResourceOverview.ListActionButton>
                <ResourceOverview.ListActionButton onClick={handleSettings}>Settings</ResourceOverview.ListActionButton>
            </ResourceOverview.ListActionButtons>
            <ResourceOverview.ListItem>{(aircraft: Aircraft) => <p>{aircraft.id}</p>}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    await screen.findByText("Aircraft 1");

    userEvent.click(screen.getByRole("button", { name: "Import CSV" }));
    userEvent.click(screen.getByRole("button", { name: "Settings" }));

    expect(handleImportCSV).toHaveBeenCalledTimes(1);
    expect(handleSettings).toHaveBeenCalledTimes(1);
});
