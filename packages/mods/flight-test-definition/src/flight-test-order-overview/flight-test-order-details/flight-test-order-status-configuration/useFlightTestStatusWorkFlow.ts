import { match } from "ts-pattern";
import { useIsAuthorizedTo } from "@voloiq/auth";
import {
    useFlightTestOrderApprove,
    useFlightTestOrderExecute,
    useFlightTestOrderRelease,
    useFlightTestOrderRequestApproval,
} from "@voloiq/flight-test-definition-api/v1";
import { NonExecutedOrCancelledStatus } from "./flightTestOrderStatusGuard";

export type UseFlightTestStatusWorkFlowProps = {
    flightTestOrderId: string;
    status: NonExecutedOrCancelledStatus;
};
export const useFlightTestStatusWorkFlow = (props: UseFlightTestStatusWorkFlowProps) => {
    const { flightTestOrderId, status } = props;

    const { flightTestOrderRequestApproval } = useFlightTestOrderRequestApproval({ flightTestOrderId });
    const { flightTestOrderApprove } = useFlightTestOrderApprove({ flightTestOrderId });
    const { flightTestOrderRelease } = useFlightTestOrderRelease({ flightTestOrderId });
    const { flightTestOrderExecute } = useFlightTestOrderExecute({ flightTestOrderId });
    const canApprove = useIsAuthorizedTo(["create"], ["FlightTestOrderApprove"]);
    const canRelease = useIsAuthorizedTo(["create"], ["FlightTestOrderRelease"]);
    const canExecute = useIsAuthorizedTo(["create"], ["FlightTestOrderExecute"]);

    const { action, canPerformAction } = match(status)
        .with("DRAFT", () => ({ action: () => flightTestOrderRequestApproval(), canPerformAction: true }))
        .with("AWAITING_APPROVAL", () => ({ action: () => flightTestOrderApprove(), canPerformAction: canApprove }))
        .with("APPROVED", () => ({ action: () => flightTestOrderRelease(), canPerformAction: canRelease }))
        .with("RELEASED", () => ({ action: () => flightTestOrderExecute(), canPerformAction: canExecute }))
        .exhaustive();

    return { updateFlightTestOrderStatus: action, canPerformAction };
};
