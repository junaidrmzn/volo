import { useColorModeValue, useToast } from "@volocopter/design-library-react";
import { useState } from "react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { VoloiqMapStoreType } from "@voloiq/map";
import { useEditWaypointWrapper } from "../../../api-hooks";
import { useFlightPlanningTranslation } from "../../../translations";
import { colors } from "../../../utils";
import { useSelectedRouteSequenceIndex } from "../../selected-route-sequence-index";

export const useWaypointOnRouteList = (
    routeId: number,
    waypointOnRoutes: Waypoint[],
    voloiqMapStore?: VoloiqMapStoreType,
    onWaypointDragCallback?: () => void
) => {
    const toast = useToast();
    const { t: translate } = useFlightPlanningTranslation();
    const [draggedWaypointOnRouteId, setDraggedWaypointOnRouteId] = useState<string>("");
    const { setSelectedRouteSequenceIndex } = useSelectedRouteSequenceIndex();
    const arrivalVertiportIndex = waypointOnRoutes.length - 1;
    const borderColor = useColorModeValue(colors.blue[500], colors.white);
    const { editWaypointOnRoute } = useEditWaypointWrapper(routeId, voloiqMapStore?.map);

    const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const waypointOnRouteTargetIndex = waypointOnRoutes.findIndex(
            (waypointOnRoute) => `wp_${waypointOnRoute.routeSequenceIndex}` === event.currentTarget.id
        );

        const waypointOnRouteSourceIndex = waypointOnRoutes.findIndex(
            (waypointOnRoute) => `wp_${waypointOnRoute.routeSequenceIndex}` === draggedWaypointOnRouteId
        );

        if (
            waypointOnRouteTargetIndex === 0 ||
            waypointOnRouteTargetIndex === arrivalVertiportIndex ||
            waypointOnRouteSourceIndex === 0 ||
            waypointOnRouteSourceIndex === arrivalVertiportIndex
        )
            return;
        if (waypointOnRouteTargetIndex < waypointOnRouteSourceIndex) {
            event.currentTarget.style.borderTop = `2px solid ${borderColor}`;
        } else {
            event.currentTarget.style.borderBottom = `2px solid ${borderColor}`;
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLLIElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const waypointOnRouteTargetIndex = waypointOnRoutes.findIndex(
            (waypointOnRoute) => `wp_${waypointOnRoute.routeSequenceIndex}` === event.currentTarget.id
        );
        const waypointOnRoute = waypointOnRoutes.find((w) => `wp_${w.routeSequenceIndex}` === draggedWaypointOnRouteId);

        if (
            !waypointOnRoute ||
            !waypointOnRoute.id ||
            waypointOnRouteTargetIndex === 0 ||
            waypointOnRouteTargetIndex === arrivalVertiportIndex ||
            draggedWaypointOnRouteId === "wp_0" ||
            draggedWaypointOnRouteId === `wp_${arrivalVertiportIndex}`
        ) {
            toast({
                status: "error",
                description: translate("errorMessages.reindexingVertiportNotAllowed"),
                title: translate("common.error"),
            });
            return;
        }
        if (waypointOnRouteTargetIndex !== waypointOnRoute?.routeSequenceIndex) {
            editWaypointOnRoute({
                ...waypointOnRoute,
                routeSequenceIndex: waypointOnRouteTargetIndex,
            });
            onWaypointDragCallback?.();
        }

        setDraggedWaypointOnRouteId("");
        event.currentTarget.style.border = "none";
    };

    const handleDragStart = (event: React.DragEvent<HTMLLIElement>) => {
        setDraggedWaypointOnRouteId(event.currentTarget.id);
    };

    const onItemSelect = (index: number) => {
        setSelectedRouteSequenceIndex(index);
        if (voloiqMapStore?.map) {
            voloiqMapStore.map.selectedRouteSequenceIndex = index;
            voloiqMapStore.map.isMapNeedsRefresh = true;
        }
    };

    return {
        handleDragStart,
        handleDrop,
        handleDragOver,
        onItemSelect,
    };
};
