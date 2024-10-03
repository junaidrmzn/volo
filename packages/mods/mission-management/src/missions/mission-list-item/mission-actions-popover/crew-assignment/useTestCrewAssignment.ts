import type { CrewMemberAssignment } from "@voloiq-typescript-api/network-scheduling-types";
import { add } from "date-fns";
import { useEffect, useState } from "react";
import { Mission, useAssignCrew } from "@voloiq/network-schedule-management-api/v1";
import { useErrorToastWithMessage } from "../../../hooks/useErrorToast";
import { useGetAllAssignableCrewMember } from "./useAssignableCrewMemberService";

type UseTestCrewAssignmentProps = {
    mission: Mission;
    onReloadList: () => void;
    onClose: () => void;
};

export const useTestCrewAssignment = (props: UseTestCrewAssignmentProps) => {
    const { mission, onReloadList, onClose } = props;
    const { onError } = useErrorToastWithMessage();
    const { sendRequest } = useAssignCrew({
        missionId: mission.id,
        config: {
            params: {
                version: mission.version,
            },
        },
    });
    const formattedEndDate = new Date(mission.crewReservationStartDateTime);
    const formattedStartDate = new Date(mission.crewReservationEndDateTime);
    const endDate = add(formattedEndDate, { hours: 1 });
    const startDate = add(formattedStartDate, { hours: -1 });
    const [toggleState, setToggleState] = useState(true);
    const [filters, setFilters] = useState("");
    const { availableCrewMembers: crewMembers, state } = useGetAllAssignableCrewMember(
        startDate.toISOString(),
        endDate.toISOString(),
        mission,
        filters,
        toggleState
    );
    const [selectedCrewMembers, setSelectedCrewMembers] = useState<CrewMemberAssignment[]>(
        mission.assignments?.crewMemberAssignments && mission.assignments?.crewMemberAssignments?.length > 0
            ? mission.assignments?.crewMemberAssignments
            : []
    );

    const handleCrewMemberSelection = (crewMemberId: string, isChecked: boolean) => {
        if (isChecked) {
            setSelectedCrewMembers((previousSelectedCrewMembers) => {
                const newCrewMember: CrewMemberAssignment = {
                    crewMemberId,
                };
                return [...previousSelectedCrewMembers, newCrewMember];
            });
        } else {
            setSelectedCrewMembers((previousSelectedCrewMembers) =>
                previousSelectedCrewMembers.filter((item) => item.crewMemberId !== crewMemberId)
            );
        }
    };

    const handleRoleSelection = (crewMemberId: string, crewMemberRole: string) => {
        setSelectedCrewMembers((previousSelectedCrewMembers) => {
            return previousSelectedCrewMembers.map((item) => {
                if (item.crewMemberId === crewMemberId) {
                    return { ...item, crewMemberRole };
                }
                return item;
            });
        });
    };

    const onSubmit = () => {
        sendRequest({ data: { crewMembers: selectedCrewMembers } })
            .then((response) => {
                onReloadList();
                onClose();
                return response;
            })
            .catch((error) => {
                onError(error);
            });
    };

    useEffect(() => {
        setSelectedCrewMembers(
            mission.assignments?.crewMemberAssignments && mission.assignments?.crewMemberAssignments?.length > 0
                ? mission.assignments?.crewMemberAssignments
                : []
        );
    }, [toggleState, crewMembers, filters, mission.assignments?.crewMemberAssignments]);

    const handleFilterChange = (filters: string) => {
        setFilters(filters);
    };

    return {
        onSubmit,
        crewMembers,
        handleCrewMemberSelection,
        handleRoleSelection,
        selectedCrewMembers,
        toggleState,
        setToggleState,
        startDate,
        endDate,
        handleFilterChange,
        state,
    };
};
