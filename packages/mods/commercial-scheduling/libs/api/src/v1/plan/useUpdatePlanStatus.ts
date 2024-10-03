import { useUpdateService } from "@voloiq/service";
import { PLAN_BASE_URL } from "../../serviceEndpoints";
import { Plan, PlanStatus } from "./apiModels";

export const useUpdatePlanStatus = (planId: string) =>
    useUpdateService<{ status: PlanStatus }, Plan>({ route: `${PLAN_BASE_URL}/${planId}/request-approval` });
