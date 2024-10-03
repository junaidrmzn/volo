import { Box, Button, ButtonGroup, HStack, Text, VStack, useToast } from "@volocopter/design-library-react";
import { Price, useApprovePrice } from "@voloiq/commercial-scheduling-api/v1";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { usePriceTranslation } from "../../translations/usePriceTranslation";

type ApprovePriceModalProps = {
    isOpen: boolean;
    price: Price;
    closeModal: () => void;
    refetchPrice: () => void;
};

export const ApprovePriceModal = (props: ApprovePriceModalProps) => {
    const { price, isOpen, closeModal, refetchPrice } = props;
    const { t } = usePriceTranslation();
    const { sendRequest } = useApprovePrice(price.id ?? "-1");
    const toast = useToast();

    const onApprove = () => {
        sendRequest({
            data: {
                commercialPriceItems: price.commercialPriceItems,
            },
        }).then(() => {
            refetchPrice();
            closeModal();
            toast({
                status: "success",
                title: t("actions.approve.toast.title"),
                description: t("actions.approve.toast.description"),
            });
        });
    };

    return (
        <CommercialSchedulingModal
            size="2xl"
            heading={t("actions.approve.modal.heading")}
            subHeading={t("actions.approve.modal.subheading")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <Box display="flex">
                <VStack boxSize="full" width="100%">
                    <Text mb={2}>{t("actions.approve.modal.description")}</Text>
                    <HStack alignSelf="flex-end">
                        <ButtonGroup isAttached>
                            <Button onClick={closeModal}>{t("labels.cancel")}</Button>
                            <Button variant="primary" onClick={onApprove}>
                                {t("actions.approve.modal.Approve")}
                            </Button>
                        </ButtonGroup>
                    </HStack>
                </VStack>
            </Box>
        </CommercialSchedulingModal>
    );
};
