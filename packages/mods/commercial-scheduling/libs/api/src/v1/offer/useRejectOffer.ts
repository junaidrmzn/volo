import { useUpdateService } from "@voloiq/service";
import { OFFER_BASE_URL } from "../../serviceEndpoints";
import { Offer, RejectOfferPayload } from "./apiModels";

export const useRejectOffer = (offerId: string) =>
    useUpdateService<RejectOfferPayload, Offer>({
        route: `${OFFER_BASE_URL}/${offerId}/reject`,
    });
