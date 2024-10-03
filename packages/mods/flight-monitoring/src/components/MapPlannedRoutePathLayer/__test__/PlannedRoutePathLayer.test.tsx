import type { LngLatLike } from "maplibre-gl";
import { LngLat } from "maplibre-gl";
import { render, screen, userEvent, waitFor } from "@voloiq/testing";
import { ToggleFocusAircraftButton } from "../../ToggleFocusAircraftButton";
import { PlannedRoutePathLayer } from "../PlannedRoutePathLayer";

describe("Flight Path Layer Test", () => {
    const selectedFlightId = "MSN123";
    const mockToggleAircraftCentered = jest.fn();
    const mocksetShowAircraftPath = jest.fn();
    const coords: LngLatLike = { lng: 0, lat: 0 };
    const flightPathCoords: LngLat[] = [new LngLat(0, 0)];

    beforeEach(() => {
        coords.lng = 0;
        coords.lat = 0;
    });
    it("should render LocateAircraftButton without crashing", () => {
        render(<PlannedRoutePathLayer flightPath={flightPathCoords} flightId={selectedFlightId} />);
    });

    it("Should draw the path of active selected aircraft on focus aicraft button click", async () => {
        render(
            <ToggleFocusAircraftButton
                toggleAircraftCentered={mockToggleAircraftCentered}
                setShowFlightPath={mocksetShowAircraftPath}
            />
        );
        userEvent.click(screen.getByTestId("toggle-focus-aircraft-button"));
        await waitFor(() => expect(mocksetShowAircraftPath).toHaveBeenCalledTimes(1));
    });
});
