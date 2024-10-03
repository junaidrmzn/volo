import { useToast } from "@volocopter/design-library-react";
import { useMutation, useQueryClient } from "react-query";
import { Route } from "@voloiq/flight-planning-api/v1";
import { useParams } from "@voloiq/routing";
import type { AxiosError, Error, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";

export const useDeleteRoute = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const { routeOptionId } = useParams();
    const { axiosInstance, baseUrl } = useService();

    const deleteRoute = async (route: Route) => {
        const response = await axiosInstance.delete(`${baseUrl}/routes/${route.id}`, {
            paramsSerializer,
            withCredentials: true,
        });
        return response;
    };

    const mutation = useMutation<ResponseEnvelope<Route>, AxiosError<ResponseEnvelope<Error>>, Route, Route[]>(
        ["deleteRoute"],
        (route: Route) => deleteRoute(route),
        {
            onMutate: async (deletedRoute: Route) => {
                // optimistic update
                await queryClient.cancelQueries("routes");
                const previousRoutes = queryClient.getQueryData<Route[]>("routes");

                if (previousRoutes) {
                    queryClient.setQueryData<Route[]>(
                        "routes",
                        previousRoutes.filter((route) => route.id !== deletedRoute.id)
                    );
                }
                return previousRoutes;
            },
            onError: (error, __, context) => {
                toast({
                    title: "Error deleting route",
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
        deleteRoute: mutation.mutate,
        deleteRouteAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
