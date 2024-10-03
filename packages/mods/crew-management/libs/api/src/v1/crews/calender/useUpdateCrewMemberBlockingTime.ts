import { ServiceOptions, useUpdateService } from "@voloiq/service";
import { crewManagementBaseUrl } from "../../crewManagementBaseUrl";
import { CrewMemberCalenderBlockingTimeBase } from "./apiModels";

export type useUpdateCrewMemberBlockingTimeOptions = Partial<ServiceOptions> & {
    crewMemberId: string;
    blockingTimeId: string;
};

export const useUpdateCrewMemberBlockingTime = (options: useUpdateCrewMemberBlockingTimeOptions) => {
    const { crewMemberId, blockingTimeId } = options;
    const { sendRequest, state } = useUpdateService<CrewMemberCalenderBlockingTimeBase, {}>({
        route: `${crewManagementBaseUrl}/crew-management/${crewMemberId}/calendar/${blockingTimeId}`,
    });

    return {
        sendRequestUpdateCrewMemberBlockingTime: sendRequest,
        isLoadingUpdateCrewMemberBlockingTime: state === "pending",
        state,
    };
};
