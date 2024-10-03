import { usePatchService } from "@voloiq/service";
import { PLAN_BASE_URL } from "../../serviceEndpoints";
import { Plan, PlanUpdate } from "./apiModels";

export const useUpdatePlan = (planId: string) =>
    usePatchService<PlanUpdate, Plan>({ resourceId: planId, route: PLAN_BASE_URL });
