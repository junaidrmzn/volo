import { Icon, IconButton, useDisclosure } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Price } from "@voloiq/commercial-scheduling-api/v1";
import { EditPriceModal } from "./EditPriceModal";

type Props = {
    price: Price;
    isPlanPublished: boolean;
    refetchPrice: () => void;
    refetchPlan: () => void;
};

export const EditPrice = (props: Props) => {
    const { price, isPlanPublished, refetchPrice, refetchPlan } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const canEdit = useIsAuthorizedTo(["update"], ["CommercialPricing"]);

    const onEditSuccess = () => {
        refetchPlan();
        refetchPrice();
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
            <EditPriceModal isOpen={isOpen} price={price} closeModal={onClose} onEditSuccess={onEditSuccess} />
        </>
    );
};
