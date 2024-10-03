import { HStack, Skeleton, VStack } from "@volocopter/design-library-react";

const startColor = "darkBlue.100";
const endColor = "darkBlue.200";

export const AircraftScheduleSkeleton = () => (
    <VStack paddingX={6} boxSize="full" alignItems="stretch">
        <Skeleton height="60px" startColor={startColor} endColor={endColor} isLoading />
        {Array.from({ length: 3 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <HStack height="150px" key={index}>
                <Skeleton height="100%" width="250px" startColor={startColor} endColor={endColor} isLoading />
                <Skeleton height="100%" flex={1} startColor={startColor} endColor={endColor} isLoading />
            </HStack>
        ))}
    </VStack>
);
