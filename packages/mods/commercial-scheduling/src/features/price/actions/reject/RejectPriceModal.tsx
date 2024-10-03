import { Box, Button, ButtonGroup, HStack, Text, Textarea, VStack, useToast } from "@volocopter/design-library-react";
import { Price, useRejectPrice } from "@voloiq/commercial-scheduling-api/v1";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { usePriceTranslation } from "../../translations/usePriceTranslation";
import { useComments } from "./useComments";

type RejectPriceModalProps = {
    isOpen: boolean;
    price: Price;
    closeModal: () => void;
    refetchPrice: () => void;
};

export const RejectPriceModal = (props: RejectPriceModalProps) => {
    const { price, isOpen, closeModal, refetchPrice } = props;
    const { sendRequest } = useRejectPrice(price.id ?? "-1");
    const { t } = usePriceTranslation();
    const { comments, setComments } = useComments({ price });
    const toast = useToast();

    const onReject = () => {
        sendRequest({
            data: { commercialPriceItems: price.commercialPriceItems, comments },
        }).then(() => {
            refetchPrice();
            closeModal();
            toast({
                status: "success",
                title: t("actions.reject.toast.title"),
                description: t("actions.reject.toast.description"),
            });
        });
    };

    return (
        <CommercialSchedulingModal
            size="2xl"
            heading={t("actions.reject.modal.heading")}
            subHeading={t("actions.reject.modal.subheading")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <Box display="flex">
                <VStack boxSize="full" width="100%">
                    <Text mb={2}>{t("actions.reject.modal.description")}</Text>
                    <Textarea
                        placeholder={t("actions.reject.modal.placeholder")}
                        value={comments}
                        onChange={(event) => setComments(event.target.value)}
                    />
                    <HStack alignSelf="flex-end">
                        <ButtonGroup isAttached>
                            <Button type="reset" onClick={closeModal}>
                                {t("labels.cancel")}
                            </Button>
                            <Button variant="primary" onClick={onReject}>
                                {t("actions.reject.modal.Reject")}
                            </Button>
                        </ButtonGroup>
                    </HStack>
                </VStack>
            </Box>
        </CommercialSchedulingModal>
    );
};
