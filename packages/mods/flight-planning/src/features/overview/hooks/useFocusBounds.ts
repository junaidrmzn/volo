import type { LngLatLike } from "maplibre-gl";
import { LngLat, LngLatBounds } from "maplibre-gl";
import { useContext } from "react";
import type { RouteOption } from "@voloiq/flight-planning-api/v1";
import { useGetRouteOptionQuery } from "@voloiq/flight-planning-api/v1";
import type { PointCollections } from "@voloiq/map";
import { MapFocusMapContext } from "@voloiq/map";
import { useSelectedRoute } from "../../selected-route";

const convertPointCollectionsToBounds = (
    pointCollections: PointCollections,
    routeOption?: RouteOption,
    temporaryFocusedCoordinates?: LngLatLike[]
) => {
    const allPoints: LngLatLike[] = [];
    if (temporaryFocusedCoordinates) {
        allPoints.push(...temporaryFocusedCoordinates);
    } else {
        for (const key in pointCollections) {
            if (pointCollections[key]) allPoints.push(...pointCollections[key]!);
        }
    }
    if (allPoints && allPoints.length > 0) {
        const focusBounds = new LngLatBounds(allPoints[0], allPoints[0]);
        for (const coordinate of allPoints) {
            focusBounds.extend(LngLat.convert(coordinate));
        }
        return focusBounds;
    }
    if (routeOption) {
        return new LngLatBounds(
            [routeOption.arrivalExternalVertiport.lng, routeOption.arrivalExternalVertiport.lat],
            [routeOption.departureExternalVertiport.lng, routeOption.departureExternalVertiport.lat]
        );
    }
    return new LngLatBounds([0, 0, 0, 0]);
};

export const useFocusBounds = () => {
    const { routeOptionId } = useSelectedRoute();
    const routeOptionQuery = useGetRouteOptionQuery({
        routeOptionId,
        isEnabled: !!routeOptionId,
    });
    const { mapFocusControllerState } = useContext(MapFocusMapContext);

    const bounds = convertPointCollectionsToBounds(
        mapFocusControllerState.pointCollections,
        routeOptionQuery.data,
        mapFocusControllerState.temporaryFocusedCoordinates
    );

    return { bounds };
};
