import { useQuery } from "@tanstack/react-query";
import type { UseGetAllExportsOptions } from "./useGetAllExportsByUserId";
import { useGetAllExportsByUserId } from "./useGetAllExportsByUserId";

export const getAllExportsQueryKey = (logId: string, userId?: string) => ["crew-members", logId, userId];

export const useGetAllExportsQuery = (options: UseGetAllExportsOptions) => {
    const { logId, userId } = options;
    const { getAllExports } = useGetAllExportsByUserId({ logId, userId });

    const {
        data,
        refetch: refetchAllExports,
        isLoading,
    } = useQuery({
        queryKey: getAllExportsQueryKey(logId, userId),
        queryFn: getAllExports,
    });

    return {
        exports: data?.data,
        refetchAllExports,
        isLoading,
        pagination: data?.pagination,
    };
};
