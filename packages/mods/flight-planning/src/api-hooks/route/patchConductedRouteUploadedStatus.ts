import { paramsSerializer, useService } from "@voloiq/service";

export const usePatchConductedRouteUploadedStatus = () => {
    const { axiosInstance, baseUrl } = useService();

    const patchConductedRouteUploadStatus = (routeId: string | number) => {
        return axiosInstance.request({
            url: `/routes/${routeId}/conducted-route/status/uploaded`,
            withCredentials: true,
            paramsSerializer,
            baseURL: baseUrl,
            method: "PATCH",
        });
    };

    return {
        patchConductedRouteUploadStatus,
    };
};
