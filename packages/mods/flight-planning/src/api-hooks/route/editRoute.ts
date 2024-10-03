import { useToast } from "@volocopter/design-library-react";
import { useMutation, useQueryClient } from "react-query";
import { Route } from "@voloiq/flight-planning-api/v1";
import { useParams } from "@voloiq/routing";
import type { AxiosError, AxiosResponse, ResponseEnvelope } from "@voloiq/service";
import { paramsSerializer, useService } from "@voloiq/service";

export const useEditRoute = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const { routeOptionId } = useParams();
    const { axiosInstance, baseUrl } = useService();

    const editRoute = async (route: Route): Promise<ResponseEnvelope<Route>> => {
        const response: AxiosResponse = await axiosInstance.put(`${baseUrl}/routes/${route.id}`, route, {
            paramsSerializer,
            withCredentials: true,
        });

        return response.data;
    };

    const mutation = useMutation<ResponseEnvelope<Route>, AxiosError<ResponseEnvelope<Error>>, Route, Route[]>(
        ["editRoute"],
        (updatedRoute: Route) => editRoute(updatedRoute),
        {
            onMutate: async (updatedRoute: Route) => {
                // optimistic update
                await queryClient.cancelQueries("routes");
                const previousRoutes = queryClient.getQueryData<Route[]>("routes");

                if (previousRoutes) {
                    queryClient.setQueryData<Route[]>("routes", [
                        ...previousRoutes?.filter((route) => route.id !== updatedRoute.id),
                        updatedRoute,
                    ]);
                }
                return previousRoutes;
            },
            onError: (error, __, context) => {
                toast({
                    title: "Error updating route",
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
        editRoute: mutation.mutate,
        editRouteAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
