import { useToast } from "@volocopter/design-library-react";
import { useGetRouteComparisonQuery } from "@voloiq/flight-planning-api/v1";
import { useFlightPlanningTranslation } from "../../../translations";
import { colors } from "../../../utils";
import { useDisplayRouteDeviationLayer } from "../hooks";

type DeviationFromPlannedRouteLayerProps = {
    routeId: number | string;
};

export const DeviationFromPlannedRouteLayer = (props: DeviationFromPlannedRouteLayerProps) => {
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

    const lineOpacity = 0.5;
    const routeColor = colors.brightBlue[500];

    useDisplayRouteDeviationLayer(routeId, routeColor, lineOpacity, data?.deviationFromPlannedRoutePolygons);

    return null;
};
