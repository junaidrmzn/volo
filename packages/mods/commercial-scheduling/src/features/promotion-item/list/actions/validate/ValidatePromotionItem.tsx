import { Icon, IconButton, useDisclosure } from "@volocopter/design-library-react";
import { ReactElement } from "react";
import { PromotionItem } from "@voloiq/commercial-scheduling-api/v1";
import { usePromotionItemTranslation } from "../../../translations/usePromotionItemTranslation";
import { ValidatePromotionItemModal } from "./ValidatePromotionItemModal";

type Props = {
    promotionItem: PromotionItem;
    refetchPromotion: () => void;
};

export const ValidatePromotionItem = (props: Props): ReactElement | null => {
    const { promotionItem, refetchPromotion } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = usePromotionItemTranslation();

    return (
        <>
            <IconButton onClick={onOpen} aria-label={t("promotionItem.detailAriaLabel")} variant="ghost" size="md">
                <Icon icon="check" />
            </IconButton>
            <ValidatePromotionItemModal
                isOpen={isOpen}
                promotionItem={promotionItem}
                closeModal={onClose}
                refetchPromotion={refetchPromotion}
            />
        </>
    );
};
