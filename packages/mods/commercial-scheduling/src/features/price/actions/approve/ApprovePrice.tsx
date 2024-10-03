import { Button, useDisclosure } from "@volocopter/design-library-react";
import { Price } from "@voloiq/commercial-scheduling-api/v1";
import { usePriceTranslation } from "../../translations/usePriceTranslation";
import { ApprovePriceModal } from "./ApprovePriceModal";

type Props = {
    price: Price;
    refetchPrice: () => void;
};

export const ApprovePrice = (props: Props) => {
    const { price, refetchPrice } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = usePriceTranslation();
    const canBeApproved = price.status === "AWAITING_APPROVAL";

    return (
        <>
            <Button variant="primary" size="md" isDisabled={!canBeApproved} onClick={onOpen}>
                {t("actions.approve.title")}
            </Button>
            <ApprovePriceModal isOpen={isOpen} price={price} closeModal={onClose} refetchPrice={refetchPrice} />
        </>
    );
};
