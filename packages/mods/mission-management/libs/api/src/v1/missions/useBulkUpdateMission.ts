import { useUpdateService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";
import type { Mission, MissionBulkUpdate } from "./apiModel";

export const useBulkUpdateMission = () => {
    const { sendRequest } = useUpdateService<MissionBulkUpdate, Mission[]>({
        route: `${networkSchedulingManagementBaseUrl}/missions/bulk-edit`,
        options: { manual: true },
    });

    return { sendMissionBulkEditRequest: sendRequest };
};
