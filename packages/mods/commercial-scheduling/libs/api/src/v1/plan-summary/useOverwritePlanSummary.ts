import { useUpdateService } from "@voloiq/service";
import { PLAN_CUSTOMIZATION_BASE_URL } from "../../serviceEndpoints";
import { PlanSummary, PlanSummaryCustomization } from "./apiModels";

export const useOverwritePlanSummary = (customScheduleId: string) =>
    useUpdateService<PlanSummaryCustomization, PlanSummary>({
        route: `${PLAN_CUSTOMIZATION_BASE_URL}/${customScheduleId}/overwrite`,
    });
