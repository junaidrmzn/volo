import { useGetService } from "@voloiq/service";
import { PLAN_PROCESS_BASE_URL } from "../../serviceEndpoints";
import { PlanProcessProgress } from "./apiModel";

export const useGetPlanProcessProgress = (processId: string) =>
    useGetService<PlanProcessProgress>({
        resourceId: "",
        route: `${PLAN_PROCESS_BASE_URL}/${processId}/progress`,
        options: { manual: true },
    });
