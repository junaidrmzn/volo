import type {
    CrewMember,
    CrewMemberPartial,
    CrewMemberUpdateWithAssignments,
    CrewMemberWithNames,
} from "@voloiq-typescript-api/crew-api-types";
import { useCreateService, useDeleteService, useGetAllService, useGetService, useUpdateService } from "@voloiq/service";
import { CREW_API } from "./serviceEndpoints";

const route = `${CREW_API}/crew-members`;
const routeWithoutAssignments = `${CREW_API}/crew-members/with-assignments`;

export const MEMBER_PAGE_SIZE = 10;

export const useCreateCrewMember = () =>
    useCreateService<CrewMemberUpdateWithAssignments, CrewMemberPartial>({ route: routeWithoutAssignments });

export const useGetCrewMemberOverview = () =>
    useGetService<CrewMemberWithNames>({ route, resourceId: "", options: { manual: true } });

export const useGetCrewMemberWithAssignments = (id: string) =>
    useGetService<CrewMember>({ route: routeWithoutAssignments, resourceId: id });

export const useGetAllCrewMembersManual = () => {
    return useGetAllService<CrewMemberWithNames>({
        route: `${CREW_API}/crew-members/with-names`,
        options: {
            manual: true,
        },
    });
};

export const useDeleteCrewMember = () => useDeleteService({ route });

export const useUpdateCrewMemberWithAssignments = () => useUpdateService({ route: routeWithoutAssignments });
