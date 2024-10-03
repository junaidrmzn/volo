import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useSelectedRoute } from "../../selected-route";

type RightPanelContent = "stateOfChargePanel" | "mapLayerPanel" | undefined;
export const useRightPanelContent = () => {
    const { selectedRoute } = useSelectedRoute();
    const [rightPanelContent, setRightPanelContent] = useState<RightPanelContent>(undefined);
    const [isAlertExist, setIsAlertExist] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const createWaypointQuery = queryClient.isMutating({ mutationKey: "createWaypoint" });
    const editWaypointQuery = queryClient.isMutating({ mutationKey: "editWaypointOnRoute" });

    if (!selectedRoute && rightPanelContent === "stateOfChargePanel") setRightPanelContent(undefined);

    const toggleShowMapLayerPanel = () => {
        if (rightPanelContent === "mapLayerPanel") {
            setRightPanelContent(undefined);
        } else {
            setRightPanelContent("mapLayerPanel");
        }
    };

    const toggleShowSocPanel = () => {
        if (rightPanelContent === "stateOfChargePanel") {
            setRightPanelContent(undefined);
        } else {
            setRightPanelContent("stateOfChargePanel");
        }
    };

    const checkRouteForAlertsType = () => {
        const alertExist = selectedRoute?.alerts?.find(
            (alert) => alert.type?.includes("ttoResult") || alert.type?.includes("weather")
        );

        if (rightPanelContent === "stateOfChargePanel" && alertExist) {
            setRightPanelContent(undefined);
        }

        setIsAlertExist(!!alertExist);
        if (!alertExist) queryClient.invalidateQueries("energy");
    };

    // Check for a specific alert type when selected route changes
    useEffect(() => {
        checkRouteForAlertsType();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRoute]);

    // Remove SoC Panel whenever a waypoint is mutated
    useEffect(() => {
        if (rightPanelContent === "stateOfChargePanel") setRightPanelContent(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createWaypointQuery, editWaypointQuery]);

    const closeRightPanel = () => {
        setRightPanelContent(undefined);
    };

    return {
        rightPanelContent,
        toggleShowMapLayerPanel,
        toggleShowSocPanel,
        closeRightPanel,
        isAlertExist,
    };
};
