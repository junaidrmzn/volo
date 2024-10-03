import { useQuery } from "@tanstack/react-query";
import { UseGetSignatureRecordsOptions, useGetSignatureRecords } from "./useGetSignatureRecords";

export const getSignatureRecordsQueryKey = (definitionId: string) => ["approval-signatory", definitionId];

export const useGetSignatureRecordsQuery = (options: UseGetSignatureRecordsOptions) => {
    const { getSignatureRecords } = useGetSignatureRecords(options);

    const { data, ...rest } = useQuery({
        queryFn: getSignatureRecords,
        queryKey: getSignatureRecordsQueryKey(options.definitionId),
        staleTime: 100_000,
    });

    return {
        signatureRecords: data?.data || [],
        ...rest,
    };
};
