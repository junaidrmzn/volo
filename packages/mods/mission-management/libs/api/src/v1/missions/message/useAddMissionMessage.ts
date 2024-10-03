import { useCreateService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import type { MessageInformation, MessageInformationCreate } from "./apiModels";

export type UseAddMissionMessageOptions = {
    missionId: string;
};
export const useAddMissionMessage = (options: UseAddMissionMessageOptions) => {
    const { missionId } = options;
    return useCreateService<MessageInformationCreate, MessageInformation>({
        route: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/message`,
    });
};
