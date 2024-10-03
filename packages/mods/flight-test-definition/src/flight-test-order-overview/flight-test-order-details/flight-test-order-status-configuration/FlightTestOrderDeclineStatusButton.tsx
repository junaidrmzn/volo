import { Box, Button, Icon, useDisclosure, useToast } from "@volocopter/design-library-react";
import { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { ConfirmationModal } from "@voloiq/flight-test-definition-components";
import { FormProvider } from "@voloiq/form";
import { useUpdateFlightTestOrderStatusTranslation } from "./translations/useUpdateFlightTestOrderStatusTranslation";
import { useFlightTestOrderDeclineStatus } from "./useFlightTestOrderDeclineStatus";

export type FlightTestOrderDeclineStatusButtonProps = {
    flightTestOrder: FlightTestOrder;
};

export const FlightTestOrderDeclineStatusButton = (props: FlightTestOrderDeclineStatusButtonProps) => {
    const { flightTestOrder } = props;
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { t } = useUpdateFlightTestOrderStatusTranslation();
    const { declineFto, FormControl, schema } = useFlightTestOrderDeclineStatus({ flightTestOrder, onClose });
    const formId = "declineForm";
    const sendToast = useToast();

    return (
        <>
            <Button
                onClick={() => {
                    onOpen();
                }}
                leftIcon={<Icon size={4} icon="close" />}
                variant="secondary"
            >
                {t("Decline")}
            </Button>
            <ConfirmationModal
                isOpen={isOpen}
                onClose={onClose}
                title={t("declineModal.Reject Verification Request")}
                type={t("Confirmation")}
                message={t("declineModal.modalBody", { FTO: flightTestOrder.missionTitle })}
                onConfirm={() => {}}
                confirmButtonText={t("declineModal.Decline Request")}
                confirmButtonVariant="primary"
                cancelButtonVariant="secondary"
                formId={formId}
                confirmationFormFields={
                    <Box width="100%">
                        <FormProvider
                            formType="create"
                            formId={formId}
                            onCreate={async (data) => {
                                try {
                                    await declineFto({ reason: data?.descriptionText });
                                    sendToast({
                                        status: "success",
                                        title: t("Success"),
                                        description: t("Operation Successful"),
                                    });
                                } catch {
                                    sendToast({
                                        status: "error",
                                        title: t("Uh-oh!"),
                                        description: t("Something went wrong updating the status"),
                                    });
                                    onClose();
                                }
                            }}
                            schema={schema}
                        >
                            <FormControl fieldName="descriptionText" />
                        </FormProvider>
                    </Box>
                }
            />
        </>
    );
};
