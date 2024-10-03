import { Box, Button, ButtonGroup, HStack, Text, VStack } from "@volocopter/design-library-react";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { useOfferTranslation } from "../translations/useOfferTranslation";

type EditOfferModalProps = {
    isOpen: boolean;
    closeModal: () => void;
};

export const EditOfferConfirmModal = (props: EditOfferModalProps) => {
    const { isOpen, closeModal } = props;
    const { t } = useOfferTranslation();

    return (
        <CommercialSchedulingModal
            size="2xl"
            heading={t("modal.edit.confirm heading")}
            subHeading={t("modal.edit.confirm subheading")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <Box display="flex">
                <VStack boxSize="full" width="100%">
                    <Text mb={4}>{t("modal.edit.confirmation text")}</Text>
                    <Text alignSelf="flex-start">{t("modal.edit.confirmation question")}</Text>
                    <HStack alignSelf="flex-end" mt={6}>
                        <ButtonGroup isAttached>
                            <Button type="reset" onClick={closeModal}>
                                {t("labels.cancel")}
                            </Button>
                            <Button variant="primary" form="editOfferForm" type="submit">
                                {t("labels.edit")}
                            </Button>
                        </ButtonGroup>
                    </HStack>
                </VStack>
            </Box>
        </CommercialSchedulingModal>
    );
};
