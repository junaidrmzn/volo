import type { CrewMember, Reservation } from "@voloiq-typescript-api/network-scheduling-types";
import { sub } from "date-fns";
import { Mission, useGetAllMissionResources } from "@voloiq/network-schedule-management-api/v1";
import type { TimeSchedulerTranslations } from "@voloiq/time-scheduler";
import {
    TimeSchedulerNew,
    TimeSchedulerRowContentNew,
    TimeSchedulerRowItemNew,
    TimeSchedulerRowLabelNew,
    TimeSchedulerRowNew,
} from "@voloiq/time-scheduler";
import { useMissionTranslations } from "../translations/useMissionTranslations";
import { ExpandedEvent } from "./ExpandedEvent";
import { CrewEventCard } from "./time-grid-event-cards/CrewEventCard";
import { MissionEventCard } from "./time-grid-event-cards/MissionEventCard";
import { CrewRowLabel } from "./time-grid-row-labels/CrewRowLabel";
import { MissionRowLabel } from "./time-grid-row-labels/MissionRowLabel";
import { useMissionTimeGridData } from "./useMissionTimeGridData";

type MissionTimeSchedulerType = {
    mission: Mission;
};

export const MissionTimeScheduler = (props: MissionTimeSchedulerType) => {
    const { mission } = props;
    const timelineInitialDepartureDate = mission.estimatedDepartureDateTime
        ? new Date(mission.estimatedDepartureDateTime)
        : new Date();

    const { data: missionResources } = useGetAllMissionResources({
        missionId: mission.id,
        params: {
            startDate: mission.estimatedDepartureDateTime ?? mission.departureDateTime,
            endDate: mission.estimatedArrivalDateTime ?? mission.arrivalDateTime,
        },
    });

    const { t } = useMissionTranslations();

    const { crewData, getMissionReservations, isValidObject } = useMissionTimeGridData({ missionResources });

    const translations: TimeSchedulerTranslations = {
        scrollLeftButtonLabel: t("calendar.Scroll left"),
        scrollRightButtonLabel: t("calendar.Scroll right"),
        zoomInButtonLabel: t("calendar.Zoom in"),
        zoomOutButtonLabel: t("calendar.Zoom out"),
        closeButton: t("calendar.closeButton"),
        title: t("calendar.title"),
        go: t("calendar.go"),
    };
    return (
        <TimeSchedulerNew
            translations={translations}
            timelineStartDate={new Date(sub(timelineInitialDepartureDate, { hours: 4 }))}
            config={{
                renderExpandedItems: (items) => <ExpandedEvent itemCount={items.length} />,
                persistSettings: true,
                identifier: "mission-calendar",
            }}
        >
            {Object.keys(missionResources).length > 0 &&
                Object.entries(missionResources).map(([key, value]) => {
                    const reservations = getMissionReservations(value);
                    return (
                        isValidObject(value) && (
                            <TimeSchedulerRowNew key={key}>
                                <TimeSchedulerRowLabelNew>
                                    <MissionRowLabel missionAssignmentKey={key} data={value} />
                                </TimeSchedulerRowLabelNew>
                                <TimeSchedulerRowContentNew>
                                    {reservations &&
                                        reservations.map((reservation: Reservation) => {
                                            return (
                                                <TimeSchedulerRowItemNew
                                                    key={reservation.id}
                                                    id={reservation.id}
                                                    startDate={new Date(reservation.startDateTime)}
                                                    endDate={new Date(reservation.endDateTime)}
                                                    group="mission"
                                                >
                                                    <MissionEventCard
                                                        missionAssignmentKey={key}
                                                        missionData={value}
                                                        missionReservations={reservation}
                                                    />
                                                </TimeSchedulerRowItemNew>
                                            );
                                        })}
                                </TimeSchedulerRowContentNew>
                            </TimeSchedulerRowNew>
                        )
                    );
                })}
            {crewData &&
                crewData.map((crewMember: CrewMember) => {
                    return (
                        <TimeSchedulerRowNew key={crewMember.id}>
                            <TimeSchedulerRowLabelNew>
                                <CrewRowLabel crewData={crewMember} />
                            </TimeSchedulerRowLabelNew>
                            <TimeSchedulerRowContentNew>
                                {crewMember.reservations &&
                                    crewMember.reservations?.length > 0 &&
                                    crewMember?.reservations.map((missionReservations: Reservation) => {
                                        return (
                                            <TimeSchedulerRowItemNew
                                                key={missionReservations.id}
                                                id={missionReservations.id}
                                                startDate={new Date(missionReservations.startDateTime)}
                                                endDate={new Date(missionReservations.endDateTime)}
                                                group="mission"
                                            >
                                                <CrewEventCard
                                                    crewData={crewMember}
                                                    crewReservations={missionReservations}
                                                />
                                            </TimeSchedulerRowItemNew>
                                        );
                                    })}
                            </TimeSchedulerRowContentNew>
                        </TimeSchedulerRowNew>
                    );
                })}
        </TimeSchedulerNew>
    );
};
