import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import {
    Waypoint,
    useApplyArcSegment,
    useGetFullEnvelopeValidationQuery,
    useModifyArcSegment,
    useRemoveArcSegment,
} from "@voloiq/flight-planning-api/v1";
import { VoloiqMap, VoloiqMapStoreType, updateArcSegmentsOnWaypointsHashMap } from "@voloiq/map";
import { useGetRouteFullEnergy } from "../../../api-hooks";
import { useSegmentEditingContext } from "../../map-route-layer/segment-editing";

type UseRouteSegmentOptions = {
    waypointId: number;
    routeId: number;
    hasArcSegment: boolean;
    selectedWaypoint: Waypoint;
    setIsArcSegmentDirectionInverse: Dispatch<SetStateAction<boolean>>;
    voloiqMapStore?: VoloiqMapStoreType;
};

export const useRouteSegment = (options: UseRouteSegmentOptions) => {
    const { waypointId, hasArcSegment, routeId, selectedWaypoint, setIsArcSegmentDirectionInverse, voloiqMapStore } =
        options;
    const queryClient = useQueryClient();
    const [isInvalid, setIsInvalid] = useState(false);

    const { clearFullEnergyCache } = useGetRouteFullEnergy(routeId);
    const { clearFullEnvelopeValidationCache } = useGetFullEnvelopeValidationQuery({ routeId });
    const { applyArcSegment, isLoading: isLoadingApply } = useApplyArcSegment({ waypointId, routeId });
    const { modifyArcSegment, isLoading: isLoadingModify } = useModifyArcSegment({ waypointId, routeId });
    const { removeArcSegment, isLoading: isLoadingRemove } = useRemoveArcSegment({ waypointId, routeId });
    const { arcSegmentCoordinates, arcSegmentRadius, segmentEditMode, isArcSegmentDirectionInverse } =
        useSegmentEditingContext();

    useEffect(() => {
        if (selectedWaypoint.routeSegment?.isInverted !== undefined) {
            setIsArcSegmentDirectionInverse(selectedWaypoint.routeSegment.isInverted);
        }
    }, [selectedWaypoint, setIsArcSegmentDirectionInverse]);

    const createOrModifyArcSegment = async () => {
        const method = hasArcSegment ? modifyArcSegment : applyArcSegment;
        await method({
            data: {
                segmentData: {
                    radius: arcSegmentRadius,
                    isInverted: isArcSegmentDirectionInverse,
                    ...arcSegmentCoordinates,
                },
                segmentType: "arc",
            },
        });
        updateArcSegmentsOnWaypointsHashMap(waypointId, voloiqMapStore?.map as VoloiqMap, {
            id: waypointId,
            radius: arcSegmentRadius,
            isInverted: isArcSegmentDirectionInverse,
            ...arcSegmentCoordinates,
            type: "arc",
        });
    };

    const arcSegmentRemove = async () => {
        await removeArcSegment();
        updateArcSegmentsOnWaypointsHashMap(waypointId, voloiqMapStore?.map as VoloiqMap, undefined, true);
    };

    const onSaveRouteSegment = async () => {
        if (isInvalid) return;
        await (segmentEditMode === "direct" ? arcSegmentRemove() : createOrModifyArcSegment());

        await queryClient.invalidateQueries(["routeOptions"]);
        clearFullEnergyCache();
        clearFullEnvelopeValidationCache();
    };

    return {
        onSaveRouteSegment,
        isInvalid,
        setIsInvalid,
        isLoading: isLoadingApply || isLoadingModify || isLoadingRemove,
    };
};
