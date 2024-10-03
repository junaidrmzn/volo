import { render, screen, userEvent, waitFor } from "@voloiq/testing";
import { ToggleFocusAircraftButton } from "../ToggleFocusAircraftButton";

describe("Toggle Focus Aircraft Button Test", () => {
    const mockToggleAircraftCentered = jest.fn();
    const mocksetShowAircraftPath = jest.fn();
    it("should render ToggleFocusAircraftButton without crashing", () => {
        render(
            <ToggleFocusAircraftButton
                toggleAircraftCentered={mockToggleAircraftCentered}
                setShowFlightPath={mocksetShowAircraftPath}
            />
        );
    });
    it("Should center the view on aircraft on click", async () => {
        render(
            <ToggleFocusAircraftButton
                toggleAircraftCentered={mockToggleAircraftCentered}
                setShowFlightPath={mocksetShowAircraftPath}
            />
        );
        userEvent.click(screen.getByTestId("toggle-focus-aircraft-button"));
        await waitFor(() => expect(mockToggleAircraftCentered).toHaveBeenCalledTimes(1));
    });
});
