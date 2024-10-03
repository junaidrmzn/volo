import { Navigate, useParams } from "@voloiq/routing";
import { useGetFlightPlanningMission } from "../../api-hooks";

export const FlightPlanningMissionRedirect = () => {
    const { missionId } = useParams();

    const missionQuery = useGetFlightPlanningMission(missionId || "");

    if (missionQuery.isSuccess) {
        const routingString = `../route-options/${missionQuery.data?.routeOptionId}/map?missionId=${missionId}`;
        const selectedRouteParam = missionQuery.data?.preferredRouteId
            ? `&selectedRoute=${missionQuery.data.preferredRouteId}`
            : "";
        return <Navigate to={routingString + selectedRouteParam} />;
    }

    return null;
};
