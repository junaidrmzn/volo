import type { ReportRequest } from "@voloiq-typescript-api/battery-management-reports-types";
import type { AxiosResponse } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { useErrorToast } from "../hooks";
import { BATTERY_MANAGEMENT_REPORTS } from "./serviceEndpoints";

const route = `${BATTERY_MANAGEMENT_REPORTS}/charging-reports`;

export const useCreateChargingReport = () => {
    const { axiosInstance, baseUrl } = useService();
    const { onError } = useErrorToast();

    return {
        createChargingReport: (request: ReportRequest) => {
            return axiosInstance
                .request<ReportRequest, AxiosResponse<Blob>>({
                    method: "POST",
                    url: route,
                    data: request,
                    paramsSerializer,
                    withCredentials: true,
                    baseURL: baseUrl,
                })
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    onError(error);
                    return null;
                });
        },
    };
};
