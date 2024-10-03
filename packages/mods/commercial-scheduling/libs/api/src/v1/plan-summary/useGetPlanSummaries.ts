import { ServiceOptions, useGetAllService } from "@voloiq/service";
import { PLAN_BASE_URL } from "../../serviceEndpoints";
import type { PlanSummary } from "./apiModels";

type UseGetPlanSummariesOptions = Pick<ServiceOptions, "params" | "options">;

export const useGetPlanSummaries = (planId: string, options?: UseGetPlanSummariesOptions) =>
    useGetAllService<PlanSummary>({
        params: {
            size: 10,
            page: 1,
            ...options?.params,
        },
        route: `${PLAN_BASE_URL}/${planId}/summary`,
        ...options?.options,
    });
