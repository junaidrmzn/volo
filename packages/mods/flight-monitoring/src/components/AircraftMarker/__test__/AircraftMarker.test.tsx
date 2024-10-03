import { render } from "@voloiq/testing";
import { AircraftMarker } from "../AircraftMarker";

describe("Aircraft Marker Test", () => {
    it("should render Aircraft Marker without crashing", () => {
        const setIsCentered = jest.fn();
        const setShowFlightPath = jest.fn();
        render(
            <AircraftMarker
                coords={[0, 0]}
                bearing={0}
                isCentered={false}
                setIsCentered={setIsCentered}
                setShowFlightPath={setShowFlightPath}
            />
        );
    });
});
