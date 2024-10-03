import { useToast } from "@volocopter/design-library-react";
import type { FlightPlanningMission } from "@voloiq-typescript-api/flight-planning-types";
import { useEffect, useMemo } from "react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { useNavigate, useParams, useSearchParams } from "@voloiq/routing";
import { useEditFlightPlanningMission } from "../../../api-hooks";
import { useFlightPlanningTranslation } from "../../../translations";

export const useSubmitFlightPlanButton = (route: Route) => {
    const toast = useToast();
    const [searchParams] = useSearchParams();
    const params = useParams();
    const missionId = searchParams.get("missionId");
    const missionMutation = useEditFlightPlanningMission();
    const navigate = useNavigate();
    const { t: translate } = useFlightPlanningTranslation();

    const handleEditFlightMission = () => {
        if (!params.routeOptionId || !missionId) {
            toast({
                description: "routeOption or mission not correctly set",
                status: "error",
                title: translate("routeDetails.flightPlan.error"),
            });
            return;
        }
        const mission: FlightPlanningMission = {
            id: missionId,
            routeOptionId: +params.routeOptionId,
            preferredRouteId: route.id,
        };
        missionMutation.editMissionAsync(mission);
    };
    const isDisabled = useMemo(() => {
        return !missionId || !params.routeOptionId || missionMutation.isLoading;
    }, [missionId, missionMutation.isLoading, params.routeOptionId]);

    const isLoading = useMemo(() => missionMutation.isLoading, [missionMutation.isLoading]);

    useEffect(() => {
        if (!missionMutation.isSuccess) return;
        navigate(`../../air-operations/mission-management/missions/overview/${missionId}`);
    }, [missionId, missionMutation.isSuccess, navigate]);

    return { handleEditFlightMission, isDisabled, isLoading };
};
