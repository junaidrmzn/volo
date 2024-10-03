import { Button, useDisclosure } from "@volocopter/design-library-react";
import { ReactElement } from "react";
import { Offer } from "@voloiq/commercial-scheduling-api/v1";
import { useOfferTranslation } from "../../translations/useOfferTranslation";
import { RejectOfferModal } from "./RejectOfferModal";

type Props = {
    offer: Offer;
    refetchOffer: () => void;
};

export const RejectOffer = (props: Props): ReactElement | null => {
    const { offer, refetchOffer } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useOfferTranslation();
    const canBeRejected = offer.status === "AWAITING_APPROVAL";

    return (
        <>
            <Button variant="secondary" size="md" isDisabled={!canBeRejected} onClick={onOpen}>
                {t("actions.reject.title")}
            </Button>
            <RejectOfferModal isOpen={isOpen} offer={offer} closeModal={onClose} refetchOffer={refetchOffer} />
        </>
    );
};
