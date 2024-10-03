export const metersToPixelsAtMaxZoom = (latitude: number, radius: number) => {
    // If we measure the length of a horizontal line at the equator (78271.484 m/px) at the max zoom level 22 and
    // divide by the number of pixels that this line spans.
    // Applying the mercator latitude scaling factor of 1 / cos(phi), we obtain the correct meter to pixel ratio for any latitude
    const lineAtEquator = 78_271.484; // meter/pixel
    const maxZoom = 22; // pixel
    return radius / (lineAtEquator / 2 ** maxZoom) / Math.cos((latitude * Math.PI) / 180);
};
