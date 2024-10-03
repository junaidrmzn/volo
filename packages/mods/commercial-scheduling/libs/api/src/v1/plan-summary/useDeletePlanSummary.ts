import { useDeleteService } from "@voloiq/service";
import { PLAN_CUSTOMIZATION_BASE_URL } from "../../serviceEndpoints";

export const useDeletePlanSummary = (customCommercialScheduleItemId: string) =>
    useDeleteService({
        route: `${PLAN_CUSTOMIZATION_BASE_URL}/${customCommercialScheduleItemId}`,
    });
