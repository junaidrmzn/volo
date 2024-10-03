import { FeatureCollection, LineString, MultiLineString, featureCollection } from "@turf/turf";
import { calculateGreatCircleSegment } from "./calculateGreatCircleSegment";

export const calculateGreatCircleRoute = (coordinates: number[][]): FeatureCollection<LineString | MultiLineString> => {
    const data = [];
    for (let index = 0; index < coordinates.length - 1; index++) {
        const segment = calculateGreatCircleSegment(coordinates[index]!, coordinates[index + 1]!, index + 1);
        data.push(segment);
    }
    return featureCollection(data);
};
