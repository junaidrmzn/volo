import { HStack, Icon, Spacer, Text, VStack } from "@volocopter/design-library-react";
import { Service } from "@voloiq-typescript-api/network-scheduling-types";
import type { MouseEvent } from "react";
import { match } from "ts-pattern";
import { Mission, MissionConflict } from "@voloiq/network-schedule-management-api/v1";
import { useNavigate } from "@voloiq/routing";
import { TextWithLabel, TextWithLinkLabel } from "@voloiq/text-layouts";
import { useGetVertiport } from "../../api-hooks/useNetworkSchedulingService";
import { useErrorToastWithDescription } from "../hooks/useErrorToast";
import { useMissionTranslations } from "../translations/useMissionTranslations";
import { ReservationStatusIcon } from "../utils/ReservationStatusIcon";
import { MissionConflicts } from "./MissionConflicts";
import { MissionSubProcess } from "./MissionSubProcess";
import { getPilotName } from "./getPilotName";

type MissionListItemContentProps = {
    mission: Mission;
};

export const MissionListItemContent = (props: MissionListItemContentProps) => {
    const { mission } = props;
    const {
        flightNumber,
        typeOfOperation,
        service,
        missionConflicts,
        bookings,
        subProcess,
        assignments,
        ftoNumber,
        departureVertiportId,
        source,
        synchronizedWithLeon,
    } = mission;

    const { t } = useMissionTranslations();
    const { onError } = useErrorToastWithDescription();

    const { data: vertiportData } = useGetVertiport(departureVertiportId);

    const mbConflicts = (missionConflicts ?? []).filter((missionConflict) =>
        [MissionConflict.MASS_AND_BALANCE_OUT_OF_LIMITS, MissionConflict.TOTAL_TAKE_OFF_WEIGHT_EXCEEDED].includes(
            missionConflict
        )
    );
    const navigation = useNavigate();

    const assignedPilot = {
        pilotFirstName: assignments?.pilotFirstName,
        pilotMiddleName: assignments?.pilotMiddleName,
        pilotSurName: assignments?.pilotSurName,
    };

    const redirectToBooking = (event: MouseEvent<HTMLParagraphElement, globalThis.MouseEvent>) => {
        const targetElement = event.target as HTMLParagraphElement;
        const booking = bookings?.find((booking) => String(targetElement.textContent) === booking.bookingCode);
        if (booking && vertiportData) {
            navigation(`/booking-management/bookings/overview/${vertiportData?.region?.id}+${booking?.bookingId}`);
        } else {
            onError(t("booking.error"));
        }
    };

    return (
        <>
            <MissionConflicts conflicts={missionConflicts} />
            <VStack spacing={3} alignItems="stretch">
                <MissionSubProcess
                    subProcess={subProcess}
                    service={service}
                    isCheckInAllowed={!!(bookings && bookings.length > 0)}
                    synchronizedWithLeon={synchronizedWithLeon}
                    source={source}
                />
                <HStack spacing={6} alignItems="flex-start">
                    <TextWithLabel size="small" label={t("Flight number")} text={flightNumber} />
                    <TextWithLabel size="small" label={t("Type of operation")} text={typeOfOperation} />
                    <TextWithLabel size="small" label={t("Service")} text={service} />
                    <VStack spacing="0">
                        <Text lineHeight={6} fontSize="xxs" fontWeight="bold" color="fontOnBgMuted">
                            {t("MbStatus")}
                        </Text>
                        <Text
                            fontSize="sm"
                            lineHeight={6}
                            overflowWrap="anywhere"
                            whiteSpace="pre-wrap"
                            color={mbConflicts.length > 0 ? "red.500" : "blue"}
                        >
                            {mbConflicts.length > 0
                                ? <Icon color="red.500" icon="warning" size={4} /> &&
                                  mbConflicts
                                      .map((missionConflict) =>
                                          match(missionConflict)
                                              .with(MissionConflict.TOTAL_TAKE_OFF_WEIGHT_EXCEEDED, () =>
                                                  t("mbStatus.TOTAL_TAKE_OFF_WEIGHT_EXCEEDED")
                                              )
                                              .with(MissionConflict.MASS_AND_BALANCE_OUT_OF_LIMITS, () =>
                                                  t("mbStatus.MASS_AND_BALANCE_OUT_OF_LIMITS")
                                              )
                                              .exhaustive()
                                      )
                                      .join(", ")
                                : t("mbStatus.OK")}
                        </Text>
                    </VStack>
                    <Spacer />
                </HStack>
                <HStack spacing={6} alignItems="flex-start">
                    <TextWithLabel
                        size="small"
                        label={t("assignedPilot")}
                        text={
                            assignments?.pilotId ? (
                                <>
                                    {getPilotName(assignedPilot)}
                                    <ReservationStatusIcon
                                        reservationStatus={assignments.pilotReservationStatus}
                                        declineMessages={assignments.pilotReservationDeclineMessages}
                                        blockingEntities={assignments.pilotReservationBlockingEntities}
                                    />
                                </>
                            ) : (
                                t("noAssignment")
                            )
                        }
                    />
                    <TextWithLabel
                        size="small"
                        label={t("assignedAircraft")}
                        text={
                            assignments?.aircraftId ? (
                                <>
                                    {`${assignments?.aircraftTypeName} - MSN ${assignments?.aircraftMSN}${
                                        assignments?.aircraftRegistration
                                            ? ` - ${assignments?.aircraftRegistration}`
                                            : ""
                                    }`}
                                    <ReservationStatusIcon
                                        reservationStatus={assignments.aircraftReservationStatus}
                                        declineMessages={assignments.aircraftReservationDeclineMessages}
                                        blockingEntities={assignments.aircraftReservationBlockingEntities}
                                    />
                                </>
                            ) : (
                                t("noAssignment")
                            )
                        }
                    />
                    <TextWithLabel size="small" label={t("assignedBattery")} text={assignments?.batteryName} />
                    {service === Service.PASSENGER && bookings && bookings.length > 0 && (
                        <TextWithLinkLabel
                            size="small"
                            label={t("Bookings")}
                            text={Object.values(bookings)
                                .map((booking) => {
                                    return booking.bookingCode;
                                })
                                .join(", ")}
                            onClick={(event) => {
                                redirectToBooking(event);
                            }}
                        />
                    )}
                    {service === Service.TEST && (
                        <TextWithLabel size="small" label={t("FTO number")} text={ftoNumber} />
                    )}
                </HStack>
            </VStack>
        </>
    );
};
