import { CardListItem, Grid, GridItem, Stack, Text } from "@volocopter/design-library-react";
import type { FlightPlanInfo } from "@voloiq-typescript-api/flight-planning-types";
import { useFlightPlanningTranslation } from "../../translations";
import { StatusPanel } from "./components/StatusPanel";

type FlightPlanListItemProps = {
    flightPlan: FlightPlanInfo;
    selectedId: string | undefined;
    setSelectedId: (id: string | undefined) => void;
};

export const FlightPlanListItem = (props: FlightPlanListItemProps) => {
    const { flightPlan, selectedId, setSelectedId } = props;

    const isSelectedId = (id: string) => selectedId === id;
    const { t } = useFlightPlanningTranslation();
    return (
        <CardListItem
            isSelected={isSelectedId(flightPlan.externalId!)}
            onClick={() => {
                if (selectedId === flightPlan.externalId) {
                    setSelectedId(undefined);
                } else {
                    setSelectedId(flightPlan.externalId);
                }
            }}
            ariaLabel={`Card ${flightPlan.id}`}
        >
            <Grid templateColumns="30% 10% 20% 20% 20%" alignItems="center">
                <GridItem>
                    <Text fontWeight="700" fontSize="20">
                        {`${flightPlan.routeOption?.departureExternalVertiport.name} - ${flightPlan.routeOption?.arrivalExternalVertiport.name}`}
                    </Text>
                </GridItem>
                <GridItem textAlign="center">
                    <Stack spacing={0.5}>
                        <Text fontSize="xs" lineHeight="shorter">
                            {t("flightPlanManagement.status")}
                        </Text>
                        <StatusPanel planStage={flightPlan.planStage} conflictStatus={flightPlan.conflictStatus} />
                    </Stack>
                </GridItem>
                <GridItem>
                    <Stack spacing={0.5}>
                        <Text fontSize="xs" lineHeight="shorter">
                            {t("flightPlanManagement.aircraftType")}
                        </Text>
                        <Text fontSize="md">{flightPlan.routeOption?.aircraftType}</Text>
                    </Stack>
                </GridItem>
            </Grid>
        </CardListItem>
    );
};
