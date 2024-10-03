import { Card, Text, VStack } from "@volocopter/design-library-react";
import type { Notam } from "@voloiq/network-schedule-management-api/v1";

type NotamsListItemProps = {
    notam: Notam;
};

export const NotamsListItem = (props: NotamsListItemProps) => {
    const { notam } = props;

    return (
        <VStack w="full">
            {notam.features.map((feature) => (
                <Card key={feature.id} variant="subtle" status="warning" w="full">
                    <Text fontWeight="semibold">{feature.properties.title}</Text>
                    <Text>{feature.properties.description}</Text>
                </Card>
            ))}
        </VStack>
    );
};
