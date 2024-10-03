import { Divider, Text, VStack } from "@volocopter/design-library-react";
import type { Alert } from "@voloiq-typescript-api/flight-planning-types";

type AlertsListItemProps = { alert: Alert };

export const AlertsListItem = (props: AlertsListItemProps) => {
    const { alert } = props;
    return (
        <VStack px={3} width="100%" textAlign="left" alignItems="left" data-testid={`alerts-list-item-${alert.id}`}>
            <Text>{alert.message!}</Text>
            <Divider />
        </VStack>
    );
};
