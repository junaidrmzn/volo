import { Icon, IconButton, useDisclosure } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Offer } from "@voloiq/commercial-scheduling-api/v1";
import { EditOfferModal } from "./EditOfferModal";

type Props = {
    offer: Offer;
    isPlanPublished: boolean;
    refetchOffer: () => void;
    refetchPlan: () => void;
};

export const EditOffer = (props: Props) => {
    const {
        offer: { commercialOfferItems, status },
        isPlanPublished,
        refetchOffer,
        refetchPlan,
    } = props;
    const offerItem = commercialOfferItems[0];
    const isOfferDraft = status === "DRAFT";
    const { isOpen, onOpen, onClose } = useDisclosure();
    const canEdit = useIsAuthorizedTo(["create"], ["CommercialOffering"]);

    const onEditSuccess = () => {
        refetchPlan();
        refetchOffer();
    };

    return (
        <>
            {canEdit && (
                <IconButton
                    aria-label="edit"
                    variant="ghost"
                    icon={<Icon icon="penWithBox" />}
                    onClick={onOpen}
                    isDisabled={isPlanPublished}
                />
            )}
            {offerItem && (
                <EditOfferModal
                    isOpen={isOpen}
                    isOfferDraft={isOfferDraft}
                    offerItem={offerItem}
                    closeModal={onClose}
                    reloadList={onEditSuccess}
                />
            )}
        </>
    );
};
