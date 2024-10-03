import { Icon, IconButton, useDisclosure } from "@volocopter/design-library-react";
import { useDeleteFlightTestOrder } from "@voloiq/flight-test-definition-api/v1";
import { ConfirmationModal } from "@voloiq/flight-test-definition-components";
import { useNavigate } from "@voloiq/routing";
import { useFlightTestOrderDetailsTranslation } from "../translations/useFlightTestOrderDetailsTranslation";

type DeleteFtoButtonProps = {
    flightTestOrderId: string;
};
export const DeleteFlightTestOrderButton = (props: DeleteFtoButtonProps) => {
    const { flightTestOrderId } = props;
    const {
        isOpen: isConfirmationModalOpen,
        onOpen: onOpenConfirmationModal,
        onClose: onCloseConfirmationModal,
    } = useDisclosure();

    const { t } = useFlightTestOrderDetailsTranslation();
    const { deleteFlightTestOrder } = useDeleteFlightTestOrder();
    const navigate = useNavigate();

    return (
        <>
            <IconButton
                aria-label={t("Delete")}
                onClick={onOpenConfirmationModal}
                icon={<Icon size={4} icon="delete" />}
                variant="secondary"
            />
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={onCloseConfirmationModal}
                title={t("Cancel Order")}
                type={t("Confirmation")}
                message={t(
                    "Are you sure you want to permanently cancel this order? Once canceled, it cannot be reversed"
                )}
                cancelButtonText={t("Go Back")}
                confirmButtonText={t("Cancel Order")}
                onConfirm={async () => {
                    await deleteFlightTestOrder(flightTestOrderId);
                    navigate("./..");
                }}
                confirmButtonIcon="delete"
            />
        </>
    );
};
