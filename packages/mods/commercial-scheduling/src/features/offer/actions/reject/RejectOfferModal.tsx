import { Box, Button, ButtonGroup, HStack, Text, Textarea, VStack, useToast } from "@volocopter/design-library-react";
import { Offer, useRejectOffer } from "@voloiq/commercial-scheduling-api/v1";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { useOfferTranslation } from "../../translations/useOfferTranslation";
import { useComments } from "./useComments";

type RejectOfferModalProps = {
    isOpen: boolean;
    offer: Offer;
    closeModal: () => void;
    refetchOffer: () => void;
};

export const RejectOfferModal = (props: RejectOfferModalProps) => {
    const { offer, isOpen, closeModal, refetchOffer } = props;
    const { sendRequest } = useRejectOffer(offer.id ?? "-1");
    const { t } = useOfferTranslation();
    const { comments, setComments } = useComments({ offer });
    const toast = useToast();

    const onReject = () => {
        sendRequest({
            data: { commercialOfferItems: offer.commercialOfferItems, comments },
        }).then(() => {
            refetchOffer();
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
