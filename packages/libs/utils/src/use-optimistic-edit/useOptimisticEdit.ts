import type { QueryKey } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Error = {
    id: string;
    timestamp: string;
    code: number;
    message: string;
    status: string;
    details: string[];
};

export type ApiError = {
    response: {
        data: {
            error: Error;
        };
    };
    message: string;
};

export type UseOptimisticEdit<EditResourceRequest extends { data: {} }, EditResourceResponse extends {} | undefined> = {
    queryKey: QueryKey;
    editResource: (editResourceRequest: EditResourceRequest) => Promise<EditResourceResponse>;
    onError?: (error: ApiError) => void;
    onSuccess?: () => void;
};
type UseMutationContext<Resource extends {}> = { previousResource?: Resource };

export const useOptimisticEdit = <
    Resource extends {},
    EditResourceRequest extends { data: {}; params?: {} },
    EditResourceResponse extends {} | undefined
>(
    options: UseOptimisticEdit<EditResourceRequest, EditResourceResponse>
) => {
    const { queryKey, onError, onSuccess, editResource } = options;

    const queryClient = useQueryClient();

    const { mutate: optimisticEdit } = useMutation<
        EditResourceResponse,
        ApiError,
        EditResourceRequest,
        UseMutationContext<Resource>
    >({
        mutationFn: editResource,
        onError: (error: ApiError, __, context) => {
            if (context) {
                const { previousResource } = context;
                queryClient.setQueryData(queryKey, previousResource);
                if (onError) onError(error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            if (onSuccess) onSuccess();
        },
        onMutate: async (editResourceRequest) => {
            const previousResource = queryClient.getQueryData<Resource>(queryKey);
            if (previousResource) {
                await queryClient.cancelQueries({ queryKey });
                const newResource: Resource = {
                    ...previousResource,
                    ...editResourceRequest?.data,
                };
                queryClient.setQueryData(queryKey, newResource);

                return { previousResource };
            }
            return {};
        },
    });

    return { optimisticEdit };
};
