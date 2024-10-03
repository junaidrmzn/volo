import { PadService } from "@voloiq-typescript-api/vertiport-management-types";
import { match } from "ts-pattern";
import { Mission, useGetAllAvailablePads } from "@voloiq/network-schedule-management-api/v1";
import { PadState } from "../popover-context/ActionsPopoverContext";
import { PadFilters } from "./padFilters";

type UseGetAllAssignablePadProps = {
    mission: Mission;
    padService: PadService;
    actionsPadState: PadState;
};

export const useGetAllAssignablePad = (props: UseGetAllAssignablePadProps) => {
    const { mission, padService, actionsPadState } = props;
    const filter: PadFilters = {
        startDate: mission.estimatedDepartureDateTime ?? new Date().toISOString(),
        endDate: mission.estimatedArrivalDateTime ?? new Date().toISOString(),
        services: padService,
    };

    const selectedVertiportId = match(actionsPadState)
        .with("arrivalFato", "arrivalStand", () => mission.arrivalVertiportId)
        .with("departureFato", "departureStand", () => mission.departureVertiportId)
        .exhaustive();

    const { data, state } = useGetAllAvailablePads({
        vertiportId: selectedVertiportId,
        params: filter,
    });
    return { data, state, selectedVertiportId };
};
