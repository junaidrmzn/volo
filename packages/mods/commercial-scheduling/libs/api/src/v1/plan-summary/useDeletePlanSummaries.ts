import { useDeleteService } from "@voloiq/service";
import { COMMERCIAL_SCHEDULING } from "../../serviceEndpoints";

export const useDeletePlanSummaries = () =>
    useDeleteService({
        route: `${COMMERCIAL_SCHEDULING}/commercial-schedule-items`,
    });
