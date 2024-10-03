import { RouteOption } from "@voloiq-typescript-api/flight-planning-types";
import { useMutation, useQueryClient } from "react-query";
import { MutationContext, ResourceRequest, ResourceResponse } from "../../types";
import { RouteOptionUpdate } from "./models";
import { useEditRouteOption } from "./useEditRouteOption";

type UseEditRouteOptionQueryOptions = {
    routeOptionId: number;
    onError?: (error: Error) => void;
};

export const useEditRouteOptionQuery = (options: UseEditRouteOptionQueryOptions) => {
    const { routeOptionId, onError } = options;
    const queryClient = useQueryClient();
    const queryKey = ["route-options", { routeOptionId }];

    const { sendRequest } = useEditRouteOption({ routeOptionId, manual: true });

    const mutation = useMutation<
        ResourceResponse<RouteOption>,
        Error,
        ResourceRequest<RouteOptionUpdate>,
        MutationContext<RouteOption>
    >(sendRequest, {
        onMutate: async (editResourceRequest) => {
            const previousResource = queryClient.getQueryData<RouteOption>(queryKey);
            if (!previousResource || !editResourceRequest?.data) return {};

            await queryClient.cancelQueries({ queryKey });
            const newResource: RouteOption = {
                ...previousResource,
                aircraftType: editResourceRequest.data?.aircraftType,
                aircraftTypeId: editResourceRequest.data?.aircraftTypeId,
            };
            queryClient.setQueryData(queryKey, newResource);

            return { resource: newResource };
        },
        onSuccess: async (response) => {
            if (!response) return;
            await queryClient.invalidateQueries([
                "routeOptions",
                { routeOptionId: routeOptionId.toString() },
                "routes",
            ]);
        },
        onError: (error, __, context) => {
            if (context) {
                queryClient.setQueryData(queryKey, context);
                onError?.(error);
            }
        },
    });

    return {
        editRouteOption: mutation.mutate,
        editRouteOptionAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
