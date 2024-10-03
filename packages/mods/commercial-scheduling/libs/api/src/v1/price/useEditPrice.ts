import { usePatchService } from "@voloiq/service";
import { PRICE_ITEM_BASE_URL } from "../../serviceEndpoints";
import { Price, PricePayload } from "./apiModels";

export const useEditPrice = (priceId: string) =>
    usePatchService<PricePayload, Price>({ route: `${PRICE_ITEM_BASE_URL}/${priceId}` });
