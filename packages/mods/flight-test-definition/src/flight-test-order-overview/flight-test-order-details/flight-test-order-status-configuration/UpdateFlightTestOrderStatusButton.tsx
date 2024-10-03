import { Button, Icon, useDisclosure } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { ConfirmationModal } from "@voloiq/flight-test-definition-components";
import { NonExecutedOrCancelledStatus } from "./flightTestOrderStatusGuard";
import { useUpdateFlightTestOrderStatusTranslation } from "./translations/useUpdateFlightTestOrderStatusTranslation";
import { useUpdateFlightTestOrderStatus } from "./useUpdateFlightTestOrderStatus";

export type UpdateFlightTestOrderStatusButtonProps = {
    flightTestOrderId: string;
    status: NonExecutedOrCancelledStatus;
    missionTitle: string;
};
export const UpdateFlightTestOrderStatusButton = (props: UpdateFlightTestOrderStatusButtonProps) => {
    const { flightTestOrderId, missionTitle, status } = props;
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { t } = useUpdateFlightTestOrderStatusTranslation();
    const { onStatusUpdate, canPerformAction } = useUpdateFlightTestOrderStatus({ flightTestOrderId, status, onClose });

    const { buttonLabel, modalContent, modalTitle } = match(status)
        .with("DRAFT", () => ({
            buttonLabel: t("Request Mission Approval"),
            modalTitle: t("Request Mission Approval"),
            modalContent: t("modalContent.Request Mission Approval", { ftoName: missionTitle }),
        }))
        .with("AWAITING_APPROVAL", () => ({
            buttonLabel: t("Approve Mission"),
            modalTitle: t("Approve Verification Request"),
            modalContent: t("modalContent.Approve Verification Request", { ftoName: missionTitle }),
        }))
        .with("APPROVED", () => ({
            buttonLabel: t("Release Mission"),
            modalTitle: t("Release Mission"),
            modalContent: t("modalContent.Release Mission", { ftoName: missionTitle }),
        }))
        .with("RELEASED", () => ({
            buttonLabel: t("Mission Executed"),
            modalTitle: t("Mission Executed"),
            modalContent: t("modalContent.Mission Executed", { ftoName: missionTitle }),
        }))
        .exhaustive();

    return (
        <>
            {canPerformAction && (
                <Button
                    aria-label={t("Update Status Button")}
                    onClick={() => {
                        onOpen();
                    }}
                    {...(status !== "DRAFT" && { leftIcon: <Icon size={4} icon="check" /> })}
                    variant="primary"
                >
                    {buttonLabel}
                </Button>
            )}
            <ConfirmationModal
                isOpen={isOpen}
                onClose={onClose}
                title={modalTitle}
                type={t("Confirmation")}
                message={modalContent}
                onConfirm={() => {
                    onStatusUpdate();
                }}
                {...(status !== "DRAFT" && { confirmButtonText: buttonLabel })}
                showConfirmIconButton={status !== "DRAFT"}
                confirmButtonVariant="primary"
                cancelButtonVariant="secondary"
            />
        </>
    );
};
