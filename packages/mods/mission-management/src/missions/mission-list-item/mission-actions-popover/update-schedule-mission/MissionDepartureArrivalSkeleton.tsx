import { Box, Flex, Grid, Skeleton } from "@volocopter/design-library-react";

export const MissionDepartureArrivalSkeleton = () => {
    const startColor = "darkBlue.100";
    const endColor = "darkBlue.200";

    return (
        <Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                <Skeleton height="3rem" width="full" startColor={startColor} endColor={endColor} isLoading />
                <Skeleton height="3rem" width="full" startColor={startColor} endColor={endColor} isLoading />
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={2} mt={2}>
                <Skeleton height="4rem" width="full" startColor={startColor} endColor={endColor} isLoading />
                <Skeleton height="4rem" width="full" startColor={startColor} endColor={endColor} isLoading />
            </Grid>
            <Skeleton mt={2} height="4rem" width="full" startColor={startColor} endColor={endColor} isLoading />
            <Flex mt={5} justifyContent="flex-end">
                <Skeleton height="3rem" width="6rem" startColor={startColor} endColor={endColor} isLoading />
            </Flex>
        </Box>
    );
};
