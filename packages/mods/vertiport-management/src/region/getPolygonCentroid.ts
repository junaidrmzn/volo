/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Point } from "@voloiq/vertiport-management-api/v1";

export const getPolygonCentroid = (vertices: Point[]): Point | undefined => {
    const centroid: { lat: number; lon: number } = { lat: 0, lon: 0 };
    const vertexCount: number = vertices.length;

    let area: number = 0;
    let x0: number = 0; // Current vertex X
    let y0: number = 0; // Current vertex Y
    let x1: number = 0; // Next vertex X
    let y1: number = 0; // Next vertex Y
    let a: number = 0; // Partial signed area
    let counter: number = 0; // Counter

    for (; counter < vertexCount - 1; ++counter) {
        x0 = vertices[counter]!!.latitude;
        y0 = vertices[counter]!!.longitude;
        x1 = vertices[counter + 1]!!.latitude;
        y1 = vertices[counter + 1]!!.longitude;

        a = x0 * y1 - x1 * y0;

        area += a;

        centroid.lat += (x0 + x1) * a;
        centroid.lon += (y0 + y1) * a;
    }

    // Do last vertex separately to avoid performing an expensive
    // modulus operation in each iteration.
    x0 = vertices[counter]!!.latitude;
    y0 = vertices[counter]!!.longitude;
    x1 = vertices[0]!!.latitude;
    y1 = vertices[0]!!.longitude;

    a = x0 * y1 - x1 * y0;

    area += a;
    centroid.lat += (x0 + x1) * a;
    centroid.lon += (y0 + y1) * a;
    area *= 0.5;

    centroid.lat /= 6 * area;
    centroid.lon /= 6 * area;

    if (Number.isNaN(centroid.lat) || Number.isNaN(centroid.lon)) {
        return undefined;
    }
    return { longitude: centroid.lon, latitude: centroid.lat, height: 0 };
};
