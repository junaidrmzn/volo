import { useQuery } from "@tanstack/react-query";
import type { UseGetAllTestPointParametersOptions } from "./useGetAllTestPointParameters";
import { useGetAllTestPointParameters } from "./useGetAllTestPointParameters";

export const getTestPointParametersQueryKey = () => ["testPointParameters"];

export type UseGetAllTestPointParametersQueryOptions = UseGetAllTestPointParametersOptions;

export const useGetAllTestPointParametersQuery = (options: UseGetAllTestPointParametersQueryOptions = {}) => {
    const { sendRequest } = useGetAllTestPointParameters(options);
    const { data: testPointParameters } = useQuery({
        queryKey: getTestPointParametersQueryKey(),
        queryFn: sendRequest,
    });

    return { testPointParameters };
};
