import { HStack, Icon, Tag, Text } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { TagWithTooltip } from "@voloiq/network-scheduling-components";
import { getDurationInDays } from "@voloiq/utils";
import { useMissionTranslations } from "../translations/useMissionTranslations";

export type MissionDatesProps = {
    mission: Mission;
    delayReasons?: string;
};
export const MissionDates = (props: MissionDatesProps) => {
    const { mission, delayReasons } = props;
    const { arrivalDateTime, departureDateTime, estimatedArrivalDateTime, estimatedDepartureDateTime } = mission;
    const { t } = useMissionTranslations();
    const { formatDate, formatDateTime, formatTime } = useFormatDateTime();
    const missionTimeDifference = estimatedArrivalDateTime
        ? Math.abs((new Date(arrivalDateTime).getTime() - new Date(estimatedArrivalDateTime).getTime()) / (1000 * 60))
        : 0;

    const formattedDepartureDateTime =
        estimatedDepartureDateTime &&
        (formatDate(departureDateTime) !== formatDate(estimatedDepartureDateTime)
            ? formatDateTime(departureDateTime)
            : formatTime(departureDateTime));
    const formattedEstimatedDepartureDateTime =
        estimatedDepartureDateTime &&
        (formatDate(estimatedDepartureDateTime) !== formatDate(departureDateTime)
            ? formatDateTime(estimatedDepartureDateTime)
            : formatTime(estimatedDepartureDateTime));

    const formattedArrivalDateTime =
        estimatedArrivalDateTime &&
        (formatDate(arrivalDateTime) !== formatDate(estimatedArrivalDateTime)
            ? formatDateTime(arrivalDateTime)
            : formatTime(arrivalDateTime));
    const formattedEstimatedArrivalDateTime =
        estimatedArrivalDateTime &&
        (formatDate(estimatedArrivalDateTime) !== formatDate(arrivalDateTime)
            ? formatDateTime(estimatedArrivalDateTime)
            : formatTime(estimatedArrivalDateTime));

    const totalPlannedDays =
        estimatedDepartureDateTime && estimatedArrivalDateTime
            ? getDurationInDays(new Date(estimatedArrivalDateTime), new Date(estimatedDepartureDateTime))
            : 0;

    const arrivalDatetimeWithDayDifference =
        totalPlannedDays > 0 &&
        estimatedArrivalDateTime &&
        formatDateTime(arrivalDateTime) === formatDateTime(estimatedArrivalDateTime)
            ? `${formattedArrivalDateTime} (+${totalPlannedDays}d)`
            : formattedArrivalDateTime;

    return (
        <HStack>
            {missionTimeDifference <= 10 ? (
                <Text fontSize="sm">{formatDateTime(departureDateTime)}</Text>
            ) : (
                <>
                    {estimatedDepartureDateTime &&
                        formatDate(departureDateTime) === formatDate(estimatedDepartureDateTime) && (
                            <Text fontSize="sm">{formatDate(departureDateTime)}</Text>
                        )}
                    <Text
                        fontSize="sm"
                        as={
                            estimatedDepartureDateTime &&
                            formatDateTime(departureDateTime) !== formatDateTime(estimatedDepartureDateTime)
                                ? "s"
                                : "samp"
                        }
                    >
                        {formattedDepartureDateTime}
                    </Text>
                    {estimatedDepartureDateTime &&
                    formatDateTime(departureDateTime) !== formatDateTime(estimatedDepartureDateTime) ? (
                        <Text fontSize="sm" color="orange">
                            {formattedEstimatedDepartureDateTime}
                        </Text>
                    ) : null}
                </>
            )}
            {departureDateTime !== arrivalDateTime && (
                <>
                    <Icon icon="arrowRight" size={4} marginLeft={2} marginRight={2} />
                    <Text
                        fontSize="sm"
                        as={
                            estimatedArrivalDateTime &&
                            formatDateTime(arrivalDateTime) !== formatDateTime(estimatedArrivalDateTime)
                                ? "s"
                                : "samp"
                        }
                    >
                        {arrivalDatetimeWithDayDifference}
                    </Text>
                    {estimatedArrivalDateTime &&
                    formatDateTime(arrivalDateTime) !== formatDateTime(estimatedArrivalDateTime) ? (
                        <Text fontSize="sm" color="orange">
                            {formattedEstimatedArrivalDateTime}
                        </Text>
                    ) : null}
                    {missionTimeDifference <= 10 ? (
                        <Tag colorScheme="blue">{t("onTime")}</Tag>
                    ) : (
                        <TagWithTooltip
                            placement="top"
                            colorScheme="warning-subtle"
                            tooltipLabel={delayReasons && `${t("Reason")}: ${delayReasons}`}
                            tagContent={
                                estimatedArrivalDateTime && estimatedArrivalDateTime < arrivalDateTime
                                    ? t("early")
                                    : t("delayed")
                            }
                        />
                    )}
                </>
            )}
        </HStack>
    );
};
