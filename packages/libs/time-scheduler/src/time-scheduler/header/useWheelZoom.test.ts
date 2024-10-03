import { getNewZoomFactor } from "./useWheelZoom";

describe("getNewZoomFactor", () => {
    test("zooming in", () => {
        expect(getNewZoomFactor(1000, 8, 1.4)).toEqual(1400);
        expect(getNewZoomFactor(1, 8, 1.4)).toEqual(1.4);
        expect(getNewZoomFactor(1000, 8, 2)).toEqual(2000);
    });

    test("zooming out", () => {
        expect(getNewZoomFactor(1400, -8, 1.4)).toEqual(1000);
        expect(getNewZoomFactor(1.4, -8, 1.4)).toEqual(1);
        expect(getNewZoomFactor(1.4, -8, 2)).toEqual(0.7);
    });

    test("deltaY zero (when user scrolls horizontally, e.g. with Shift button)", () => {
        expect(getNewZoomFactor(1000, 0, 1.4)).toEqual(1000);
    });

    test("invalid or weird input handling", () => {
        expect(getNewZoomFactor(1000, 8, 0)).toEqual(1000);
        expect(getNewZoomFactor(1000, 8, -1.4)).toEqual(1000);
        expect(getNewZoomFactor(0, 0, 1)).toEqual(0);
        expect(getNewZoomFactor(1000, 8, Number.NaN)).toEqual(1000);
        expect(getNewZoomFactor(1000, Number.NaN, 1.4)).toEqual(1000);
        expect(getNewZoomFactor(1000, Number.NaN, Number.NaN)).toEqual(1000);
        expect(getNewZoomFactor(Number.NaN, Number.NaN, Number.NaN)).toEqual(1);
    });
});
