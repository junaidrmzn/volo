import { Box, Center, Spinner } from "@volocopter/design-library-react";

export const LoadingPage = () => {
    return (
        <Box boxSize="full" height="100vh">
            <Center height="full">
                <Spinner size="md" />
            </Center>
        </Box>
    );
};
