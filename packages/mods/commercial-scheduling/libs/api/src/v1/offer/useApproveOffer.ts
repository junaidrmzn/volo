import { useUpdateService } from "@voloiq/service";
import { OFFER_BASE_URL } from "../../serviceEndpoints";
import { ApproveOfferPayload, Offer } from "./apiModels";

export const useApproveOffer = (offerId: string) =>
    useUpdateService<ApproveOfferPayload, Offer>({
        route: `${OFFER_BASE_URL}/${offerId}/approve`,
    });
