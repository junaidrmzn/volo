import { useGetService } from "@voloiq/service";
import { PLAN_BASE_URL } from "../../serviceEndpoints";
import type { Plan } from "./apiModels";

export const useGetPlan = (planId: string) => useGetService<Plan>({ resourceId: planId, route: PLAN_BASE_URL });
