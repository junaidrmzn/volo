import { List, ListItem, VStack } from "@volocopter/design-library-react";

export type FlightTestPlanIdsProps = {
    flightTestPlanIds: string[] | undefined;
};

export const FlighTestPlanIdList = (props: FlightTestPlanIdsProps) => {
    const { flightTestPlanIds } = props;

    return flightTestPlanIds?.length && flightTestPlanIds.length > 0 ? (
        <VStack alignItems="flex-start" pl={2}>
            <List lineHeight={6}>
                {flightTestPlanIds?.map((flightTestPlanId) => (
                    <ListItem key={flightTestPlanId} fontSize="xs">
                        • {flightTestPlanId}
                    </ListItem>
                ))}
            </List>
        </VStack>
    ) : (
        <>-</>
    );
};
