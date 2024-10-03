import { HStack, Text, VStack } from "@volocopter/design-library-react";

export type IconCardProps = {
    label: string;
    helpText: string;
    backgroundColor?: string;
};

export const IconCard = (props: IconCardProps) => {
    const { label, helpText, backgroundColor = "bgNavigationLayer2" } = props;

    return (
        <HStack p={4.5} backgroundColor={backgroundColor} borderRadius="md" alignItems="flex-start">
            <VStack flex={1} alignItems="flex-start" spacing={0}>
                <Text fontSize="lg" fontWeight="medium" lineHeight="shorter">
                    {label}
                </Text>
                <Text fontSize="xs" fontWeight="light" lineHeight="shorter" color="fontOnBgMuted">
                    {helpText}
                </Text>
            </VStack>
        </HStack>
    );
};
