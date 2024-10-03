import { ServiceOptions, useCreateService } from "@voloiq/service";
import { crewManagementBaseUrl } from "../../crewManagementBaseUrl";
import { CrewMemberCalenderBlockingTimeBase } from "./apiModels";

export type useAddCrewMemberBlockingTimeOptions = Partial<ServiceOptions> & {
    crewMemberId: string;
};

export const useAddCrewMemberBlockingTime = (options: useAddCrewMemberBlockingTimeOptions) => {
    const { crewMemberId } = options;
    const { sendRequest, state } = useCreateService<CrewMemberCalenderBlockingTimeBase, {}>({
        route: `${crewManagementBaseUrl}/crew-management/${crewMemberId}/calendar/block`,
    });

    return {
        sendRequestAddCrewMemberBlockingTime: sendRequest,
        isLoadingAddCrewMemberBlockingTime: state === "pending",
        state,
    };
};
