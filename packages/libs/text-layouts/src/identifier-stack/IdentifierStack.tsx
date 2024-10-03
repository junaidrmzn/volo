import { Stack, Text } from "@volocopter/design-library-react";

export type IdentifierStackProps = {
    mainIdentifier: string | number;
    secondaryIdentifier?: string | number;
    thirdIdentifier?: string | number;
};

export const IdentifierStack = (props: IdentifierStackProps) => {
    const { mainIdentifier, secondaryIdentifier, thirdIdentifier } = props;
    return (
        <Stack spacing={1}>
            <Text fontSize="md" lineHeight={6} fontWeight="bold">
                {String(mainIdentifier)}
            </Text>
            <Stack spacing={0}>
                {secondaryIdentifier && (
                    <Text fontSize="md" lineHeight={6}>
                        {String(secondaryIdentifier)}
                    </Text>
                )}
                {thirdIdentifier && (
                    <Text fontSize="md" lineHeight={6}>
                        {String(thirdIdentifier)}
                    </Text>
                )}
            </Stack>
        </Stack>
    );
};
