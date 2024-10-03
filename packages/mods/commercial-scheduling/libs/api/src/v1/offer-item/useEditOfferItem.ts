import { usePatchService } from "@voloiq/service";
import { OFFER_ITEM_BASE_URL } from "../../serviceEndpoints";

export const useEditOfferItem = (offerItemId: string) =>
    usePatchService({ route: `${OFFER_ITEM_BASE_URL}/${offerItemId}` });
