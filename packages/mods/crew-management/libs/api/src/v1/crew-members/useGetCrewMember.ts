import { CrewMemberWithNames } from "@voloiq-typescript-api/crew-api-types";
import { useGetService } from "@voloiq/service";
import { crewManagementBaseUrl } from "../crewManagementBaseUrl";

export type UseGetCrewMemberOptions = {
    crewMemberId: string;
};
export const useGetCrewMember = (options: UseGetCrewMemberOptions) => {
    const { crewMemberId } = options;
    return useGetService<CrewMemberWithNames>({
        route: `${crewManagementBaseUrl}/crew-members/with-names`,
        resourceId: crewMemberId,
    });
};
