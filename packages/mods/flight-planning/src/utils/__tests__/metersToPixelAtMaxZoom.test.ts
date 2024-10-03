import { metersToPixelsAtMaxZoom } from "../metersToPixelAtMaxZoom";

test("calculates the correct pixel value for a given meters input", () => {
    const latitude = 54;
    const radius = 50;
    const expectedPixel = 4558.349;

    const pixel = metersToPixelsAtMaxZoom(latitude, radius);

    expect(pixel).toBeCloseTo(expectedPixel, 2);
});
