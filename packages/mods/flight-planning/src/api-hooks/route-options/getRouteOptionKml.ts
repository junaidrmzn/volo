import { useToast } from "@volocopter/design-library-react";
import type { RouteOption } from "@voloiq/flight-planning-api/v1";
import { useService } from "@voloiq/service";
import { exportFile } from "../../utils/exportFile";

export const useGetRouteOptionKml = () => {
    const { axiosInstance, baseUrl } = useService();
    const toast = useToast();
    const getRouteOptionKml = async (
        routeOption: RouteOption,
        mimeType: string = "application/vnd.google-earth.kml+xml",
        fileExtension: string = ".kml"
    ) => {
        axiosInstance
            .get(`${baseUrl}/route-options/${routeOption.id}/kml`, {
                responseType: "blob",
                withCredentials: true,
            })
            .then((response) => {
                exportFile(response.data, routeOption, mimeType, fileExtension);
            })
            .catch((error) => {
                toast({
                    title: "Error Exporting KML File!",
                    description: error?.response?.data.error?.message || "",
                    status: "error",
                });
            });
    };

    return { getRouteOptionKml };
};
