import "../../../../config/jest.setup.base";
import { mockMapLibreMap, mockMapLibreMarker } from "../src/components/__mocks__/mapMock";

// mock for window.URL.createObjectURL to make testing possible for maplibre-gl
// window.URL.createObjectURL is only available in browsers. For tests with jest we need to mock this function.
// https://github.com/mapbox/mapbox-gl-js/issues/9889
function noOp() {}
if (typeof window.URL.createObjectURL === "undefined") {
    Object.defineProperty(window.URL, "createObjectURL", { value: noOp });
}

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
