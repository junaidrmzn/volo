import { Box, Button, ButtonGroup, HStack, Text, VStack, useToast } from "@volocopter/design-library-react";
import { PromotionItem, useUpdatePromotionItem } from "@voloiq/commercial-scheduling-api/v1";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { usePromotionItemTranslation } from "../../../translations/usePromotionItemTranslation";

type ValidatePromotionItemProps = {
    isOpen: boolean;
    promotionItem: PromotionItem;
    closeModal: () => void;
    refetchPromotion: () => void;
};

export const ValidatePromotionItemModal = (props: ValidatePromotionItemProps) => {
    const { promotionItem, isOpen, closeModal, refetchPromotion } = props;
    const { t } = usePromotionItemTranslation();
    const { sendRequest } = useUpdatePromotionItem("re-validate");
    const toast = useToast();

    const onApprove = () => {
        sendRequest({
            data: { promotionItems: [promotionItem] },
        }).then(() => {
            refetchPromotion();
            closeModal();
            toast({
                status: "success",
                title: t("modal.revalidate.toast.success.title"),
                description: t("modal.revalidate.toast.success.description"),
            });
        });
    };

    return (
        <CommercialSchedulingModal
            size="2xl"
            heading={t("modal.revalidate.heading")}
            subHeading={t("modal.revalidate.subheading")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <Box display="flex">
                <VStack boxSize="full" width="100%">
                    <Text mb={2}>{t("modal.revalidate.description")}</Text>
                    <HStack alignSelf="flex-end">
                        <ButtonGroup isAttached>
                            <Button onClick={closeModal}>{t("generic.cancel")}</Button>
                            <Button variant="primary" onClick={onApprove}>
                                {t("modal.revalidate.button")}
                            </Button>
                        </ButtonGroup>
                    </HStack>
                </VStack>
            </Box>
        </CommercialSchedulingModal>
    );
};
