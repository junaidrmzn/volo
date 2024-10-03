import { useCreateService } from "@voloiq/service";
import { FlightTestOrder } from "./apiModels";

export type UseFlightTestOrderReleaseProps = {
    flightTestOrderId: string;
};

export const useFlightTestOrderRelease = (props: UseFlightTestOrderReleaseProps) => {
    const { flightTestOrderId } = props;
    const { sendRequest } = useCreateService<{}, FlightTestOrder>({
        route: `/ftd/v1/orders/${flightTestOrderId}/release`,
    });

    return { flightTestOrderRelease: sendRequest };
};
