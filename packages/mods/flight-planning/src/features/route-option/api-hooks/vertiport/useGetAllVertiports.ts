import type { Vertiport } from "@voloiq-typescript-api/flight-planning-types/dist";
import type { ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";

export const useGetAllVertiports = () => {
    const { axiosInstance, baseUrl } = useService();
    const getAllVertiports = async () => {
        const { data } = await axiosInstance.get<ResponseEnvelope<Vertiport[]>>(`${baseUrl}/vertiports`, {
            paramsSerializer,
            withCredentials: true,
        });
        return data.data || [];
    };
    return { getAllVertiports };
};
