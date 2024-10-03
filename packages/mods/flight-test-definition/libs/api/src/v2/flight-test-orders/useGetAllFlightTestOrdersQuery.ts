import { useQuery } from "@tanstack/react-query";
import { useGetAllFlightTestOrders } from "./useGetAllFlightTestOrders";

export const getAllFlightTestOrdersQueryKey = () => ["AllFlightTestOrders"];

export const useGetAllFlightTestOrdersQuery = () => {
    const { getAllFlightTestOrders } = useGetAllFlightTestOrders({
        serviceOptions: {
            options: {
                manual: true,
            },
        },
    });

    const { data: flightTestOrder, isLoading } = useQuery({
        queryKey: getAllFlightTestOrdersQueryKey(),
        queryFn: getAllFlightTestOrders,
    });

    return { flightTestOrder, getAllFlightTestOrders, isLoading };
};
