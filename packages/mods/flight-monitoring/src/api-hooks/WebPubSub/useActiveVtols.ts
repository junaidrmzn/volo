import { useToast } from "@volocopter/design-library-react";
import type { AxiosError } from "@voloiq/service";
import { axiosInstance, paramsSerializer } from "@voloiq/service";
import { useFlightMonitoringTranslation } from "../../translations/useFlightMonitoringTranslation";
import { FLIGHT_MONITORING } from "../serviceEndpoints";

export const useActiveVtols = () => {
    const toast = useToast();
    const { t } = useFlightMonitoringTranslation();
    const flightMonitoringBackendUrl = `${BACKEND_BASE_URL}${FLIGHT_MONITORING}`;
    const getActiveVtols = async (): Promise<string[]> => {
        const accessTokenBackendUrl = `${flightMonitoringBackendUrl}/active-vtols`;
        // eslint-disable-next-line deprecation/deprecation
        const { data } = await axiosInstance
            .get(accessTokenBackendUrl, {
                paramsSerializer,
                withCredentials: true,
            })
            .catch((error: AxiosError) => {
                if (error.response && error.response.data) {
                    toast({ title: t("error"), description: t("errors.webPubSub.accessToken"), status: "error" });
                }
                return { data: [] };
            });
        return data;
    };

    return { getActiveVtols };
};
