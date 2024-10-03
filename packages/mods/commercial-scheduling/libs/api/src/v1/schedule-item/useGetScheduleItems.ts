import { useGetAllService } from "@voloiq/service";
import { SCHEDULE_BASE_URL } from "../../serviceEndpoints";
import type { ScheduleItem } from "./apiModels";

export const useGetScheduleItems = (scheduleId: string) =>
    useGetAllService<ScheduleItem>({
        params: {
            size: 10,
            page: 1,
        },
        route: `${SCHEDULE_BASE_URL}/${scheduleId}/commercial-schedule-items`,
    });
