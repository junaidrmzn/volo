import * as turf from "@turf/turf";
import { VoloiqMap } from "@voloiq/map";
import { flattenGeometry } from "../../../../src/utils/route/flattenLineGeometry";

const funnelDistance = 3400;
type LineStringType = turf.helpers.Feature<turf.helpers.LineString, turf.helpers.Properties>;

const createFunnelCorridor = (props: {
    departureFunnelRoute: LineStringType;
    arrivalFunnelRoute: LineStringType;
    corridorWidth: number;
}) => {
    const { departureFunnelRoute, arrivalFunnelRoute, corridorWidth } = props;
    const lineSmoothingFactor = 50;
    const segmentLength = funnelDistance / lineSmoothingFactor;
    const departureFunnelRouteChunks = turf.lineChunk(departureFunnelRoute, segmentLength, { units: "meters" });
    const totalDepartureChunks = departureFunnelRouteChunks.features.length;
    const arrivalFunnelRouteChunks = turf.lineChunk(arrivalFunnelRoute, segmentLength, { units: "meters" });
    const totalArrivalChunks = arrivalFunnelRouteChunks.features.length;
    const funnelCorridorCollection: turf.FeatureCollection<turf.helpers.Polygon, turf.helpers.Properties> =
        turf.featureCollection([]);
    for (const [index, segment] of departureFunnelRouteChunks.features.entries()) {
        const buffered = turf.buffer(segment, (index / totalDepartureChunks) * corridorWidth, { units: "meters" });
        if (buffered) funnelCorridorCollection.features.push(turf.polygon(buffered.geometry.coordinates));
    }
    for (const [index, segment] of arrivalFunnelRouteChunks.features.entries()) {
        const buffered = turf.buffer(segment, corridorWidth - (index / totalArrivalChunks) * corridorWidth, {
            units: "meters",
        });
        if (buffered) funnelCorridorCollection.features.push(turf.polygon(buffered.geometry.coordinates));
    }
    return funnelCorridorCollection;
};

export const generateRouteCorridor = (
    route: turf.FeatureCollection<turf.Geometry, turf.Properties>,
    map: VoloiqMap
) => {
    const flattenLineString = flattenGeometry(route);
    const corridorWidth = map.horizontalObstacleClearance ? map.horizontalObstacleClearance * 2 : 200;
    const routeLength = turf.length(flattenLineString, { units: "meters" });
    const lastCoordinateOnLineString = flattenLineString.geometry.coordinates.length - 1;
    if (routeLength > funnelDistance * 2) {
        const startArrivlFunnel = Math.abs(routeLength - funnelDistance);
        const departureFunnelEnd = turf.along(flattenLineString, funnelDistance, { units: "meters" });
        const arrivalFunnelStart = turf.along(flattenLineString, startArrivlFunnel, { units: "meters" });
        const routeInDepartureFunnel = turf.lineSlice(
            flattenLineString.geometry.coordinates[0] ?? [0, 0],
            departureFunnelEnd,
            flattenLineString
        );
        const routeInArrivalFunnel = turf.lineSlice(
            arrivalFunnelStart,
            flattenLineString.geometry.coordinates[lastCoordinateOnLineString] ?? [0, 0],
            flattenLineString
        );
        const cruisingCorridor = turf.buffer(
            turf.lineSlice(departureFunnelEnd, arrivalFunnelStart, flattenLineString),
            corridorWidth,
            { units: "meters" }
        );
        const funnelCorridors = createFunnelCorridor({
            departureFunnelRoute: routeInDepartureFunnel,
            arrivalFunnelRoute: routeInArrivalFunnel,
            corridorWidth,
        });
        funnelCorridors.features.push(cruisingCorridor);
        const dissolvedCorridor = turf.dissolve(funnelCorridors);
        const corridorMapData = turf.featureCollection(dissolvedCorridor.features);
        map.updateSourceData?.(map, corridorMapData.features, "corridor-source");
    }
};
