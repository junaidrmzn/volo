import { CrewRole } from "@voloiq-typescript-api/crew-api-types";
import { useGetAllService } from "@voloiq/service";
import { crewManagementBaseUrl } from "../crewManagementBaseUrl";

type UseGetCrewRolesOptions = {
    manual: boolean;
};

export const useGetCrewRoles = (options: UseGetCrewRolesOptions) => {
    return useGetAllService<CrewRole>({
        route: `${crewManagementBaseUrl}/crew-roles`,
        params: {
            page: 1,
            size: 100,
            orderBy: "roleKey",
        },
        options,
    });
};
