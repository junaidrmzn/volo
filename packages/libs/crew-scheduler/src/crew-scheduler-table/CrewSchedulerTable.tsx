import { Box, HStack, SimpleGrid, Text, VStack } from "@volocopter/design-library-react";
import React from "react";
import { useFormatDateTime } from "@voloiq/dates";
import { MissionForFTL } from "../models";
import { useCrewSchedulerTranslations } from "../translations/useCrewSchedulerTranslations";
import { ColumnText } from "./ColumnText";
import { HeaderText } from "./HeaderText";

export type CrewSchedulerTableProps = {
    missions: MissionForFTL[];
};

export const CrewSchedulerTable: React.FC<CrewSchedulerTableProps> = (props) => {
    const { missions } = props;
    const { t } = useCrewSchedulerTranslations();
    const { formatTime } = useFormatDateTime();

    const DividerWithoutMargin = () => <Box width="full" borderBottom="1px" borderBottomColor="darkBlue.200" />;

    return (
        <VStack width="full" divider={<DividerWithoutMargin />} py="0">
            {missions.length > 0 ? (
                <SimpleGrid columns={3} width="full" alignItems="flex-start" gridAutoFlow="column" px="2.5" py="2.5">
                    <HeaderText>{t("reportOn")}</HeaderText>
                    <HeaderText>{t("schedule")}</HeaderText>
                    <HeaderText textAlign="end">{t("reportOff")}</HeaderText>
                </SimpleGrid>
            ) : (
                <VStack justifyContent="space-between" align="flex-start">
                    <Text fontSize="sm" fontWeight="normal" lineHeight={6} color="fontOnBgMuted">
                        {t("noScheduleMessage")}
                    </Text>
                </VStack>
            )}
            {missions.map((mission, index) => (
                <SimpleGrid
                    columns={3}
                    width="full"
                    alignItems="flex-start"
                    gridAutoFlow="column"
                    key={`ftl-${index.toString()}`}
                    px="2.5"
                >
                    <ColumnText py="2.5">{formatTime(mission?.reportOn)}</ColumnText>
                    <ColumnText>
                        <VStack justifyContent="space-between" align="flex-start">
                            <HStack justifyContent="flex-start" align="flex-start">
                                <Text fontSize="sm" fontWeight="normal" lineHeight={6}>
                                    {`${mission.departureVertiportCode} - ${mission.arrivalVertiportCode}`}
                                </Text>

                                <Text fontSize="sm" fontWeight="normal" lineHeight={6}>
                                    {`. ${formatTime(mission.estimatedDeparture)} - ${formatTime(
                                        mission.estimatedArrival
                                    )}`}
                                </Text>
                            </HStack>
                            <Text fontSize="xxs" fontWeight="normal" lineHeight={4} color="fontOnBgMuted">
                                {t("cockpitCount", { count: 1 })}
                            </Text>
                        </VStack>
                    </ColumnText>
                    <ColumnText textAlign="end" py="2.5">
                        {formatTime(mission?.reportOff)}
                    </ColumnText>
                </SimpleGrid>
            ))}
        </VStack>
    );
};
