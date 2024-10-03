import type { LngLatLike } from "maplibre-gl";
import { Map } from "maplibre-gl";
import { MapContext } from "@voloiq/map";
import { render, screen, userEvent, waitFor } from "@voloiq/testing";
import { mockMapLibreMap, mockMapLibreMarker } from "../../__mocks__/mapMock";
import { LocateAircraftButton } from "../LocateAircraftButton";

describe("Locate Aircraft Button Test", () => {
    // const mockEaseTo = jest.fn();

    jest.mock("@voloiq/map", () => {
        const originalModule = jest.requireActual("@voloiq/map");
        return { ...originalModule, map: mockMapLibreMap };
    });

    jest.mock("maplibre-gl/dist/maplibre-gl", () => {
        const originalModule = jest.requireActual("maplibre-gl/dist/maplibre-gl");

        return {
            ...originalModule,
            /* eslint-disable-next-line object-shorthand */
            Map: function () {
                return {
                    ...mockMapLibreMap,
                };
            },
            /* eslint-disable-next-line object-shorthand */
            Marker: function () {
                return {
                    ...mockMapLibreMarker,
                };
            },
            NavigationControl: jest.fn(),
        };
    });
    const coords: LngLatLike = { lng: 0, lat: 0 };
    beforeEach(() => {
        coords.lng = 0;
        coords.lat = 0;
    });
    it("should render LocateAircraftButton without crashing", () => {
        render(<LocateAircraftButton isDisabled={false} coords={coords} />);
    });
    it("should call map.easeTo on click", async () => {
        render(
            <MapContext.Provider
                value={{
                    map: new Map({
                        container: document.createElement("div"),
                        style: "basic",
                        center: [0, 0],
                        zoom: 1,
                        attributionControl: false,
                    }),
                    isReady: true,
                }}
            >
                <LocateAircraftButton isDisabled={false} coords={coords} />
            </MapContext.Provider>
        );
        userEvent.click(screen.getByTestId("locate-aircraft-button"));
        const mockMapEaseToSpy = jest.spyOn(mockMapLibreMap, "easeTo");
        await waitFor(() => expect(mockMapEaseToSpy).toHaveBeenCalledTimes(1));
    });
});
