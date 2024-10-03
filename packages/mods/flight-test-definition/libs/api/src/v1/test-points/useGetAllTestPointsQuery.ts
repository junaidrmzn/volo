import { useQuery } from "@tanstack/react-query";
import type { UseGetAllTestPointsOptions } from "./useGetAllTestPoints";
import { useGetAllTestPoints } from "./useGetAllTestPoints";

export const getTestPointsQueryKey = (procedureId: string) => [procedureId, "testPoints"];

export const useGetAllTestPointsQuery = (options: UseGetAllTestPointsOptions) => {
    const { procedureId } = options;
    const { getAllTestPoints } = useGetAllTestPoints(options);

    const { data: testPoints } = useQuery({ queryKey: getTestPointsQueryKey(procedureId), queryFn: getAllTestPoints });

    return { testPoints };
};
