import { useQuery } from "@tanstack/react-query";
import type { UseGetFlightTestOrderOptions } from "./useGetFlightTestOrder";
import { useGetFlightTestOrder } from "./useGetFlightTestOrder";

export const getFlightTestOrderQueryKey = (flightTestOrderId: string) => ["FlightTestOrderV2", flightTestOrderId];

export const useGetFlightTestOrderQuery = (options: UseGetFlightTestOrderOptions) => {
    const { flightTestOrderId } = options;
    const { getFlightTestOrder } = useGetFlightTestOrder({ ...options, serviceOptions: { options: { manual: true } } });

    const { data: flightTestOrder, isLoading } = useQuery({
        queryKey: getFlightTestOrderQueryKey(flightTestOrderId),
        queryFn: getFlightTestOrder,
    });

    return { flightTestOrder, getFlightTestOrder, isLoading };
};
