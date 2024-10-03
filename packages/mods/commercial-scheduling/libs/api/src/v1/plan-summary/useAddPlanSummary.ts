import { useCreateService } from "@voloiq/service";
import { PLAN_CUSTOMIZATION_BASE_URL } from "../../serviceEndpoints";
import { PlanSummary, PlanSummaryCustomization } from "./apiModels";

export const useAddPlanSummary = () =>
    useCreateService<PlanSummaryCustomization, PlanSummary>({
        route: `${PLAN_CUSTOMIZATION_BASE_URL}`,
    });
