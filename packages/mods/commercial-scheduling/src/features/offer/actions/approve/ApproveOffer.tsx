import { Button, useDisclosure } from "@volocopter/design-library-react";
import { ReactElement } from "react";
import { Offer } from "@voloiq/commercial-scheduling-api/v1";
import { useOfferTranslation } from "../../translations/useOfferTranslation";
import { ApproveOfferModal } from "./ApproveOfferModal";

type Props = {
    offer: Offer;
    refetchOffer: () => void;
};

export const ApproveOffer = (props: Props): ReactElement | null => {
    const { offer, refetchOffer } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useOfferTranslation();
    const canBeApproved = offer.status === "AWAITING_APPROVAL";

    return (
        <>
            <Button variant="primary" size="md" isDisabled={!canBeApproved} onClick={onOpen}>
                {t("actions.approve.title")}
            </Button>
            <ApproveOfferModal isOpen={isOpen} offer={offer} closeModal={onClose} refetchOffer={refetchOffer} />
        </>
    );
};
