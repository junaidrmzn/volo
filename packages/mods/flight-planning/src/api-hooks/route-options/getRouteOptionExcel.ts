import { useToast } from "@volocopter/design-library-react";
import type { RouteOption } from "@voloiq/flight-planning-api/v1";
import { useService } from "@voloiq/service";
import { exportFile } from "../../utils/exportFile";

export const useGetRouteOptionExcel = () => {
    const { axiosInstance, baseUrl } = useService();
    const toast = useToast();

    const getRouteOptionExcel = async (
        routeOption: RouteOption,
        mimeType: string = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        fileExtension: string = ".xlsx"
    ) => {
        axiosInstance
            .get(`${baseUrl}/route-options/${routeOption.id}/excel`, {
                responseType: "blob",
                withCredentials: true,
            })
            .then((response) => {
                exportFile(response.data, routeOption, mimeType, fileExtension);
            })
            .catch((error) => {
                toast({
                    title: "Error Exporting Excel File!",
                    description: error?.response?.data.error?.message || "",
                    status: "error",
                });
            });
    };

    return { getRouteOptionExcel };
};
