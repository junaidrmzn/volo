import { Skeleton, VStack } from "@volocopter/design-library-react";

export const ScheduledMissionsSkeleton = () => {
    const startColor = "darkBlue.100";
    const endColor = "darkBlue.200";

    return (
        <VStack gap={1} boxSize="full" alignItems="stretch">
            <Skeleton height="40px" width="full" startColor={startColor} endColor={endColor} isLoading />
            <Skeleton height="30px" width={80} startColor={startColor} endColor={endColor} isLoading />
            <Skeleton height="210px" width="full" startColor={startColor} endColor={endColor} isLoading />
        </VStack>
    );
};
