import { useToast } from "@volocopter/design-library-react";
import { useGetRouteComparisonQuery } from "@voloiq/flight-planning-api/v1";
import { useFlightPlanningTranslation } from "../../../translations";
import { colors } from "../../../utils";
import { useConductedRouteLayer } from "../hooks";

type ConductedRouteLayerProps = {
    routeId: number | string;
};
export const ConductedRouteLayer = (props: ConductedRouteLayerProps) => {
    const { routeId } = props;
    const toast = useToast();
    const { t } = useFlightPlanningTranslation();

    const { data } = useGetRouteComparisonQuery({
        routeId,
        isEnabled: true,
        onError: (error) => {
            toast({
                title: t("errorMessages.routeComparisonFetchError"),
                description: error.response?.data.message || "",
                status: "error",
            });
        },
    });

    const displayId = `${routeId}-conducted-route`;
    const lineOpacity = 0.8;
    const routeColor = colors.green[500];
    const bounds = data?.conductedRoute;

    useConductedRouteLayer({ displayId, routeColor, lineOpacity, bounds });

    return null;
};
