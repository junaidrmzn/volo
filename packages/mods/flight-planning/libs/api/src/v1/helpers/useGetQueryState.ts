import { QueryKey, useQueryClient } from "react-query";
import type { Error } from "@voloiq/service";

type SuccessState<TData> = {
    isSuccess: true;
    data: TData;
    error: null;
};

type NonSuccessState<TError> = {
    isSuccess: false;
    data: undefined;
    error: TError | null;
};

type QueryStateResult<TData = unknown, TError = unknown> = {
    isFetching: boolean;
    isError: boolean;
} & (SuccessState<TData> | NonSuccessState<TError>);

export const useGetQueryState = <TData = unknown>(queryKey: QueryKey): QueryStateResult<TData, Error> => {
    const queryClient = useQueryClient();
    const queryState = queryClient.getQueryState<TData, Error>(queryKey);

    if (!queryState) {
        return {
            data: undefined,
            isFetching: false,
            isSuccess: false,
            isError: false,
            error: null,
        };
    }

    const isFetching = queryState.status === "loading";
    const isSuccess = queryState.status === "success";
    const isError = queryState.status === "error";

    if (isSuccess && queryState.data) {
        return {
            data: queryState.data,
            isFetching,
            isSuccess: true,
            isError,
            error: null,
        };
    }

    return {
        data: undefined,
        isFetching,
        isSuccess: false,
        isError,
        error: queryState.error,
    };
};
