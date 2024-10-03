import { useDeleteService } from "@voloiq/service";
import { PLAN_BASE_URL } from "../../serviceEndpoints";

export const useDeletePlan = (planId: string) => useDeleteService({ route: `${PLAN_BASE_URL}/${planId}` });
