import type { Polygon } from "@voloiq/vertiport-management-api/v1";
import { anyPoint } from "./PointMock";

export const anyPolygon = (overwrites?: Partial<Polygon>): Polygon => ({
    points: [anyPoint()],
    ...overwrites,
});
