import { usePatchService } from "@voloiq/service";
import { PRICE_BASE_URL } from "../../serviceEndpoints";
import { Price, UpdateStatusPayload } from "./apiModels";

export const useUpdatePriceStatus = (priceId: string) =>
    usePatchService<UpdateStatusPayload, Price>({ route: `${PRICE_BASE_URL}/${priceId}` });
