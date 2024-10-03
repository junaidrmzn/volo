import type { ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";

type UploadLink = {
    url: string;
    expiry: Date;
};

export const useGetUploadLink = () => {
    const { axiosInstance } = useService();

    const requestUploadLink = async (tileset_id: string) => {
        const { data } = await axiosInstance.get<ResponseEnvelope<UploadLink>>(
            `${BACKEND_BASE_URL}/v1/flight-planning-tiles/upload-link/${tileset_id}`,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data;
    };
    return { requestUploadLink };
};
