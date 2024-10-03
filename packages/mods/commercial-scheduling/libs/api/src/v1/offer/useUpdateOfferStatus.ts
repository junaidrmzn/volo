import { usePatchService } from "@voloiq/service";
import { OFFER_BASE_URL } from "../../serviceEndpoints";
import { Offer, OfferStatus } from "./apiModels";

export const useUpdateOfferStatus = (offerId: string) =>
    usePatchService<{ status: OfferStatus }, Offer>({ route: `${OFFER_BASE_URL}/${offerId}` });
