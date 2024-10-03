import { useCreateService } from "@voloiq/service";
import { PROMOTION_BASE_URL } from "../../serviceEndpoints";
import { Discount, DiscountPayload, EarlyAccess, EarlyAccessPayload } from "./apiModels";

export const useUploadPromotion = () =>
    useCreateService<DiscountPayload | EarlyAccessPayload, Discount | EarlyAccess>({
        route: `${PROMOTION_BASE_URL}/upload`,
    });
