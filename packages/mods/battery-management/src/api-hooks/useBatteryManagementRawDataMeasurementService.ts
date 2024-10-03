import type { RawMeasurementsRequest } from "@voloiq-typescript-api/battery-management-reports-types";
import type { AxiosResponse } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { useErrorToast } from "../hooks";
import { BATTERY_MANAGEMENT_REPORTS } from "./serviceEndpoints";

const rawMeasurementsRoute = `${BATTERY_MANAGEMENT_REPORTS}/charging-raw-measurements`;

export const useBatteryManagementRawDataMeasurementService = () => {
    const { axiosInstance, baseUrl } = useService();
    const { onError } = useErrorToast();

    return {
        createRawMeasurementChargingReport: (request: RawMeasurementsRequest) => {
            return axiosInstance
                .request<RawMeasurementsRequest, AxiosResponse<Blob>>({
                    method: "POST",
                    url: rawMeasurementsRoute,
                    data: request,
                    paramsSerializer,
                    withCredentials: true,
                    baseURL: baseUrl,
                    responseType: "arraybuffer",
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
