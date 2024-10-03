import { useQuery } from "react-query";
import type { Vertiport } from "@voloiq/flight-planning-api/v1";
import type { Error, ResponseEnvelope } from "@voloiq/service";
import { isSizeBasedPagination, paramsSerializer, useService } from "@voloiq/service";
import { ExtractFunctionReturnType } from "../../extractFunctionReturnType";

export const useGetVertiports = () => {
    const { baseUrl, axiosInstance } = useService();
    const getVertiports = async () => {
        const { data } = await axiosInstance.get<ResponseEnvelope<Vertiport[]>>(`${baseUrl}/vertiports`, {
            paramsSerializer,
            withCredentials: true,
        });
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
                    axiosInstance.get<ResponseEnvelope<Vertiport[]>>(`${baseUrl}/vertiports`, {
                        paramsSerializer,
                        withCredentials: true,
                        params: { page: index },
                    })
                );
            }
            const allNewData = await Promise.all(allPromises);
            for (const response of allNewData) allData.push(...(response.data.data || []));
            return allData;
        }
        return data.data || [];
    };

    type QueryFunctionType = typeof getVertiports;

    return useQuery<ExtractFunctionReturnType<QueryFunctionType>, Error>({
        queryKey: ["vertiports"],
        queryFn: () => getVertiports(),
        staleTime: 60_000,
    });
};
