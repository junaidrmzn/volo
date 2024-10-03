import { useUpdateService } from "@voloiq/service";
import { PROMOTION_ITEM_BASE_URL } from "../../serviceEndpoints";
import { PromotionItem, UpdatePromotionItemPayload, UpdatePromotionItemProps } from "./apiModels";

export const useUpdatePromotionItem = (status: UpdatePromotionItemProps) =>
    useUpdateService<UpdatePromotionItemPayload, PromotionItem>({
        route: `${PROMOTION_ITEM_BASE_URL}/${status}`,
    });
