import { useGetService } from "@voloiq/service";
import { PROMOTION_BASE_URL } from "../../serviceEndpoints";
import type { Discount, EarlyAccess } from "./apiModels";

export const useGetPromotion = (promotionId: string) =>
    useGetService<Discount | EarlyAccess>({ resourceId: promotionId, route: PROMOTION_BASE_URL });
