import { PadReservationType } from "@voloiq-typescript-api/network-scheduling-types";
import { PadService } from "@voloiq-typescript-api/vertiport-management-types";
import { add } from "date-fns";
import { useState } from "react";
import { match } from "ts-pattern";
import { Mission, useAssignPad } from "@voloiq/network-schedule-management-api/v1";
import { useNavigate } from "@voloiq/routing";
import { PadState } from "../popover-context/ActionsPopoverContext";
import { useGetAllAssignablePad } from "./useAssignablePadService";

type UseMissionPadAssignmentProps = {
    mission: Mission;
    onReloadList: () => void;
    onClose: () => void;
    actionsPadState: PadState;
};

export const useMissionPadAssignment = (props: UseMissionPadAssignmentProps) => {
    const { mission, onReloadList, onClose, actionsPadState } = props;
    const { sendRequestById, state: assignPadState } = useAssignPad({
        missionId: mission.id,
        config: { params: { version: mission.version } },
    });
    const padService = actionsPadState.includes("Fato") ? PadService.FATO : PadService.STAND;
    const { data: pads, state, selectedVertiportId } = useGetAllAssignablePad({ mission, padService, actionsPadState });

    const navigation = useNavigate();
    const goToVertiportResource = () => {
        return navigation(`/vertiport-management/vertiport/overview/${selectedVertiportId}?tab=pads`);
    };

    const selectedPadValue = match(actionsPadState)
        .with("arrivalFato", () => mission.assignments?.scheduledArrivalFatoId)
        .with("arrivalStand", () => mission.assignments?.scheduledArrivalStandId)
        .with("departureFato", () => mission.assignments?.scheduledDepartureFatoId)
        .with("departureStand", () => mission.assignments?.scheduledDepartureStandId)
        .exhaustive();
    const [selectedPads, setSelectedPads] = useState(selectedPadValue ?? "");
    const formattedEndDate = mission.estimatedArrivalDateTime ? new Date(mission.estimatedArrivalDateTime) : new Date();
    const formattedStartDate = mission.estimatedDepartureDateTime
        ? new Date(mission.estimatedDepartureDateTime)
        : new Date();
    const endDate = add(formattedEndDate, { hours: 1 });
    const startDate = add(formattedStartDate, { hours: -1 });

    const onSubmit = () => {
        sendRequestById(selectedPads, {
            params: {
                padReservationType: actionsPadState.includes("departure")
                    ? PadReservationType.DEPARTURE
                    : PadReservationType.ARRIVAL,
                version: mission.version,
            },
        }).then((response) => {
            onReloadList();
            onClose();
            return response;
        });
    };

    return {
        onSubmit,
        pads,
        state,
        selectedPads,
        setSelectedPads,
        startDate,
        endDate,
        goToVertiportResource,
        assignPadState,
    };
};
