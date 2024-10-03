import { addSeconds, subSeconds } from "date-fns";
import { AircraftAssignment } from "@voloiq/network-schedule-management-api/v1";
import { EmptyCard, GroundTimeCard } from "@voloiq/network-scheduling-components";
import { useNavigate } from "@voloiq/routing";
import type { TimeSchedulerTranslations } from "@voloiq/time-scheduler";
import {
    TimeScheduler,
    TimeSchedulerRow,
    TimeSchedulerRowContent,
    TimeSchedulerRowItem,
    TimeSchedulerRowLabel,
} from "@voloiq/time-scheduler";
import { useQuickFilters } from "../quick-filters/quick-filters-context/useQuickFilters";
import { ScheduledMissionPopover } from "../scheduled-mission-popover/ScheduledMissionPopover";
import { useScheduledMissionTranslation } from "../translations/useScheduledMissionTranslation";
import { ScheduledMissionsTitle } from "./ScheduledMissionsTitle";

type ScheduledMissionsTimeSchedulerOldProps = {
    aircraftAssignments: AircraftAssignment[];
};

export const ScheduledMissionsTimeSchedulerOld = (props: ScheduledMissionsTimeSchedulerOldProps) => {
    const { aircraftAssignments } = props;
    const { t } = useScheduledMissionTranslation();

    const { scheduledDate } = useQuickFilters();

    const translations: TimeSchedulerTranslations = {
        scrollLeftButtonLabel: t("timeSchedular.scrollLeft"),
        scrollRightButtonLabel: t("timeSchedular.scrollRight"),
        zoomInButtonLabel: t("timeSchedular.zoomIn"),
        zoomOutButtonLabel: t("timeSchedular.zoomOut"),
        closeButton: t("timeSchedular.closeButton"),
        title: t("timeSchedular.title"),
        go: t("timeSchedular.go"),
    };

    const navigation = useNavigate();
    return (
        <TimeScheduler
            translations={translations}
            config={{
                renderExpandedItems: () => <EmptyCard />,
                persistSettings: true,
                identifier: "scheduled-missions",
                rowItemHeight: "unset",
            }}
            timelineStartDate={new Date(scheduledDate)}
        >
            {aircraftAssignments &&
                aircraftAssignments.map((assignment) => {
                    return (
                        <TimeSchedulerRow key={`${assignment.aircraftId}`}>
                            <TimeSchedulerRowLabel>
                                <ScheduledMissionsTitle aircraftAssignment={assignment} />
                            </TimeSchedulerRowLabel>
                            <TimeSchedulerRowContent>
                                {assignment.missionsList &&
                                    assignment.missionsList.map((mission) => (
                                        <TimeSchedulerRowItem
                                            key={`${mission.missionId}`}
                                            id={`${mission.missionId}`}
                                            startDate={
                                                mission.estimatedDepartureDateTime
                                                    ? new Date(mission.estimatedDepartureDateTime)
                                                    : new Date()
                                            }
                                            endDate={
                                                mission.estimatedArrivalDateTime
                                                    ? new Date(mission.estimatedArrivalDateTime)
                                                    : new Date()
                                            }
                                            group="event"
                                        >
                                            <ScheduledMissionPopover
                                                mission={mission}
                                                aircraftAssignment={assignment}
                                            />
                                        </TimeSchedulerRowItem>
                                    ))}
                                {assignment.groundEventList !== null &&
                                    assignment.groundEventList &&
                                    assignment.groundEventList.map((groundEvent) => (
                                        <TimeSchedulerRowItem
                                            key={`${groundEvent.id}`}
                                            id={`${groundEvent.id}`}
                                            startDate={addSeconds(new Date(groundEvent.startTime), 1)}
                                            endDate={subSeconds(new Date(groundEvent.endTime), 1)}
                                            group="event"
                                        >
                                            <GroundTimeCard
                                                vertiport={groundEvent.vertiportCode}
                                                startTime={groundEvent.startTime}
                                                endTime={groundEvent.endTime}
                                                onClickAction={() => {
                                                    navigation(
                                                        `/air-operations/mission-management/missions/overview/${
                                                            groundEvent.inboundMissionId
                                                                ? groundEvent.inboundMissionId
                                                                : groundEvent.outboundMissionId
                                                        }`
                                                    );
                                                }}
                                            />
                                        </TimeSchedulerRowItem>
                                    ))}
                            </TimeSchedulerRowContent>
                        </TimeSchedulerRow>
                    );
                })}
        </TimeScheduler>
    );
};
