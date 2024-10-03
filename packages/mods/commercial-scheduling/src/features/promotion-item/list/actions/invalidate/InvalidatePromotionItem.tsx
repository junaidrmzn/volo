import { Icon, IconButton, useDisclosure } from "@volocopter/design-library-react";
import { ReactElement } from "react";
import { PromotionItem } from "@voloiq/commercial-scheduling-api/v1";
import { usePromotionItemTranslation } from "../../../translations/usePromotionItemTranslation";
import { InvalidatePromotionItemModal } from "./InvalidatePromotionItemModal";

type Props = {
    promotionItem: PromotionItem;
    refetchPromotion: () => void;
};

export const InvalidatePromotionItem = (props: Props): ReactElement | null => {
    const { promotionItem, refetchPromotion } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = usePromotionItemTranslation();
    const canBeInvalidated = promotionItem.status === "CREATED";

    return (
        <>
            <IconButton
                aria-label={t("promotionItem.detailAriaLabel")}
                variant="ghost"
                size="md"
                isDisabled={!canBeInvalidated}
                onClick={onOpen}
            >
                <Icon icon="close" />
            </IconButton>
            <InvalidatePromotionItemModal
                isOpen={isOpen}
                promotionItem={promotionItem}
                closeModal={onClose}
                refetchPromotion={refetchPromotion}
            />
        </>
    );
};
