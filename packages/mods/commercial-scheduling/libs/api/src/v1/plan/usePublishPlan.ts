import { useUpdateService } from "@voloiq/service";
import { PLAN_BASE_URL } from "../../serviceEndpoints";
import { Plan } from "./apiModels";

export const usePublishPlan = (planId: string) =>
    useUpdateService<{}, Plan>({ route: `${PLAN_BASE_URL}/${planId}/publish` });
