import { useGetAllService } from "@voloiq/service";
import { PROMOTION_BASE_URL } from "../../serviceEndpoints";
import type { PromotionItem } from "./apiModels";

export const useGetPromotionItems = (promotionId: string) =>
    useGetAllService<PromotionItem>({
        params: {
            size: 10,
            page: 1,
        },
        route: `${PROMOTION_BASE_URL}/${promotionId}/promotion-items`,
    });
