import { Button, useDisclosure } from "@volocopter/design-library-react";
import { Price } from "@voloiq/commercial-scheduling-api/v1";
import { usePriceTranslation } from "../../translations/usePriceTranslation";
import { RejectPriceModal } from "./RejectPriceModal";

type Props = {
    price: Price;
    refetchPrice: () => void;
};

export const RejectPrice = (props: Props) => {
    const { price, refetchPrice } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = usePriceTranslation();
    const canBeRejected = price.status === "AWAITING_APPROVAL";

    return (
        <>
            <Button variant="secondary" size="md" isDisabled={!canBeRejected} onClick={onOpen}>
                {t("actions.reject.title")}
            </Button>
            <RejectPriceModal isOpen={isOpen} price={price} closeModal={onClose} refetchPrice={refetchPrice} />
        </>
    );
};
