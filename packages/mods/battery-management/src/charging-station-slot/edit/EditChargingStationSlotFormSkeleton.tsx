import { Box, Card, SimpleGrid, Skeleton } from "@volocopter/design-library-react";
import { useChargingStationSlotFormSchema } from "./useChargingStationSlotFormSchema";

export const EditChargingStationSlotFormSkeleton = () => {
    const schema = useChargingStationSlotFormSchema();
    const fieldCount = Object.keys(schema.fields).length;

    return (
        <Box width="100%">
            <Card>
                <SimpleGrid columns={{ sm: 2, md: 4, lg: 3 }} spacing="20px" w="full">
                    {Array.from({ length: fieldCount - 1 }).map((_, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Box key={index}>
                            <Skeleton height="24px" width="140px" isLoading mb={2} />
                            <Skeleton height="40px" isLoading />
                        </Box>
                    ))}
                </SimpleGrid>
            </Card>
        </Box>
    );
};
