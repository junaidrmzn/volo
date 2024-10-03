import { useQuery, useQueryClient } from "react-query";
import type { ExternalAircraftType } from "@voloiq/flight-planning-api/v1";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { isSizeBasedPagination, paramsSerializer, useService } from "@voloiq/service";
import { FLIGHT_PLANNING } from "../serviceEndpoints";
import type { ExtractFunctionReturnType } from "../types";

type AircraftTypesQueryParams = { page: number; size: number };
const defaultParams: AircraftTypesQueryParams = { page: 1, size: 100 };

export const useGetAllAircraftTypes = (params: AircraftTypesQueryParams = defaultParams) => {
    const queryClient = useQueryClient();

    const { baseUrl, axiosInstance } = useService();

    const getAllExternalAircraftTypes = async (params?: AircraftTypesQueryParams) => {
        const { data } = await axiosInstance.get<ResponseEnvelope<ExternalAircraftType[]>>(
            `${baseUrl}/external/aircraft-types`,
            {
                paramsSerializer,
                withCredentials: true,
                params,
            }
        );
        if (
            data.data &&
            data.pagination &&
            isSizeBasedPagination(data.pagination) &&
            data.pagination.totalPages &&
            data.pagination.totalPages > 1
        ) {
            const allData = data.data;
            const allPromises = [];
            for (let index = 2; index <= data.pagination.totalPages; index++) {
                allPromises.push(
                    axiosInstance.get<ResponseEnvelope<ExternalAircraftType[]>>(
                        `${BACKEND_BASE_URL}${FLIGHT_PLANNING}/external/aircraft-types`,
                        {
                            paramsSerializer,
                            withCredentials: true,
                            params: { ...params, page: index },
                        }
                    )
                );
            }
            const allNewData = await Promise.all(allPromises);
            for (const response of allNewData) allData.push(...(response.data.data || []));
            return allData;
        }
        return data.data || [];
    };

    type QueryFunctionType = typeof getAllExternalAircraftTypes;

    return useQuery<ExtractFunctionReturnType<QueryFunctionType>, Error>({
        queryKey: ["aircraft-type"],
        queryFn: () => getAllExternalAircraftTypes(params),
        onSuccess: (data) => {
            if (!data) return;
            // eslint-disable-next-line unicorn/no-array-for-each
            data.forEach((aircraftType) =>
                queryClient.setQueryData(["aircraft-type", { id: aircraftType.externalId }], aircraftType)
            );
        },
        staleTime: 60_000,
    });
};
