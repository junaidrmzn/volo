import { QueryClient, QueryClientProvider } from "react-query";
import { Route, anyRoute } from "@voloiq/flight-planning-api/v1";
import { ServiceProvider } from "@voloiq/service";
import { render, screen, userEvent } from "@voloiq/testing";
import { mockedBaseUrl } from "../../../../../testing/url";
import { ConductedRouteToggleButton, DeviationFromPlannedRouteToggleButton } from "../../../../route-comparison";
import { MapLayerDialog } from "../MapLayerDialog";

const handleToggleSatellite = jest.fn();
const handleClose = jest.fn();
const handleShowCsflSites = jest.fn();
const handleShowAirspaces = jest.fn();
const handleShowDeviationFromPlannedRoute = jest.fn();
const handleShowConductedRoute = jest.fn();
const mockRoute = anyRoute();

type TestComponentProps = { route?: Route };

const TestComponent = (props: TestComponentProps) => {
    const { route } = props;
    const queryClient = new QueryClient();

    return (
        <ServiceProvider baseUrl={mockedBaseUrl}>
            <QueryClientProvider client={queryClient}>
                <MapLayerDialog
                    handleClose={handleClose}
                    handleToggleSatellite={handleToggleSatellite}
                    isSatellite
                    handleShowNotam={() => {}}
                    showNotam={false}
                    handleShowCsflSites={handleShowCsflSites}
                    showCsflSites={false}
                    showAirspaces={false}
                    toggleAirspaces={handleShowAirspaces}
                    selectedRoute={route}
                >
                    <ConductedRouteToggleButton
                        showConductedRoute={false}
                        toggleConductedRoute={handleShowConductedRoute}
                        routeId={mockRoute.id}
                    />
                    <DeviationFromPlannedRouteToggleButton
                        showDeviationFromPlannedRoute={false}
                        toggleDeviationFromPlannedRoute={handleShowDeviationFromPlannedRoute}
                        routeId={mockRoute.id}
                    />
                </MapLayerDialog>
            </QueryClientProvider>
        </ServiceProvider>
    );
};

describe("Map Layer Dialog Test", () => {
    it("should render", () => {
        render(<TestComponent />);
        expect(screen.getByText("Map Type")).toBeInTheDocument();
    });

    it("should handle toggle satellite mode", () => {
        render(<TestComponent />);
        const button = screen.getByTestId("radio-roadmap");
        userEvent.click(button);

        expect(handleToggleSatellite).toHaveBeenCalled();
    });

    it("should handle close", () => {
        render(<TestComponent />);
        const button = screen.getByRole("button", { name: "close" });
        userEvent.click(button);
        expect(handleClose).toHaveBeenCalled();
    });

    it("should not handle show csfl sites", () => {
        render(<TestComponent />);
        const switchButton = screen.getByTestId("switch-show-csfl-sites");
        userEvent.click(switchButton);
        expect(switchButton.firstChild).toHaveAttribute("aria-disabled", "true");
        expect(switchButton.firstChild).toHaveAttribute("disabled");
        expect(handleShowCsflSites).not.toHaveBeenCalled();
    });

    it("should handle show csfl sites", () => {
        render(<TestComponent route={mockRoute} />);
        const switchButton = screen.getByTestId("switch-show-csfl-sites");
        userEvent.click(switchButton);
        expect(switchButton.firstChild).toHaveAttribute("aria-disabled", "false");
        expect(switchButton.firstChild).not.toHaveAttribute("disabled");
        expect(handleShowCsflSites).toHaveBeenCalledTimes(1);
    });

    it("should handle show airspaces", () => {
        render(<TestComponent />);
        const switchButton = screen.getByTestId("switch-show-airspaces");
        userEvent.click(switchButton);
        expect(switchButton.firstChild).toHaveAttribute("aria-disabled", "false");
        expect(switchButton.firstChild).not.toHaveAttribute("disabled");
        expect(handleShowAirspaces).toHaveBeenCalledTimes(1);
    });
});
