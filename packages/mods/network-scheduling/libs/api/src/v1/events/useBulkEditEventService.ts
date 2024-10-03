import { useUpdateService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";
import type { Event, EventBulkUpdate } from "./apiModels";

export const useBulkEditEventService = () => {
    const { sendRequest } = useUpdateService<EventBulkUpdate, Event[]>({
        route: `${networkSchedulingManagementBaseUrl}/aircraft-events/bulk-edit`,
        options: { manual: true },
    });

    return { sendEventBulkEditRequest: sendRequest };
};
