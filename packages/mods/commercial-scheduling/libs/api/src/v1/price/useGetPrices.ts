import { useGetService } from "@voloiq/service";
import { PLAN_BASE_URL } from "../../serviceEndpoints";
import { Price } from "./apiModels";

export const useGetPlanPrices = (planId: string) =>
    useGetService<Price>({ resourceId: "", route: `${PLAN_BASE_URL}/${planId}/commercial-prices` });
