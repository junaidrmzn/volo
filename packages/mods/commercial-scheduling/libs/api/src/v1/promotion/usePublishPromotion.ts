import { useUpdateService } from "@voloiq/service";
import { PROMOTION_BASE_URL } from "../../serviceEndpoints";

export const usePublishPromotion = (promotionId: string) =>
    useUpdateService({ route: `${PROMOTION_BASE_URL}/${promotionId}/publish` });
