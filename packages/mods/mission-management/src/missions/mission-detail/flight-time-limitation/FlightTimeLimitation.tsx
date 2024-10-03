import { Box, Button, Divider, HStack, Icon, Spacer, Spinner, Tag, Text } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useNavigate } from "@voloiq/routing";
import { Table } from "@voloiq/table";
import { useErrorToastWithDescription } from "../../hooks/useErrorToast";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { useGetFlightTimeLimitation } from "./useGetFlightTimeLimitation";

export type FlightTimeLimitationTypes = {
    mission: Mission;
};

const formatDuration = (duration: number) => {
    const days = Math.floor(duration / (24 * 60 * 60));
    const hours = Math.floor((duration % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    let formattedDuration = "";
    if (days > 0) formattedDuration += `${days}d `;
    if (hours > 0) formattedDuration += `${hours}h `;
    if (minutes > 0) formattedDuration += `${minutes}m`;
    return formattedDuration.trim();
};

const restTimeCheck = (restTime: number | undefined) => {
    const minRestTime = 12 * 3600;
    if (restTime && restTime > minRestTime) return "teal-subtle";
    return "error";
};

export const FlightTimeLimitation = (props: FlightTimeLimitationTypes) => {
    const { mission } = props;
    const { assignments } = mission;
    const { t } = useMissionTranslations();
    const { tableData, pilotData, state } = useGetFlightTimeLimitation({ mission });

    const { onError } = useErrorToastWithDescription();

    const navigation = useNavigate();

    const checkFTLLimits =
        pilotData &&
        pilotData?.totalDutyTime < pilotData?.maxDutyTime &&
        pilotData?.totalFlightTime < pilotData?.maxFlightTime;

    const redirectToCrewMember = (pilotId: string | undefined) => {
        navigation(`/crew-management/crewmember/overview/${pilotId}`);
    };

    return (
        <>
            {state === "success" ? (
                <Box
                    display="flex-grow"
                    flexDirection="row"
                    width="100%"
                    backgroundColor="monochrome.100"
                    borderRadius="lg"
                    mt={6}
                    py={4}
                >
                    <HStack height={14} justifyContent="space-between" gap={2.5}>
                        <Text fontSize="sm" fontWeight="bold" color="darkblue.500" lineHeight={6}>
                            {`${assignments?.pilotFirstName} ${assignments?.pilotSurName}`}
                        </Text>
                        <Tag colorScheme={checkFTLLimits ? "blue" : "error-subtle"}>
                            {checkFTLLimits ? t("FTL.ftlChecked") : t("FTL.ftlExceeded")}
                        </Tag>
                        <Spacer />
                        {assignments?.pilotId && (
                            <Button
                                rightIcon={<Icon icon="internalLink" size={4} />}
                                onClick={() => {
                                    redirectToCrewMember(assignments?.pilotId);
                                }}
                            >
                                {t("FTL.goToResource")}
                            </Button>
                        )}
                    </HStack>
                    <Divider />
                    <HStack height={6} justifyContent="center" alignItems="center" my={2.5}>
                        <Tag width="-moz-fit-content" height={6} colorScheme={restTimeCheck(pilotData?.restBefore)}>
                            <Text lineHeight={6}>{`Rest: ${formatDuration(pilotData?.restBefore ?? 0)}`}</Text>
                        </Tag>
                    </HStack>
                    {!!pilotData && (
                        <Table
                            columns={[
                                {
                                    Header: (
                                        <Text fontSize="sm" lineHeight={6} fontWeight="bold">
                                            {t("FTL.reportOn")}
                                        </Text>
                                    ),
                                    accessor: "reportOn",
                                    id: "reportOn",
                                },
                                {
                                    Header: (
                                        <Text fontSize="sm" lineHeight={6} fontWeight="bold">
                                            {t("FTL.schedule")}
                                        </Text>
                                    ),
                                    accessor: "schedule",
                                    id: "schedule",
                                },
                                {
                                    Header: (
                                        <Text fontSize="sm" lineHeight={6} fontWeight="bold">
                                            {t("FTL.reportOff")}
                                        </Text>
                                    ),
                                    accessor: "reportOff",
                                    id: "reportOff",
                                },
                            ]}
                            data={tableData}
                        />
                    )}
                    <HStack height={6} justifyContent="center" alignItems="center" mt={2.5}>
                        <Tag width="-moz-fit-content" height={6} colorScheme={restTimeCheck(pilotData?.restAfter)}>
                            <Text lineHeight={6}>{`Rest: ${formatDuration(pilotData?.restAfter ?? 0)}`}</Text>
                        </Tag>
                    </HStack>
                </Box>
            ) : state === "pending" || state === "idle" ? (
                <HStack mt={6} justifyContent="center" alignItems="center">
                    <Spinner />
                </HStack>
            ) : (
                <>{onError(t("An error occurred"))}</>
            )}
        </>
    );
};
