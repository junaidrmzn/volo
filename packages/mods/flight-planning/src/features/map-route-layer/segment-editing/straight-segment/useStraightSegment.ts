import { calculateGreatCircleSegment } from "@voloiq/flight-planning-utils";
import { addGeoJsonLine, removeMapLayer, useMapContext } from "@voloiq/map";
import { straightLineLayout, straightLinePaint } from "./layout";

type UseStraightSegmentOptions = {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color: string;
};

export const useStraightSegment = (options: UseStraightSegmentOptions) => {
    const { startLat, startLng, endLat, endLng, color } = options;
    const { map } = useMapContext();

    const coordinates = calculateGreatCircleSegment([startLng, startLat], [endLng, endLat]);
    const layerId = "straight-segment";

    return {
        addStraightLineToMap: () =>
            map && addGeoJsonLine(map, layerId, coordinates, straightLineLayout(), straightLinePaint(color)),
        removeStraightLineFromMap: () => map && removeMapLayer(map, layerId),
    };
};
