import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@volocopter/design-library-react";
import { AxiosError } from "axios";
import { NonExecutedOrCancelledStatus } from "./flightTestOrderStatusGuard";
import { useUpdateFlightTestOrderStatusTranslation } from "./translations/useUpdateFlightTestOrderStatusTranslation";
import { useFlightTestStatusWorkFlow } from "./useFlightTestStatusWorkFlow";

export type UseUpdateFlightTestOrderProps = {
    flightTestOrderId: string;
    status: NonExecutedOrCancelledStatus;
    onClose: () => void;
};

export const useUpdateFlightTestOrderStatus = (props: UseUpdateFlightTestOrderProps) => {
    const { flightTestOrderId, status, onClose } = props;
    const queryClient = useQueryClient();

    const { updateFlightTestOrderStatus, canPerformAction } = useFlightTestStatusWorkFlow({
        flightTestOrderId,
        status,
    });

    const { t } = useUpdateFlightTestOrderStatusTranslation();
    const showToast = useToast();

    const showSuccessToast = () => {
        showToast({
            status: "success",
            title: t("Success"),
            description: t("Operation Successful"),
        });
    };

    const showErrorToast = (error: AxiosError) => {
        const errorDetails = error.response?.data.error.details.join(", ");
        showToast({
            status: "error",
            title: errorDetails ? `${t("Uh-oh!")} - ${t("Something went wrong updating the status")}` : t("Uh-oh!"),
            description: errorDetails || t("Something went wrong updating the status"),
        });
    };

    const onStatusUpdate = () => {
        updateFlightTestOrderStatus()
            .then(() => {
                queryClient.invalidateQueries(["FlightTestOrderV2"]);
                showSuccessToast();
                onClose();
            })
            .catch((error: AxiosError) => {
                const { response } = error;
                if (response && response.status === 400) {
                    showErrorToast(error);
                }
            });
    };

    return { onStatusUpdate, canPerformAction };
};
