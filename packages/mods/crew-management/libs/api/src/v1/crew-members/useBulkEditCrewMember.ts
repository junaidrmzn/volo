import { CrewMemberWithNames } from "@voloiq-typescript-api/crew-api-types";
import { useUpdateService } from "@voloiq/service";
import { crewManagementBaseUrl } from "../crewManagementBaseUrl";
import { CrewMemberBulkUpdate } from "./apiModels";

export const useBulkEditCrewMember = () => {
    const { sendRequest } = useUpdateService<CrewMemberBulkUpdate, CrewMemberWithNames[]>({
        route: `${crewManagementBaseUrl}/crew-members/bulk-edit`,
    });

    return { sendCrewMemberBulkEditRequest: sendRequest };
};
