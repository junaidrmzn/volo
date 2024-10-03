import { Aircraft } from "@voloiq/network-scheduling-management-api/v1";
import type { TimeSchedulerTranslations } from "@voloiq/time-scheduler";
import {
    TimeSchedulerNew,
    TimeSchedulerRowContentNew,
    TimeSchedulerRowItemNew,
    TimeSchedulerRowLabelNew,
    TimeSchedulerRowNew,
} from "@voloiq/time-scheduler";
import { AircraftLabel } from "./AircraftLabel";
import { EventItem } from "./events/EventItem";
import { ExpandedEventItem } from "./events/ExpandedEventItem";
import { MissionItem } from "./missions/MissionItem";
import { mockAssignedBattery } from "./mockBatteryAssignment";
import { useAircraftScheduleTranslation } from "./translations/useAircraftScheduleTranslation";

export type AircraftTimeSchedulerProps = { aircrafts: Aircraft[] };

export const AircraftTimeScheduler = (props: AircraftTimeSchedulerProps) => {
    const { aircrafts } = props;
    const { t } = useAircraftScheduleTranslation();
    const translations: TimeSchedulerTranslations = {
        scrollLeftButtonLabel: t("Scroll left"),
        scrollRightButtonLabel: t("Scroll right"),
        zoomInButtonLabel: t("Zoom in"),
        zoomOutButtonLabel: t("Zoom out"),
        closeButton: t("closeButton"),
        title: t("title"),
        go: t("go"),
    };

    return (
        <TimeSchedulerNew
            translations={translations}
            config={{
                renderExpandedItems: (items) => <ExpandedEventItem itemCount={items.length} />,
                persistSettings: true,
                identifier: "aircraft-schedule",
            }}
        >
            {aircrafts.map((aircraft) => {
                const { reservations, aircraftId } = aircraft;

                return (
                    <TimeSchedulerRowNew key={aircraftId}>
                        <TimeSchedulerRowLabelNew>
                            <AircraftLabel aircraft={aircraft} />
                        </TimeSchedulerRowLabelNew>
                        <TimeSchedulerRowContentNew>
                            {reservations &&
                                reservations.map((reservation) => {
                                    const mockBattery =
                                        reservation.reservationType === "MISSION" &&
                                        "flightNumber" in reservation.reservationModel
                                            ? mockAssignedBattery(
                                                  reservation.reservationModel.flightNumber,
                                                  reservation.reservationModel.assignedAircraftId,
                                                  reservation.reservationModel.assignedPilotId
                                              )
                                            : undefined;
                                    return (
                                        <TimeSchedulerRowItemNew
                                            key={reservation.id}
                                            id={reservation.id}
                                            startDate={new Date(reservation.startDateTime)}
                                            endDate={new Date(reservation.endDateTime)}
                                            group="event"
                                        >
                                            {reservation.reservationType === "EVENT" &&
                                                "name" in reservation.reservationModel && (
                                                    <EventItem
                                                        eventName={reservation.reservationModel.name}
                                                        isBlockedForMission={
                                                            reservation.reservationModel.isBlockedForMission
                                                        }
                                                    />
                                                )}
                                            {reservation.reservationType === "MISSION" &&
                                                "flightNumber" in reservation.reservationModel && (
                                                    <MissionItem
                                                        arrivalVertiport={
                                                            reservation.reservationModel.scheduledArrivalVertiportCode
                                                        }
                                                        departureVertiport={
                                                            reservation.reservationModel.scheduledDepartureVertiportCode
                                                        }
                                                        flightNumber={reservation.reservationModel.flightNumber}
                                                        pilotAssignment={
                                                            (reservation.reservationModel.assignedPilotId &&
                                                                "assigned") ||
                                                            "unassigned"
                                                        }
                                                        batteryAssignment={
                                                            (mockBattery?.id && "assigned") || "unassigned"
                                                        }
                                                        width={100}
                                                    />
                                                )}
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
