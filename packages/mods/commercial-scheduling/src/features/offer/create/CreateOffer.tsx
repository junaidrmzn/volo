import { Icon, IconButton, useDisclosure } from "@volocopter/design-library-react";
import { ReactElement } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Offer } from "@voloiq/commercial-scheduling-api/v1";
import { CreateOfferModal } from "./CreateOfferModal";

type Props = {
    offer: Offer;
    refetchOffer: () => void;
    refetchPlan: () => void;
};

export const CreateOffer = (props: Props): ReactElement | null => {
    const {
        offer: { id },
        refetchOffer,
        refetchPlan,
    } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const canCreate = useIsAuthorizedTo(["create"], ["CommercialOffering"]);

    const onSuccess = () => {
        refetchOffer();
        refetchPlan();
    };

    return (
        <>
            {canCreate && <IconButton aria-label="add" variant="ghost" icon={<Icon icon="add" />} onClick={onOpen} />}
            <CreateOfferModal isOpen={isOpen} offerId={id} closeModal={onClose} reloadList={onSuccess} />
        </>
    );
};
