import { useToast } from "@volocopter/design-library-react";
import type { Route, RouteCreationBase } from "@voloiq-typescript-api/flight-planning-types";
import { useMutation, useQueryClient } from "react-query";
import type { AxiosError, Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";

export const useCreateRoute = (routeOptionId: number | string) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const { axiosInstance, baseUrl } = useService();

    const createRoute = async (
        routeOptionId: number | string,
        newRoute: RouteCreationBase & { routeTemplateId?: number }
    ): Promise<ResponseEnvelope<Route>> => {
        const url = `${baseUrl}/route-options/${routeOptionId}/routes`;

        const { data } = await axiosInstance.post(url, newRoute, {
            paramsSerializer,
            withCredentials: true,
        });

        return data;
    };

    const mutation = useMutation<
        ResponseEnvelope<Route>,
        AxiosError<ResponseEnvelope<Error>>,
        RouteCreationBase & { routeTemplateId?: number },
        Route[]
    >(
        ["createRoute"],
        (newRoute: RouteCreationBase & { routeTemplateId?: number }) => createRoute(routeOptionId, newRoute),
        {
            onMutate: async (newRoute: RouteCreationBase) => {
                // optimistic update
                await queryClient.cancelQueries(["routes", { routeOptionId }]);
                const previousRoutes = queryClient.getQueryData<Route[]>(["routes", { routeOptionId }]);

                if (previousRoutes) {
                    queryClient.setQueryData<Route[]>(["routes", { routeOptionId }], (previousRoutes) => [
                        ...(previousRoutes || []),
                        {
                            ...newRoute,
                            id: 0,
                            distance: 0,
                            duration: 0,
                            remainingEnergy: 0,
                            refAltAmsl: 0,
                            createdAt: new Date().toString(),
                        },
                    ]);
                }
                return previousRoutes;
            },
            onError: (error, __, context) => {
                toast({
                    title: "Error creating route",
                    description: error.response?.data.error?.message || "",
                    status: "error",
                });

                if (context) {
                    queryClient.setQueryData<Route[]>("routes", context);
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries(["routeOptions", { routeOptionId }, "routes"]);
            },
        }
    );

    return {
        createRoute: mutation.mutate,
        createRouteAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
