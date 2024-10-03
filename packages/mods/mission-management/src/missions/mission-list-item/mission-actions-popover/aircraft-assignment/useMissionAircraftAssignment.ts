import { add } from "date-fns";
import { useState } from "react";
import { Mission, useAssignAircraft } from "@voloiq/network-schedule-management-api/v1";
import { useErrorToastWithMessage } from "../../../hooks/useErrorToast";
import { useGetAllAssignableAircraft } from "./useAssignableAircraftService";

type UseMissionAircraftAssignmentProps = {
    mission: Mission;
    onReloadList: () => void;
    onClose: () => void;
};

export const useMissionAircraftAssignment = (props: UseMissionAircraftAssignmentProps) => {
    const { mission, onReloadList, onClose } = props;
    const { sendRequestById } = useAssignAircraft({
        missionId: mission.id,
        config: { params: { version: mission.version } },
    });

    const { onError } = useErrorToastWithMessage();
    const formattedEndDate = new Date(mission.aircraftReservationEndDateTime);
    const formattedStartDate = new Date(mission.aircraftReservationStartDateTime);
    const endDate = add(formattedEndDate, { hours: 1 });
    const startDate = add(formattedStartDate, { hours: -1 });
    const [toggleState, setToggleState] = useState(true);
    const [filters, setFilters] = useState("");
    const { data: aircrafts, state } = useGetAllAssignableAircraft(
        startDate.toISOString(),
        endDate.toISOString(),
        mission,
        filters,
        toggleState
    );
    const [selectedAircraft, setSelectedAircraft] = useState(
        mission.assignments?.aircraftId ? mission.assignments?.aircraftId : ""
    );

    const onSubmit = () => {
        sendRequestById(selectedAircraft, {})
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
        aircrafts,
        setSelectedAircraft,
        selectedAircraft,
        toggleState,
        setToggleState,
        startDate,
        endDate,
        handleFilterChange,
        state,
    };
};
