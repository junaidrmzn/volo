import { Map } from "maplibre-gl";
import { QueryClient, QueryClientProvider } from "react-query";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { MAPSTYLE, MapContext } from "@voloiq/map";
import { ServiceProvider } from "@voloiq/service";
import { render } from "@voloiq/testing";
import { FlightStatusProvider } from "../../../contexts/flight-status";
import { mockMapLibreMap, mockMapLibreMarker } from "../../__mocks__/MapMock";
import { RouteLayer } from "../RouteLayer";
import { SegmentEditingProvider } from "../segment-editing";

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

const MapReadyTestComponent: FCC = (props) => {
    const { children } = props;
    const queryClient = new QueryClient();

    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <FlightStatusProvider>
                    <MapContext.Provider
                        value={{
                            map: new Map({
                                container: document.createElement("div"),
                                style: MAPSTYLE,
                                center: [0, 0],
                                zoom: 1,
                                attributionControl: false,
                            }),
                            isReady: true,
                        }}
                    >
                        {children}
                    </MapContext.Provider>
                </FlightStatusProvider>
            </QueryClientProvider>
        </div>
    );
};

describe("RouteLayer Component", () => {
    it("should render without crashing", async () => {
        render(
            <ServiceProvider baseUrl="/">
                <MapReadyTestComponent>
                    <SegmentEditingProvider>
                        <RouteLayer route={anyRoute()} />
                    </SegmentEditingProvider>
                </MapReadyTestComponent>
            </ServiceProvider>
        );
    });
});
