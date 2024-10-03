import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { FlightTestOrder, useDeclineFlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { createFormControl } from "@voloiq/form";
import { DeclineFlightTestOrderFormSchema, declineFlightTestOrderSchema } from "./declineFlightTestOrderSchema";
import { useUpdateFlightTestOrderStatusTranslation } from "./translations/useUpdateFlightTestOrderStatusTranslation";

export type UseFlightTestOrderDeclineStatusProps = {
    flightTestOrder: FlightTestOrder;
    onClose: () => void;
};

export const useFlightTestOrderDeclineStatus = (props: UseFlightTestOrderDeclineStatusProps) => {
    const { flightTestOrder, onClose } = props;
    const { t } = useUpdateFlightTestOrderStatusTranslation();
    const queryClient = useQueryClient();
    const schema = useMemo(() => declineFlightTestOrderSchema({ t }), [t]);
    const FormControl = createFormControl<DeclineFlightTestOrderFormSchema>();
    const { sendRequest } = useDeclineFlightTestOrder({ flightTestOrderId: flightTestOrder.id });
    const declineFto = async (props: { reason: string }) => {
        const { reason } = props;
        await sendRequest({ data: { reason } });
        queryClient.invalidateQueries(["FlightTestOrderV2"]);
        onClose();
    };
    return { declineFto, schema, FormControl };
};
