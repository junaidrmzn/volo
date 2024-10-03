import type { Point } from "@voloiq/vertiport-management-api/v1";

export const anyPoint = (overwrites?: Partial<Point>): Point => ({
    longitude: 0,
    latitude: 0,
    height: 0,
    ...overwrites,
});
