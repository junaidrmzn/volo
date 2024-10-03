import { useUpdateService } from "@voloiq/service";
import { PRICE_BASE_URL } from "../../serviceEndpoints";
import { ApprovePayload, Price } from "./apiModels";

export const useApprovePrice = (priceId: string) =>
    useUpdateService<ApprovePayload, Price>({
        route: `${PRICE_BASE_URL}/${priceId}/approve`,
    });
