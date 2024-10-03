import { useUpdateService } from "@voloiq/service";
import { PLAN_BASE_URL } from "../../serviceEndpoints";
import { Plan } from "./apiModels";

export const useApprovePlan = (planId: string) =>
    useUpdateService<Plan, Plan>({
        route: `${PLAN_BASE_URL}/${planId}/approve`,
    });
