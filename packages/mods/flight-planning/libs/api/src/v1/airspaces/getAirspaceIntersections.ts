import type { AirspacesVerticalProfile } from "@voloiq-typescript-api/flight-planning-types";
import { useQuery } from "react-query";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";
import { ExtractFunctionReturnType } from "../../extractFunctionReturnType";

export const useGetAirspaceIntersections = (routeId: string | number, showAirspaces: boolean) => {
    const { axiosInstance, baseUrl } = useService();

    const getAirspaceIntersections = async (routeId: string | number) => {
        const url = `${baseUrl}/routes/${routeId}/airspaces-vertical-profile`;

        const { data } = await axiosInstance.get<ResponseEnvelope<AirspacesVerticalProfile>>(url, {
            paramsSerializer,
            withCredentials: true,
        });
        return data.data?.airspaceIntersections ?? [];
    };

    return useQuery<ExtractFunctionReturnType<typeof getAirspaceIntersections>, Error>({
        queryFn: () => getAirspaceIntersections(routeId),
        queryKey: ["routes", { routeId }, "airspace-intersections"],
        staleTime: 60_000,
        enabled: showAirspaces,
    });
};
