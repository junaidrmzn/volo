import { add } from "date-fns";
import { useState } from "react";
import { Mission, useAssignPilot } from "@voloiq/network-schedule-management-api/v1";
import { useErrorToastWithMessage } from "../../../hooks/useErrorToast";
import { useGetAllAssignablePilots } from "./useAssignablePilotService";

type UseMissionPilotAssignmentProps = {
    mission: Mission;
    onReloadList: () => void;
    onClose: () => void;
};

export const useMissionPilotAssignment = (props: UseMissionPilotAssignmentProps) => {
    const { mission, onReloadList, onClose } = props;
    const { onError } = useErrorToastWithMessage();
    const { sendRequestById } = useAssignPilot({
        missionId: mission.id,
        config: { params: { version: mission.version } },
    });
    const formattedEndDate = new Date(mission.crewReservationStartDateTime);
    const formattedStartDate = new Date(mission.crewReservationEndDateTime);
    const endDate = add(formattedEndDate, { hours: 1 });
    const startDate = add(formattedStartDate, { hours: -1 });
    const [toggleState, setToggleState] = useState(true);
    const [filters, setFilters] = useState("");
    const { availableCrewMembers: pilots, state } = useGetAllAssignablePilots(
        startDate.toISOString(),
        endDate.toISOString(),
        mission,
        filters,
        toggleState
    );
    const [selectedPilot, setSelectedPilot] = useState(
        mission.assignments?.pilotId ? mission.assignments?.pilotId : ""
    );

    const onSubmit = () => {
        sendRequestById(selectedPilot, {})
            .then((response) => {
                onReloadList();
                onClose();
                return response;
            })
            .catch((error) => {
                onError(error);
            });
    };
    const handleFilterChange = (filters: string) => {
        setFilters(filters);
    };

    return {
        onSubmit,
        pilots,
        setSelectedPilot,
        selectedPilot,
        toggleState,
        setToggleState,
        startDate,
        endDate,
        handleFilterChange,
        state,
    };
};
