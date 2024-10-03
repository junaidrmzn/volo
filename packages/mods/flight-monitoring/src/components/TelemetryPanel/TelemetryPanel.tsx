import { Box, Icon, Table, Tbody, Td, Text, Tr, VStack, useColorModeValue } from "@volocopter/design-library-react";
import type { FlightPathItem } from "@voloiq-typescript-api/flight-monitoring-types";
import { useFlightMonitoringTranslation } from "../../translations/useFlightMonitoringTranslation";
import { useTelemetry } from "./useTelemetry";

type TelemetryPanelProps = {
    data: FlightPathItem[];
};

export const TelemetryPanel = (props: TelemetryPanelProps) => {
    const { data } = props;
    const bgColor = useColorModeValue("white", "gray.900");
    const { t } = useFlightMonitoringTranslation();
    const { lastMessage, altitudeTrend, airspeedTrend, groundLevel } = useTelemetry(data);

    // calculate average charge across all batteries
    const remainingCharge = lastMessage
        ? Math.round(
              lastMessage.soc!.reduce((accumulator, current) => accumulator + current, 0) / lastMessage.soc!.length
          )
        : "-";

    return (
        <VStack
            w="300px"
            bgColor={bgColor}
            boxShadow="lg"
            borderRadius="lg"
            data-testid="telemetry-panel"
            overflow="hidden"
            alignItems="flex-start"
        >
            <Text size="small" p={2} fontWeight="bold">
                {t("telemetryData.header")}
            </Text>
            <Box w="100%">
                <Table variant="striped" size="xs">
                    <Tbody>
                        <Tr>
                            <Td py={1} paddingLeft={2}>{`${t("telemetryData.altitude")} AGL`}</Td>
                            <Td p={0} paddingRight={2} textAlign="right">
                                {altitudeTrend === "up" ? (
                                    <Icon icon="chevronUp" size={4} />
                                ) : altitudeTrend === "down" ? (
                                    <Icon icon="chevronDown" size={4} />
                                ) : null}
                                &nbsp;
                                {lastMessage && Math.round((lastMessage.alt! - groundLevel) * 3.280_84)} ft
                            </Td>
                        </Tr>
                        <Tr>
                            <Td py={1} paddingLeft={2}>
                                {t("telemetryData.groundspeed")}
                            </Td>
                            <Td p={0} paddingRight={2} textAlign="right">
                                {airspeedTrend === "up" ? (
                                    <Icon icon="chevronUp" size={4} />
                                ) : airspeedTrend === "down" ? (
                                    <Icon icon="chevronDown" size={4} />
                                ) : null}
                                &nbsp;
                                {lastMessage && Math.round(lastMessage.horizontalSpeed!)} kts
                            </Td>
                        </Tr>
                        <Tr>
                            <Td py={1} paddingLeft={2}>
                                {t("telemetryData.verticalSpeed")}
                            </Td>
                            <Td p={0} paddingRight={2} textAlign="right">
                                {lastMessage && (lastMessage.verticalSpeed! * 3.281).toFixed(1)} fpm
                            </Td>
                        </Tr>
                        <Tr>
                            <Td py={1} paddingLeft={2}>
                                {t("telemetryData.stateOfCharge")}
                            </Td>
                            <Td p={0} paddingRight={2} textAlign="right">
                                {remainingCharge}%
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
        </VStack>
    );
};
