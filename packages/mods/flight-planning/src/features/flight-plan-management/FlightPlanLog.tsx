import { Box, Grid, GridItem, List, ListItem, Text, useColorModeValue } from "@volocopter/design-library-react";
import { useGetFlightPlanLog } from "../../api-hooks";
import { LoadingSpinner } from "../../components";
import { useFlightPlanningTranslation } from "../../translations";

type FlightPlanLogProps = {
    flightPlanId: number;
};

export const FlightPlanLog = (props: FlightPlanLogProps) => {
    const { flightPlanId } = props;
    const backgroundColor = useColorModeValue("gray.100", "whiteAlpha.600");
    const { t, i18n } = useFlightPlanningTranslation();
    const flightPlanLogQuery = useGetFlightPlanLog(flightPlanId);
    const dateFormatter = new Intl.DateTimeFormat(i18n.language, { dateStyle: "short", timeStyle: "short" });

    if (flightPlanLogQuery.isLoading) return <LoadingSpinner />;

    return (
        <>
            {flightPlanLogQuery.isSuccess && flightPlanLogQuery.data && flightPlanLogQuery.data.length > 0 && (
                <Box pt="4" w="100%">
                    <Text fontWeight="700" fontSize="20">
                        {t("flightPlanManagement.log")}
                    </Text>
                    <Box mt="4" borderRadius="sm" bg={backgroundColor} p="4" maxHeight="80" overflow="scroll">
                        <List>
                            {flightPlanLogQuery.data.map((logEntry) => (
                                <ListItem key={`logEntry-${logEntry.timestamp}`} my="4">
                                    <Grid templateColumns="30% 20% 50%" alignItems="left">
                                        <GridItem>
                                            <Text fontSize="sm">
                                                {dateFormatter.format(new Date(logEntry.timestamp))}
                                            </Text>
                                        </GridItem>
                                        <GridItem>
                                            <Text fontSize="sm">{logEntry.action}</Text>
                                        </GridItem>
                                        <GridItem>
                                            <Text fontSize="sm">{logEntry.message}</Text>
                                        </GridItem>
                                    </Grid>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            )}
        </>
    );
};
