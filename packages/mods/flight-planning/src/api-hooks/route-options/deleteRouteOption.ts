import { useMutation, useQueryClient } from "react-query";
import type { RouteOption } from "@voloiq/flight-planning-api/v1";
import { paramsSerializer, useService } from "@voloiq/service";

export const useDeleteRouteOption = () => {
    const queryClient = useQueryClient();
    const { axiosInstance, baseUrl } = useService();
    const queryKey = "route-options";
    const mutationKey = "delete-route-option";

    const deleteRouteOption = async (routeOptionId: number | string) => {
        const response = await axiosInstance.delete(`${baseUrl}/route-options/${routeOptionId}`, {
            paramsSerializer,
            withCredentials: true,
        });
        return response;
    };

    const mutation = useMutation([mutationKey], (routeOptionId: string | number) => deleteRouteOption(routeOptionId), {
        onMutate: async (deletedRouteOptionId: string | number) => {
            // optimistic update
            await queryClient.cancelQueries([queryKey]);
            const previousRouteOptions = queryClient.getQueryData<RouteOption[]>([queryKey]);

            if (previousRouteOptions) {
                // optimistically update route options list and filter out deleted route option
                queryClient.setQueryData<RouteOption[]>(
                    [queryKey],
                    previousRouteOptions.filter((routeOption) => routeOption.id !== deletedRouteOptionId)
                );
            }
            return { previousRouteOptions };
        },
        onError: (_, __, context) => {
            if (context?.previousRouteOptions) {
                queryClient.setQueryData<RouteOption[]>([queryKey], context.previousRouteOptions);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries([queryKey]);
        },
    });

    return {
        deleteRouteOption: mutation.mutate,
        deleteRouteOptionAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
