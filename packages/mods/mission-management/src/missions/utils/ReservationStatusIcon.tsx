import { Icon, Text } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { AircraftReservationConflict, ReservationStatus } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../translations/useMissionTranslations";
import { IconButtonWithTooltip } from "./IconButtonWithTooltip";

type ReservationStatusIconProps = {
    reservationStatus?: ReservationStatus;
    declineMessages?: string[];
    blockingEntities?: AircraftReservationConflict[];
};

export const ReservationStatusIcon = (props: ReservationStatusIconProps) => {
    const { reservationStatus, declineMessages, blockingEntities } = props;
    const { t } = useMissionTranslations();
    return (
        <>
            {reservationStatus &&
                match(reservationStatus)
                    .with("PENDING", () => (
                        <IconButtonWithTooltip
                            icon={<Icon icon="repeat" size={4} ml={1} />}
                            buttonLabel={reservationStatus}
                            tooltipText={<Text fontSize="xs">{t("pendingReservationMessage")}</Text>}
                        />
                    ))
                    .with("ACCEPTED", () => (
                        <IconButtonWithTooltip
                            icon={<Icon color="semanticSuccessBasic" icon="check" size={4} ml={1} />}
                            buttonLabel={reservationStatus}
                            tooltipText={<Text fontSize="xs">{t("acceptedReservationMessage")}</Text>}
                        />
                    ))
                    .with("DECLINED", () => (
                        <IconButtonWithTooltip
                            icon={<Icon color="semanticErrorBasic" icon="cancel" size={4} ml={1} />}
                            buttonLabel={reservationStatus}
                            tooltipText={<Text fontSize="xs">{declineMessages?.join(",")}</Text>}
                        />
                    ))
                    .with("CONFLICT", () => (
                        <IconButtonWithTooltip
                            icon={<Icon color="semanticWarningBasic" icon="alert" size={4} ml={1} />}
                            buttonLabel={reservationStatus}
                            tooltipText={
                                <Text fontSize="xs">
                                    {blockingEntities && blockingEntities?.length > 0
                                        ? blockingEntities?.length === 1
                                            ? t("blockingEntityErrorMessage", { count: blockingEntities.length })
                                            : t("blockingEntitiesErrorMessage", { count: blockingEntities.length })
                                        : ""}
                                </Text>
                            }
                        />
                    ))
                    .with("RESOURCE_NOT_FOUND", () => (
                        <IconButtonWithTooltip
                            icon={<Icon icon="minus" size={4} ml={1} />}
                            buttonLabel={reservationStatus}
                            tooltipText={<Text fontSize="xs">{t("resourceNotFoundReservationMessage")}</Text>}
                        />
                    ))
                    .with("UNKNOWN", () => (
                        <IconButtonWithTooltip
                            icon={<Icon icon="minus" size={4} ml={1} />}
                            buttonLabel={reservationStatus}
                            tooltipText={<Text fontSize="xs">{t("unknownReservationMessage")}</Text>}
                        />
                    ))
                    .exhaustive()}
        </>
    );
};
