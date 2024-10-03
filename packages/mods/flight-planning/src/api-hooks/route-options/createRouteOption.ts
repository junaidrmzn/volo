import type { RouteOption, RouteOptionCreate, Vertiport } from "@voloiq-typescript-api/flight-planning-types";
import { useMutation, useQueryClient } from "react-query";
import type { ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";

export const useCreateRouteOption = () => {
    const queryClient = useQueryClient();
    const { axiosInstance, baseUrl } = useService();
    const queryKey = "route-options";
    const mutationKey = "create-route-option";

    const createRouteOption = async (newRouteOption: RouteOptionCreate) => {
        const { data } = await axiosInstance.post<ResponseEnvelope<RouteOption>>(
            `${baseUrl}/route-options`,
            newRouteOption,
            {
                paramsSerializer,
                withCredentials: true,
            }
        );
        return data;
    };

    const mutation = useMutation([mutationKey], (newRouteOption) => createRouteOption(newRouteOption), {
        onMutate: async (newRouteOption: RouteOptionCreate) => {
            // optimistic update for route options list
            await queryClient.cancelQueries([queryKey]);

            const previousRouteOptions = queryClient.getQueryData<RouteOption[]>([queryKey]);
            const vertiports = queryClient.getQueryData<Vertiport[]>("vertiports");
            const arrivalExternalVertiport = vertiports?.find(
                (vertiport) => vertiport.id === newRouteOption.arrivalExternalVertiport
            );
            const departureExternalVertiport = vertiports?.find(
                (vertiport) => vertiport.id === newRouteOption.departureExternalVertiport
            );

            if (arrivalExternalVertiport && departureExternalVertiport) {
                const optimisticRouteOption: RouteOption = {
                    ...newRouteOption,
                    id: 0,
                    arrivalExternalVertiport,
                    departureExternalVertiport,
                    validForOperation: false,
                };
                // optimistically update route options list with newly created route option
                queryClient.setQueryData<RouteOption[]>([queryKey], (oldRouteOptions) => [
                    ...(oldRouteOptions || []),
                    optimisticRouteOption,
                ]);
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
        createRouteOptions: mutation.mutate,
        createRouteOptionAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
