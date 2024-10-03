import { useToast } from "@volocopter/design-library-react";
import { axiosInstance, paramsSerializer } from "@voloiq/service";
import { useFlightMonitoringTranslation } from "../../translations/useFlightMonitoringTranslation";
import { FLIGHT_PLANNING } from "../serviceEndpoints";

/**
 * Retrieve the most recent flight of a given VTOL
 * @param vtolRegistration VTOL Registration
 * @returns Flight
 */
export const useGetFlightPlanInformation = () => {
    const toast = useToast();
    const { t } = useFlightMonitoringTranslation();

    const requestFlightPlanInformation = async () => {
        // eslint-disable-next-line deprecation/deprecation
        const { data } = await axiosInstance
            .get(`${BACKEND_BASE_URL}${FLIGHT_PLANNING}/flight-plans`, {
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

        // endpoint returns an array of flights, just keep the first element:
        if (data && data.data) {
            data.data = { ...data.data[0] };
        }
        return data;
    };

    return { requestFlightPlanInformation };
};
