import { QueryKey, useQueryClient } from "@tanstack/react-query";
import type { Error } from "@voloiq/service";

type SuccessState<TData> = {
    isSuccess: true;
    data: TData;
    error: null;
};

type ErrorState<TError> = {
    isSuccess: false;
    data: undefined;
    error: TError | null;
};

type QueryStateResult<TData = unknown, TError = unknown> = {
    isLoading: boolean;
    isError: boolean;
} & (SuccessState<TData> | ErrorState<TError>);

export const useGetQueryState = <TData = unknown>(queryKey: QueryKey): QueryStateResult<TData, Error> => {
    const queryClient = useQueryClient();
    const queryState = queryClient.getQueryState<TData, Error>(queryKey);

    if (!queryState) {
        return {
            data: undefined,
            isLoading: false,
            isSuccess: false,
            isError: false,
            error: null,
        };
    }

    const isLoading = queryState.status === "loading";
    const isSuccess = queryState.status === "success";
    const isError = queryState.status === "error";

    if (isSuccess && queryState.data) {
        return {
            data: queryState.data,
            isLoading,
            isSuccess: true,
            isError,
            error: null,
        };
    }

    return {
        data: undefined,
        isLoading,
        isSuccess: false,
        isError,
        error: queryState.error,
    };
};
