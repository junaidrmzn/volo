import { I18nProvider } from "@voloiq/i18n";
import { render, screen } from "@voloiq/testing";
import { FlightInformation } from "../FlightInformation";

const TestComponent = () => {
    return (
        <I18nProvider>
            <FlightInformation
                aircraftType=""
                arrivalVertiport=""
                departureVertiport=""
                scheduledArrivalTime=""
                scheduledDepartureTime=""
            />
        </I18nProvider>
    );
};

describe("FlightPlan - FlightInformation", () => {
    it("renders without crashing", async () => {
        render(<TestComponent />);
        expect(await screen.findByText("Status")).toBeVisible();
    });
});
