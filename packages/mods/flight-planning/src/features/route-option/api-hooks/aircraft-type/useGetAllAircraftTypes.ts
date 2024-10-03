import type { ExternalAircraftType } from "@voloiq-typescript-api/flight-planning-types/dist";
import type { ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";

export const useGetAllAircraftTypes = () => {
    const { axiosInstance, baseUrl } = useService();

    const getAllExternalAircraftTypes = async () => {
        const { data } = await axiosInstance.get<ResponseEnvelope<ExternalAircraftType[]>>(
            `${baseUrl}/external/aircraft-types`,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data.data || [];
    };
    return { getAllExternalAircraftTypes };
};
