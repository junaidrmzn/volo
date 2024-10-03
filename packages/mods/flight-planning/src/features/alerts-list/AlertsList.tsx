import { Box, HStack, Heading, Icon, IconButton, VStack } from "@volocopter/design-library-react";
import type { Alert } from "@voloiq-typescript-api/flight-planning-types";
import { AlertsListItem } from "./AlertsListItem";

type AlertsListProps = { alerts: Alert[]; closeRightSidebar: () => void };

export const AlertsList = (props: AlertsListProps) => {
    const { alerts, closeRightSidebar } = props;

    return (
        <VStack align="start" height="100%" width="100%">
            <Box p={3} flexDirection="column" width="100%">
                <HStack justifyContent="space-between" width="100%">
                    <IconButton
                        variant="ghost"
                        aria-label="close"
                        onClick={closeRightSidebar}
                        data-testid="alerts-list-close-button"
                    >
                        <Icon icon="close" color="darkBlue.300" />
                    </IconButton>
                    <Heading size="md" fontWeight="bold" data-testid="alerts-sidebar-header">
                        {alerts.length === 0 ? "No Alerts" : "Alerts"}
                    </Heading>
                    <Box height="36px" width="40px" />
                </HStack>
            </Box>
            <Box width="100%" flexGrow={1} overflowY="auto" align="center">
                {alerts.length > 0 &&
                    alerts.map((alert: Alert) => <AlertsListItem alert={alert} key={`alerts-list-item-${alert.id}`} />)}
            </Box>
        </VStack>
    );
};
