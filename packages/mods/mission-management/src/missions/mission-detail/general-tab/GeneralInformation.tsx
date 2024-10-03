import { Flex, HStack, Icon, Text } from "@volocopter/design-library-react";
import { StatusOfMission } from "@voloiq-typescript-api/network-scheduling-types";
import { useFormatDateTime } from "@voloiq/dates";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { InfoCard, Section } from "@voloiq/network-scheduling-components";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { ActionPopover } from "./ActionPopover";

type GeneralInformationProps = {
    mission: Mission;
    onReloadList: () => void;
    onRedirectToResource: (url: string) => void;
    delayReasons?: string;
};

export const GeneralInformation = (props: GeneralInformationProps) => {
    const { mission, onRedirectToResource, onReloadList, delayReasons } = props;
    const {
        departureVertiportCode,
        departureVertiportId,
        arrivalVertiportCode,
        arrivalVertiportId,
        arrivalDateTime,
        departureDateTime,
        estimatedArrivalDateTime,
        estimatedDepartureDateTime,
        actualArrivalVertiportCode,
        statusOfMission,
    } = mission;

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

    const formattedArrivalDateTime = estimatedArrivalDateTime && formatDateTime(arrivalDateTime);
    const formattedEstimatedArrivalDateTime = estimatedArrivalDateTime && formatDateTime(estimatedArrivalDateTime);

    return (
        <Section
            headerLabel={t("generalInformation")}
            bodyContent={
                <Flex width="100%" gap={3} alignItems="flex-start">
                    <HStack width="50%">
                        <InfoCard
                            headerLabel={t("Departure")}
                            tagLabel={
                                missionTimeDifference <= 10
                                    ? t("onTime")
                                    : estimatedArrivalDateTime && estimatedArrivalDateTime < arrivalDateTime
                                    ? t("early")
                                    : t("delayed")
                            }
                            tagTooltipLabel={delayReasons && `Reason: ${delayReasons}`}
                            tagType={missionTimeDifference <= 10 ? "normal" : "warning"}
                            actions={
                                <ActionPopover
                                    type="updateSchedule"
                                    mission={mission}
                                    onReloadList={onReloadList}
                                    {...(departureVertiportId &&
                                        departureVertiportId !== "00000000-0000-0000-0000-000000000000" && {
                                            onRedirectToResource: () =>
                                                onRedirectToResource(
                                                    `/vertiport-management/vertiport/overview/${departureVertiportId}`
                                                ),
                                        })}
                                />
                            }
                            bodyContent={
                                <HStack>
                                    <Text fontSize="xs">{departureVertiportCode}</Text>
                                    <Text>•</Text>
                                    {missionTimeDifference <= 10 ? (
                                        <Text fontSize="xs">{formatDateTime(departureDateTime)}</Text>
                                    ) : (
                                        <>
                                            {estimatedDepartureDateTime &&
                                                formatDate(departureDateTime) ===
                                                    formatDate(estimatedDepartureDateTime) && (
                                                    <Text fontSize="xs">{formatDate(departureDateTime)}</Text>
                                                )}
                                            <Text
                                                fontSize="xs"
                                                as={
                                                    estimatedDepartureDateTime &&
                                                    formatDateTime(departureDateTime) !==
                                                        formatDateTime(estimatedDepartureDateTime)
                                                        ? "s"
                                                        : "samp"
                                                }
                                            >
                                                {formattedDepartureDateTime}
                                            </Text>
                                            {estimatedDepartureDateTime &&
                                            formatDateTime(departureDateTime) !==
                                                formatDateTime(estimatedDepartureDateTime) ? (
                                                <Text fontSize="xs" color="orange">
                                                    {formattedEstimatedDepartureDateTime}
                                                </Text>
                                            ) : null}
                                        </>
                                    )}
                                </HStack>
                            }
                        />
                    </HStack>
                    <HStack width="50%">
                        <InfoCard
                            headerLabel={t("Arrival")}
                            tagLabel={
                                missionTimeDifference <= 10
                                    ? t("onTime")
                                    : estimatedArrivalDateTime && estimatedArrivalDateTime < arrivalDateTime
                                    ? t("early")
                                    : t("delayed")
                            }
                            tagTooltipLabel={delayReasons && `Reason: ${delayReasons}`}
                            tagType={missionTimeDifference <= 10 ? "normal" : "warning"}
                            actions={
                                <ActionPopover
                                    type="updateSchedule"
                                    mission={mission}
                                    onReloadList={onReloadList}
                                    {...(arrivalVertiportId &&
                                        arrivalVertiportId !== "00000000-0000-0000-0000-000000000000" && {
                                            onRedirectToResource: () =>
                                                onRedirectToResource(
                                                    `/vertiport-management/vertiport/overview/${arrivalVertiportId}`
                                                ),
                                        })}
                                />
                            }
                            bodyContent={
                                <HStack>
                                    <Text
                                        fontSize="xs"
                                        as={statusOfMission === StatusOfMission.DIVERTED ? "s" : "samp"}
                                    >
                                        {arrivalVertiportCode}
                                    </Text>
                                    {statusOfMission === StatusOfMission.DIVERTED && (
                                        <>
                                            <Icon color="red.500" icon="warning" size={4} />
                                            <Text fontSize="xs" color="red.500">
                                                {actualArrivalVertiportCode}
                                            </Text>
                                        </>
                                    )}
                                    <Text>•</Text>
                                    {departureDateTime !== arrivalDateTime && (
                                        <>
                                            <Text
                                                fontSize="xs"
                                                as={
                                                    estimatedArrivalDateTime &&
                                                    formatDateTime(arrivalDateTime) !==
                                                        formatDateTime(estimatedArrivalDateTime)
                                                        ? "s"
                                                        : "samp"
                                                }
                                            >
                                                {formattedArrivalDateTime}
                                            </Text>
                                            {estimatedArrivalDateTime &&
                                            formatDateTime(arrivalDateTime) !==
                                                formatDateTime(estimatedArrivalDateTime) ? (
                                                <Text fontSize="xs" color="orange">
                                                    {formattedEstimatedArrivalDateTime}
                                                </Text>
                                            ) : null}
                                        </>
                                    )}
                                </HStack>
                            }
                        />
                    </HStack>
                </Flex>
            }
        />
    );
};
