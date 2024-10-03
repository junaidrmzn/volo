import { useQuery } from "@tanstack/react-query";
import { GetPaginatedQueryKeyParamsType } from "../../common";
import {
    UseGetAllTestHazardAssessmentsOptions,
    useGetAllTestHazardAssessments,
} from "./useGetAllTestHazardAssessments";

export const getAllTestHazardAssessmentsQueryKey = (params: GetPaginatedQueryKeyParamsType) => [
    "testHazardAssessments",
    params,
];

type UseGetAssignedTestHazardAssessmentsQueryOptions = UseGetAllTestHazardAssessmentsOptions;

export const useGetAllTestHazardAssessmentsQuery = (options: UseGetAssignedTestHazardAssessmentsQueryOptions) => {
    const { params } = options;
    const formattedParams = {
        size: params?.size ?? 50,
        page: params?.page ?? 1,
        inactive: params?.inactive ?? true,
        orderBy: params?.orderBy ?? "hazard:asc",
        ...(params?.filter?.length && params.filter?.length > 0 ? { filter: params?.filter } : undefined),
    };
    const { getAllTestHazardAssessmentsWithParams } = useGetAllTestHazardAssessments({
        manual: true,
        ...formattedParams,
    });

    const {
        data,
        refetch: getAllTestHazardAssessments,
        ...rest
    } = useQuery({
        queryFn: () => getAllTestHazardAssessmentsWithParams(formattedParams),
        queryKey: getAllTestHazardAssessmentsQueryKey(formattedParams),
        staleTime: 100_000,
    });

    return {
        testHazardAssessments: data?.data || [],
        pagination: data?.pagination,
        getAllTestHazardAssessments,
        ...rest,
    };
};
