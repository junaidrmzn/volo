import { HStack, Hide, Skeleton, VStack } from "@volocopter/design-library-react";

export const SkeletonLoader = () => {
    const startColor = "darkBlue.100";
    const endColor = "darkBlue.200";
    const label = "Loading...";
    return (
        <VStack paddingX={6} boxSize="full" alignItems="stretch" data-testid="skeleton-loader">
            {/* This is added so that tests from other modules that were using the spinner components don't fail */}
            <Hide>{label}</Hide>
            <Skeleton height="60px" startColor={startColor} endColor={endColor} isLoading />
            {Array.from({ length: 4 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <HStack height="150px" key={index}>
                    <Skeleton height="100%" flex={1} startColor={startColor} endColor={endColor} isLoading />
                </HStack>
            ))}
        </VStack>
    );
};
