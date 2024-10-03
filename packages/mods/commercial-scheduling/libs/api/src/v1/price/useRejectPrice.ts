import { useUpdateService } from "@voloiq/service";
import { PRICE_BASE_URL } from "../../serviceEndpoints";
import { Price, RejectPayload } from "./apiModels";

export const useRejectPrice = (priceId: string) =>
    useUpdateService<RejectPayload, Price>({
        route: `${PRICE_BASE_URL}/${priceId}/reject`,
    });
