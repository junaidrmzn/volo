import type { Airspace } from "@voloiq-typescript-api/flight-planning-types";
import { useQuery } from "react-query";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import type { ExtractFunctionReturnType } from "../../../../../src/api-hooks/types";

export const useGetAirspaces = (routeOptionId: number) => {
    const { axiosInstance, baseUrl } = useService();

    const getAirspaces = async () => {
        const url = `${baseUrl}/route-options/${routeOptionId}/airspaces`;

        const { data } = await axiosInstance.get<ResponseEnvelope<Airspace>>(url, {
            paramsSerializer,
            withCredentials: true,
        });
        return data;
    };

    return useQuery<ExtractFunctionReturnType<typeof getAirspaces>, Error>({
        queryFn: getAirspaces,
        queryKey: ["routes", { routeOptionId }, "airspaces"],
        staleTime: 600_000,
    });
};
