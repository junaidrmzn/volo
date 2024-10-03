import { ServiceProvider } from "@voloiq/service";
import { render, screen, waitFor } from "@voloiq/testing";
import { BATTERY_MANAGEMENT_BASE_URL } from "../../mocks/serviceUrls";
import { EditBattery } from "../edit/EditBattery";
import { mockedBattery } from "./MockedBattery";

describe("Battery Edit Test", () => {
    const { id } = mockedBattery;

    const BatteryEditViewComponent = () => {
        return (
            <ServiceProvider baseUrl={BATTERY_MANAGEMENT_BASE_URL}>
                <EditBattery key={id} />
            </ServiceProvider>
        );
    };

    it("should render BatteryEditView without crashing", () => {
        render(<BatteryEditViewComponent />);
    });

    it("should render Details for current Battery", async () => {
        render(<BatteryEditViewComponent />);
        await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());
        const detailsTab = screen.getByRole("tab", { name: "Details" });
        expect(detailsTab).toBeVisible();
    });

    it("should render Assigned ESUs for current Battery", async () => {
        render(<BatteryEditViewComponent />);
        await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());
        const assignedEsusTab = screen.getByRole("tab", { name: "Assigned ESUs" });
        expect(assignedEsusTab).toBeVisible();
    });

    it("should render Unassigned ESUs for current Battery", () => {
        render(<BatteryEditViewComponent />);
        const tabListUnassignedEsus = screen.getByText("Unassigned ESUs");
        expect(tabListUnassignedEsus).toBeVisible();
    });
});
