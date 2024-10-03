import { useUpdateService } from "@voloiq/service";
import { PLAN_CUSTOMIZATION_BASE_URL } from "../../serviceEndpoints";
import { ApprovePlanSummaryPayload, PlanSummary } from "./apiModels";

export const useApprovePlanSummary = () =>
    useUpdateService<ApprovePlanSummaryPayload, PlanSummary>({
        route: `${PLAN_CUSTOMIZATION_BASE_URL}/approve`,
    });
