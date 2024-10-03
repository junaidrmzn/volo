import { Skeleton, VStack } from "@volocopter/design-library-react";

export const ImportFormSkeleton = () => {
    return (
        <VStack spacing={5}>
            <VStack w="full" alignItems="start">
                <Skeleton height={4} width="10%" isLoading />
                <Skeleton height={10} width="full" isLoading />
            </VStack>
            <VStack w="full" alignItems="start">
                <Skeleton height={4} width="20%" isLoading />
                <Skeleton height={20} width="full" isLoading />
            </VStack>
        </VStack>
    );
};
