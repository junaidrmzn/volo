import { useToast } from "@volocopter/design-library-react";
import { useCallback } from "react";
import { useGetCorridorClearanceDataQuery, useGetFullEnvelopeValidationQuery } from "@voloiq/flight-planning-api/v1";
import type { Waypoint } from "@voloiq/flight-planning-api/v1";
import {
    VoloiqMapStoreType,
    createWaypointsDataFromHashMap,
    updateSelectedWaypoint,
    updateWaypointOnHashMap,
} from "@voloiq/map";
import { useGetRouteFullEnergy } from "../../api-hooks";
import { useEditWaypointWrapper } from "../../api-hooks/waypointHookWrappers";
import { useFlightPlanningTranslation } from "../../translations";
import { FEET_TO_METERS } from "../../utils";

type UseAltitudeChangeOptions = {
    routeId: number | string;
    voloiqMapStore?: VoloiqMapStoreType;
};

export const useChangeAltitude = (options: UseAltitudeChangeOptions) => {
    const { routeId, voloiqMapStore } = options;
    const toast = useToast();
    const { t } = useFlightPlanningTranslation();
    const waypointsData = createWaypointsDataFromHashMap(voloiqMapStore?.map, true);
    const { clearFullEnergyCache } = useGetRouteFullEnergy(routeId);
    const { clearFullEnvelopeValidationCache } = useGetFullEnvelopeValidationQuery({ routeId });
    const { invalidateCorridorClearanceData } = useGetCorridorClearanceDataQuery(routeId);

    const invalidateRoute = () => {
        invalidateCorridorClearanceData();
        clearFullEnergyCache();
        clearFullEnvelopeValidationCache();
    };

    const { editWaypointOnRoute, isLoading } = useEditWaypointWrapper(routeId, voloiqMapStore?.map, invalidateRoute);

    const handleAltitudeChange = useCallback(
        (index: number, newAlt: number) => {
            const waypointToUpdate = waypointsData?.find((waypoint: Waypoint) => waypoint.routeSequenceIndex === index);
            if (!waypointToUpdate) return;
            if (waypointToUpdate.alt === newAlt * FEET_TO_METERS) return;
            if (isLoading) {
                toast({
                    title: t("verticalProfile.toasts.errorChangingWpAlt.title"),
                    description: t("verticalProfile.toasts.errorChangingWpAlt.desc"),
                    status: "error",
                });
                return;
            }

            editWaypointOnRoute({ ...waypointToUpdate, alt: newAlt * FEET_TO_METERS });
            if (voloiqMapStore?.map) {
                const mapObject = voloiqMapStore.map;
                mapObject.selectedWaypointId = waypointToUpdate.id;
                const waypointObject = { ...waypointToUpdate, alt: newAlt * FEET_TO_METERS, waypointType: "waypoint" };
                updateSelectedWaypoint(
                    mapObject,
                    { coordinates: [waypointObject.lng, waypointObject.lat], properties: waypointObject },
                    true
                );
                updateWaypointOnHashMap(waypointObject, mapObject);
            }
        },
        [editWaypointOnRoute, waypointsData, isLoading, t, toast]
    );

    return {
        handleAltitudeChange,
    };
};
