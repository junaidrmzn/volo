import { useToast } from "@volocopter/design-library-react";
import type { FlightPathItem } from "@voloiq-typescript-api/flight-monitoring-types";
import type { AxiosError } from "@voloiq/service";
import { axiosInstance, paramsSerializer } from "@voloiq/service";
import { useFlightMonitoringTranslation } from "../../translations/useFlightMonitoringTranslation";
import { FLIGHT_MONITORING } from "../serviceEndpoints";

export const useRequestFlightPath = () => {
    const toast = useToast();
    const { t } = useFlightMonitoringTranslation();
    const flightMonitoringBackendUrl = `${BACKEND_BASE_URL}${FLIGHT_MONITORING}`;

    const requestFlightPathOfActiveVtol = async (vtolId: string): Promise<FlightPathItem[]> => {
        // eslint-disable-next-line deprecation/deprecation
        const { data } = await axiosInstance
            .get(`${flightMonitoringBackendUrl}/flight-path/${vtolId}`, {
                paramsSerializer,
                withCredentials: true,
            })
            .catch((error: AxiosError) => {
                if (error.response && error.response.data) {
                    toast({ title: t("error"), description: t("errors.webPubSub.flightPath"), status: "error" });
                }
                return { data: "" };
            });
        return data;
    };
    return { requestFlightPathOfActiveVtol };
};
