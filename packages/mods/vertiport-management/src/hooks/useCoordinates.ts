import { useEffect, useState } from "react";
import type { Point } from "@voloiq/vertiport-management-api/v1";
import { getPolygonCentroid } from "../region/getPolygonCentroid";

export const useCoordinates = (initialCoordinates?: Point[]) => {
    const [coordinates, setCoordinates] = useState<Point[]>(initialCoordinates || []);
    const [init, setInit] = useState<boolean>(true);

    useEffect(() => {
        if (!init && getPolygonCentroid(coordinates)) {
            setInit(false);
        }
    }, [coordinates, init, setInit]);

    return { coordinates, setCoordinates, init, setInit };
};
