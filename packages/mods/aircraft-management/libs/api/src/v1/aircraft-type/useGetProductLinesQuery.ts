import { useQuery } from "@tanstack/react-query";
import { useGetProductLines } from "./useGetProductLines";

export const useGetProductLinesQuery = () => {
    const { sendRequest } = useGetProductLines({ manual: true });

    const queryKey = ["product-lines"];
    const productLinesQuery = useQuery({
        queryKey,
        queryFn: sendRequest,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return {
        productLines: productLinesQuery.data || [],
        isLoadingProductLines: productLinesQuery.isLoading,
    };
};
