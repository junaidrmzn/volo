import { useOptimisticEdit } from "@voloiq/utils";
import { useEditFlightTestOrder } from "./useEditFlightTestOrder";
import { getFlightTestOrderQueryKey } from "./useGetFlightTestOrderQuery";

export type UseOptimisticEditFlightTestOrder = {
    flightTestOrderId: string;
    onError?: () => void;
};

export const useOptimisticEditFlightTestOrder = (options: UseOptimisticEditFlightTestOrder) => {
    const { flightTestOrderId, onError } = options;

    const { editFlightTestOrder } = useEditFlightTestOrder(flightTestOrderId);
    const { optimisticEdit: optimisticEditFlightTestOrder } = useOptimisticEdit({
        editResource: editFlightTestOrder,
        onError,
        queryKey: getFlightTestOrderQueryKey(flightTestOrderId),
    });

    return { optimisticEditFlightTestOrder };
};
