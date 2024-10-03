import { useCreateService } from "@voloiq/service";
import { OFFER_BASE_URL } from "../../serviceEndpoints";
import { OfferItem, OfferItemInfo } from "./apiModel";

export const useCreateOfferItem = (offerId: string) =>
    useCreateService<OfferItemInfo, OfferItem>({
        route: `${OFFER_BASE_URL}/${offerId}/commercial-offer-items/all-days-all-routes`,
    });
