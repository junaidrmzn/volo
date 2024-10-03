import { Box, Button, ButtonGroup, HStack, Text, VStack, useToast } from "@volocopter/design-library-react";
import { PromotionItem, useUpdatePromotionItem } from "@voloiq/commercial-scheduling-api/v1";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { usePromotionItemTranslation } from "../../../translations/usePromotionItemTranslation";

type InvalidatePromotionItemProps = {
    isOpen: boolean;
    promotionItem: PromotionItem;
    closeModal: () => void;
    refetchPromotion: () => void;
};

export const InvalidatePromotionItemModal = (props: InvalidatePromotionItemProps) => {
    const { promotionItem, isOpen, closeModal, refetchPromotion } = props;
    const { t } = usePromotionItemTranslation();
    const { sendRequest } = useUpdatePromotionItem("invalidate");
    const toast = useToast();

    const onApprove = () => {
        sendRequest({
            data: { promotionItems: [promotionItem] },
        }).then(() => {
            refetchPromotion();
            closeModal();
            toast({
                status: "success",
                title: t("modal.invalidate.toast.success.title"),
                description: t("modal.invalidate.toast.success.description"),
            });
        });
    };

    return (
        <CommercialSchedulingModal
            size="2xl"
            heading={t("modal.invalidate.heading")}
            subHeading={t("modal.invalidate.subheading")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <Box display="flex">
                <VStack boxSize="full" width="100%">
                    <Text mb={2}>{t("modal.invalidate.description")}</Text>
                    <HStack alignSelf="flex-end">
                        <ButtonGroup isAttached>
                            <Button onClick={closeModal}>{t("generic.cancel")}</Button>
                            <Button variant="primary" onClick={onApprove}>
                                {t("modal.invalidate.button")}
                            </Button>
                        </ButtonGroup>
                    </HStack>
                </VStack>
            </Box>
        </CommercialSchedulingModal>
    );
};
