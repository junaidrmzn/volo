import { ServiceOptions, useDeleteService } from "@voloiq/service";
import { crewManagementBaseUrl } from "../../crewManagementBaseUrl";

export type useDeleteCrewMemberBlockingTimeOptions = Partial<ServiceOptions> & {
    crewMemberId: string;
    blockingTimeId: string;
};

export const useDeleteCrewMemberBlockingTime = (options: useDeleteCrewMemberBlockingTimeOptions) => {
    const { crewMemberId, blockingTimeId } = options;
    const { sendRequest, state } = useDeleteService({
        route: `${crewManagementBaseUrl}/crew-management/${crewMemberId}/calendar/${blockingTimeId}`,
    });

    return {
        sendRequestDeleteCrewMemberBlockingTime: sendRequest,
        isLoadingDeleteCrewMemberBlockingTime: state === "pending",
        state,
    };
};
