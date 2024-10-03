import { Icon, IconButton, useDisclosure } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { CreatePriceModal } from "./CreatePriceModal";

type Props = {
    priceId: string;
    refetchPrice: () => void;
    refetchPlan: () => void;
};

export const CreatePrice = (props: Props) => {
    const { priceId, refetchPrice, refetchPlan } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const canCreate = useIsAuthorizedTo(["create"], ["CommercialPricing"]);

    const onCreateSuccess = () => {
        refetchPlan();
        refetchPrice();
    };

    return (
        <>
            {canCreate && <IconButton aria-label="add" variant="ghost" icon={<Icon icon="add" />} onClick={onOpen} />}
            <CreatePriceModal isOpen={isOpen} priceId={priceId} closeModal={onClose} refetchPrice={onCreateSuccess} />
        </>
    );
};
