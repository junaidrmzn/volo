import type { Notam } from "@voloiq-typescript-api/flight-planning-types";
import { useQuery } from "react-query";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import type { ExtractFunctionReturnType } from "../../../../../src/api-hooks/types";

export const useGetNotamsByLatLng = (routeOptionId: string | number, latitude: number, longitude: number) => {
    const { axiosInstance, baseUrl } = useService();

    const getNotamsByLatLng = async (routeOptionId: string | number, latitude: number, longitude: number) => {
        const url = `${baseUrl}/route-options/${routeOptionId}/notams?latitude=${latitude}&longitude=${longitude}`;

        const { data } = await axiosInstance.post<ResponseEnvelope<Notam>>(
            url,
            {},
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data.data;
    };

    return useQuery<ExtractFunctionReturnType<typeof getNotamsByLatLng>, Error>({
        queryKey: ["notams", { latitude, longitude }],
        queryFn: () => getNotamsByLatLng(routeOptionId, latitude, longitude),
        staleTime: 600_000,
    });
};
