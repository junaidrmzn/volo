import { useQuery } from "@tanstack/react-query";
import { useGetAllFtiLinks } from "./useGetAllFtiLinks";

export type UseGetAllFtiLinksQueryOptions = {
    definitionId: string;
    params?: Record<string, string | number>;
};

export const getAllFtiLinksQueryKey = () => ["ftiLinks"];

export const useGetAllFtiLinksQuery = (options: UseGetAllFtiLinksQueryOptions) => {
    const { getAllFtiLinksWithResponseEnvelope } = useGetAllFtiLinks(options);

    const { data, ...rest } = useQuery({
        queryKey: getAllFtiLinksQueryKey(),
        queryFn: getAllFtiLinksWithResponseEnvelope,
    });

    return { ftiLinks: data?.data, pagination: data?.pagination, ...rest };
};
