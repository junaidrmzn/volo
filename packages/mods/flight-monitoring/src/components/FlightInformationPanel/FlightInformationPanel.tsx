import { Grid, GridItem, Text, VStack, useColorModeValue } from "@volocopter/design-library-react";
import type { Flight } from "@voloiq-typescript-api/flight-planning-types";
import { useFlightMonitoringTranslation } from "../../translations/useFlightMonitoringTranslation";

type FlightInformationPanelProps = {
    flight: Flight;
    startTime: string;
};

export const FlightInformationPanel = (props: FlightInformationPanelProps) => {
    const { flight, startTime } = props;
    const { t, i18n } = useFlightMonitoringTranslation();
    const bgColor = useColorModeValue("white", "gray.900");
    const dateFormatter = new Intl.DateTimeFormat(i18n.language, { dateStyle: "short", timeStyle: "short" });

    return (
        <VStack
            w="300px"
            bgColor={bgColor}
            boxShadow="lg"
            borderRadius="lg"
            data-testid="flight-information-panel"
            overflow="hidden"
            alignItems="flex-start"
            p={3}
        >
            <Text fontSize={21} fontWeight="bold">
                {flight.name}
            </Text>

            <Grid width="100%" templateColumns="repeat(2, 1fr)" gap={2}>
                <GridItem>
                    <Text fontWeight="bold" fontSize={13}>
                        {t("flightInformation.flightNumber")}:
                    </Text>
                </GridItem>
                <GridItem>
                    <Text fontSize={13}>{flight.flightNumber}</Text>
                </GridItem>
                <GridItem>
                    <Text fontWeight="bold" fontSize={13}>
                        {t("flightInformation.vtolRegistration")}:
                    </Text>
                </GridItem>
                <GridItem>
                    <Text fontSize={13}>{flight.vtolRegistration}</Text>
                </GridItem>
                <GridItem>
                    <Text fontWeight="bold" fontSize={13}>
                        {t("flightInformation.vtolType")}:
                    </Text>
                </GridItem>
                <GridItem>
                    <Text fontSize={13}>{flight.vtolType}</Text>
                </GridItem>
                <GridItem>
                    <Text fontWeight="bold" fontSize={13}>
                        {t("flightInformation.startTime")}:
                    </Text>
                </GridItem>
                <GridItem>
                    <Text fontSize={13}>{dateFormatter.format(new Date(startTime))}</Text>
                </GridItem>
                <GridItem>
                    <Text fontWeight="bold" fontSize={13}>
                        {t("flightInformation.scheduledArrivalTime")}:
                    </Text>
                </GridItem>
                <GridItem>
                    <Text fontSize={13}>{flight.tsat && dateFormatter.format(new Date(flight.tsat))}</Text>
                </GridItem>
            </Grid>
        </VStack>
    );
};
