import { useGetService } from "@voloiq/service";
import { PLAN_BASE_URL } from "../../serviceEndpoints";
import { Offer } from "./apiModels";

export const useGetPlanOffers = (planId: string) =>
    useGetService<Offer>({ resourceId: "", route: `${PLAN_BASE_URL}/${planId}/commercial-offers` });
