import { AlertStatusIcon, Box, HStack, Text, VStack } from "@volocopter/design-library-react";
import { AlertSnackBarProps, useAlertSnackbarStatus } from "@voloiq/commercial-scheduling-utils";

export const AlertSnackBar = (props: AlertSnackBarProps) => {
    const { status } = props;

    const { backgroundColor, heading, description, icon } = useAlertSnackbarStatus({ status });

    return (
        <Box title="alert-banner" bg={backgroundColor} rounded="md" p="4">
            <HStack alignItems="flex-start" spacing={3}>
                <AlertStatusIcon size={6} variant={icon} />
                <VStack alignItems="flex-start" spacing={1}>
                    <Text fontSize="md" fontWeight="bold">
                        {heading}
                    </Text>
                    <Text fontSize="sm">{description}</Text>
                </VStack>
            </HStack>
        </Box>
    );
};
