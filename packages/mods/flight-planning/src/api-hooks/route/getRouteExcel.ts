import { useToast } from "@volocopter/design-library-react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { useService } from "@voloiq/service";
import { exportFile } from "../../utils/exportFile";

export const useGetRouteExcel = () => {
    const { axiosInstance, baseUrl } = useService();
    const toast = useToast();

    const getRouteExcel = async (
        route: Route,
        mimeType: string = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        fileExtension: string = ".xlsx"
    ) => {
        axiosInstance
            .get(`${baseUrl}/routes/${route.id}/excel`, {
                responseType: "blob",
                withCredentials: true,
            })
            .then((response) => {
                exportFile(response.data, route, mimeType, fileExtension);
            })
            .catch((error) => {
                toast({
                    title: "Error Exporting Excel File!",
                    description: error?.response?.data.error?.message || "",
                    status: "error",
                });
            });
    };

    return { getRouteExcel };
};
