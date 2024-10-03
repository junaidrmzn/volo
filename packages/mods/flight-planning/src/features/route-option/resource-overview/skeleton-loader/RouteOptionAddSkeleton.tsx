import { Skeleton, VStack } from "@volocopter/design-library-react";

export const RouteOptionAddSkeleton = () => {
    const startColor = "darkBlue.100";
    const endColor = "darkBlue.200";

    return (
        <VStack paddingY={6} boxSize="full" alignItems="stretch" data-testid="skeleton-loader">
            <Skeleton height="60px" startColor={startColor} endColor={endColor} isLoading />
            <Skeleton height="60px" startColor={startColor} endColor={endColor} isLoading />
            <Skeleton height="60px" startColor={startColor} endColor={endColor} isLoading />
            <Skeleton height="60px" startColor={startColor} endColor={endColor} isLoading />
        </VStack>
    );
};
