import "../../../../config/jest.setup.base";

// mock for window.URL.createObjectURL to make testing possible for maplibre-gl
// window.URL.createObjectURL is only available in browsers. For tests with jest we need to mock this function.
// https://github.com/mapbox/mapbox-gl-js/issues/9889
function noOp() {}
if (typeof window.URL.createObjectURL === "undefined") {
    Object.defineProperty(window.URL, "createObjectURL", { value: noOp });
}
