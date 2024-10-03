import { Alert, Heading, Text, VStack } from "@volocopter/design-library-react";
import type { Error } from "@voloiq/service";

export type ErrorDisplayProps = {
    error?: Error;
};

export const ErrorDisplay: FCC<ErrorDisplayProps> = (props) => {
    const { error } = props;

    if (!error) return null;

    return (
        <Alert colorScheme="error-subtle" p={4} m={4}>
            <VStack align="flex-start">
                <Heading size="lg">{error.message}</Heading>
                {error.details?.flatMap((entry) => (
                    <Text>{entry}</Text>
                ))}
            </VStack>
        </Alert>
    );
};
