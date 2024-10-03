import { VStack } from "@volocopter/design-library-react";
import { PromotionItemHeader } from "./PromotionItemHeader";
import { PromotionItemListOverview } from "./list/PromotionItemListOverview";
import { usePromotionItem } from "./usePromotionItem";

export const PromotionItem = () => {
    const { promotion, refetchPromotion, navigateBack } = usePromotionItem();
    return promotion ? (
        <VStack width="full" height="full">
            <PromotionItemHeader
                promotion={promotion}
                refetchPromotion={refetchPromotion}
                navigateBack={navigateBack}
            />
            <PromotionItemListOverview promotion={promotion} />
        </VStack>
    ) : null;
};
