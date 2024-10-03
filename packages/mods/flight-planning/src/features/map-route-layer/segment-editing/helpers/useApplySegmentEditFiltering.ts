import { FeatureCollection, Geometry } from "@turf/turf";
import { useSelectedRouteSequenceIndex } from "../../../selected-route-sequence-index/index";
import { SegmentEditModeType, useSegmentEditingContext } from "../context";

export const filterRouteSegmentByRouteSequenceIndex = (
    coordinates: FeatureCollection<Geometry>,
    routeSequenceIndexToFilterBy: number,
    routeSegmentEditMode: SegmentEditModeType
) => {
    if (routeSegmentEditMode === "none") return coordinates;

    const filteredRouteCoordinates = coordinates.features.filter((item) => {
        return item.properties?.routeSequenceIndex !== routeSequenceIndexToFilterBy;
    });
    return {
        ...coordinates,
        features: filteredRouteCoordinates,
    };
};

export const useApplySegmentEditFiltering = () => {
    const { selectedRouteSequenceIndex } = useSelectedRouteSequenceIndex();
    const { segmentEditMode } = useSegmentEditingContext();
    const indexToFilterOut = selectedRouteSequenceIndex || 0;
    return {
        filterRouteSegmentByRouteSequenceIndex: (coordinates: FeatureCollection<Geometry>) =>
            filterRouteSegmentByRouteSequenceIndex(coordinates, indexToFilterOut + 1, segmentEditMode),
    };
};
