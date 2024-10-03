import { useGetFlightTestOrderQuery } from "@voloiq/flight-test-definition-api/v2";

export type UseTestPointSequenceDetails = {
    flightTestOrderId: string;
};
export const useTestPointSequenceDetails = (props: UseTestPointSequenceDetails) => {
    const { flightTestOrderId } = props;

    const { flightTestOrder } = useGetFlightTestOrderQuery({ flightTestOrderId });

    const isFtoEditable = flightTestOrder?.status === "DRAFT" || flightTestOrder?.status === "AWAITING_APPROVAL";

    return { flightTestOrder, isFtoEditable };
};
