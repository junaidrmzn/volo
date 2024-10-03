import { useToast } from "@volocopter/design-library-react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { useService } from "@voloiq/service";
import { exportFile } from "../../utils/exportFile";

export const useGetRouteCsv = () => {
    const { axiosInstance, baseUrl } = useService();
    const toast = useToast();

    const getRouteCsv = async (route: Route, mimeType: string = "text/csv", fileExtension: string = ".csv") => {
        axiosInstance
            .get(`${baseUrl}/routes/${route.id}/csv`, {
                responseType: "blob",
                withCredentials: true,
            })
            .then((response) => {
                exportFile(response.data, route, mimeType, fileExtension);
            })
            .catch((error) => {
                toast({
                    title: "Error Exporting CSV File!",
                    description: error?.response?.data.error?.message || "",
                    status: "error",
                });
            });
    };

    return { getRouteCsv };
};
