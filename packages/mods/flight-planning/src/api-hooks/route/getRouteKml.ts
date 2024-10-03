import { useToast } from "@volocopter/design-library-react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { useService } from "@voloiq/service";
import { exportFile } from "../../utils/exportFile";

export const useGetRouteKml = () => {
    const { axiosInstance, baseUrl } = useService();
    const toast = useToast();

    const getRouteKml = async (
        route: Route,
        mimeType: string = "application/vnd.google-earth.kml+xml",
        fileExtension: string = ".kml"
    ) => {
        axiosInstance
            .get(`${baseUrl}/routes/${route.id}/kml`, {
                responseType: "blob",
                withCredentials: true,
            })
            .then((response) => {
                exportFile(response.data, route, mimeType, fileExtension);
            })
            .catch((error) => {
                toast({
                    title: "Error Exporting Kml File!",
                    description: error?.response?.data.error?.message || "",
                    status: "error",
                });
            });
    };

    return { getRouteKml };
};
