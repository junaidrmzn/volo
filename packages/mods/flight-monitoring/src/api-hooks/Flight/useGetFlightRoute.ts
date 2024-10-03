import { useToast } from "@volocopter/design-library-react";
import { axiosInstance, paramsSerializer } from "@voloiq/service";
import { useFlightMonitoringTranslation } from "../../translations/useFlightMonitoringTranslation";
import { FLIGHT_PLANNING } from "../serviceEndpoints";

/**
 * Hook to Retrieve Route and Waypoints
 * @param routeId identifier of the route
 * @returns Route
 */
export const useGetFlightRoute = () => {
    const toast = useToast();
    const { t } = useFlightMonitoringTranslation();

    const requestFlightRoute = async (routeId: number | string) => {
        // eslint-disable-next-line deprecation/deprecation
        const { data } = await axiosInstance
            .get(`${BACKEND_BASE_URL}${FLIGHT_PLANNING}/routes/${routeId}?withWaypoints=true`, {
                paramsSerializer,
                withCredentials: true,
            })
            .catch((error) => {
                if (error.response.status === 504) {
                    toast({
                        title: `${t("error")}`,
                        description: `${t("errors.flightPlanningApi.timeout")}`,
                        status: "error",
                    });
                }

                toast({
                    title: t("common.notFound"),
                    description: t("errors.flightPlanningApi.timeout"),
                    status: "error",
                });
                return { data: null };
            });
        return data;
    };

    return { requestFlightRoute };
};
