import { paramsSerializer, useService } from "@voloiq/service";

export const useDeleteRouteOption = () => {
    const { baseUrl, axiosInstance } = useService();

    const deleteRouteOption = async (routeOptionId: number | string) => {
        await axiosInstance.delete(`${baseUrl}/route-options/${routeOptionId}`, {
            paramsSerializer,
            withCredentials: true,
        });
    };
    return { deleteRouteOption };
};
