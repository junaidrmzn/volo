import { useCreateService } from "@voloiq/service";
import { FlightTestOrder } from "../../v2/flight-test-orders/apiModels";

export type UseFlightTestOrderRequestApprovalProps = {
    flightTestOrderId: string;
};

export const useFlightTestOrderRequestApproval = (props: UseFlightTestOrderRequestApprovalProps) => {
    const { flightTestOrderId } = props;
    const { sendRequest } = useCreateService<{}, FlightTestOrder>({
        route: `/ftd/v1/orders/${flightTestOrderId}/request-approval`,
    });

    return { flightTestOrderRequestApproval: sendRequest };
};
