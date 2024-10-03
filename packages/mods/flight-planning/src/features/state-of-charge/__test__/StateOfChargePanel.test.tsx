import { QueryClient, QueryClientProvider } from "react-query";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { ServiceProvider } from "@voloiq/service";
import { render, screen, userEvent } from "@voloiq/testing";
import { FlightStatusProvider } from "../../../contexts/flight-status";
import { StateOfChargePanel } from "../StateOfChargePanel";

const handleClickClose = jest.fn();
const mockRoute = anyRoute();

jest.mock("@voloiq/routing", () => ({
    ...jest.requireActual("@voloiq/routing"),
    useParams: () => ({
        flightId: 1,
    }),
}));

jest.mock("../../selected-route", () => ({
    ...jest.requireActual("../../selected-route"),
    useSelectedRoute: () => ({
        selectedRoute: mockRoute,
    }),
}));

const queryClient = new QueryClient();

describe("StateOfChargePanel test", () => {
    const renderStateOfChargePanel = () => {
        render(
            <ServiceProvider baseUrl="">
                <QueryClientProvider client={queryClient}>
                    <FlightStatusProvider>
                        <StateOfChargePanel handleClose={handleClickClose} />
                    </FlightStatusProvider>
                </QueryClientProvider>
            </ServiceProvider>
        );
    };

    test("should show StateOfChargePanel", () => {
        renderStateOfChargePanel();
        expect(screen.getByText("Battery Capacity")).toBeVisible();
    });

    test("should fire click close event", () => {
        renderStateOfChargePanel();
        const closeButton = screen.getByRole("button", { name: "close" });
        userEvent.click(closeButton);

        expect(handleClickClose).toHaveBeenCalled();
    });
});
