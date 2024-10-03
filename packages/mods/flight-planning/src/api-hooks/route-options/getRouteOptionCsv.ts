import { useToast } from "@volocopter/design-library-react";
import type { RouteOption } from "@voloiq/flight-planning-api/v1";
import { useService } from "@voloiq/service";
import { exportFile } from "../../utils/exportFile";

export const useGetRouteOptionCsv = () => {
    const { axiosInstance, baseUrl } = useService();
    const toast = useToast();

    const getRouteOptionCsv = async (
        routeOption: RouteOption,
        mimeType: string = "text/csv",
        fileExtension: string = ".csv"
    ) => {
        axiosInstance
            .get(`${baseUrl}/route-options/${routeOption.id}/csv`, {
                responseType: "blob",
                withCredentials: true,
            })
            .then((response) => {
                exportFile(response.data, routeOption, mimeType, fileExtension);
            })
            .catch((error) => {
                toast({
                    title: "Error Exporting CSV File!",
                    description: error?.response?.data.error?.message || "",
                    status: "error",
                });
            });
    };

    return { getRouteOptionCsv };
};
