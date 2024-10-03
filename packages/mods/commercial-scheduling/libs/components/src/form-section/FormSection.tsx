import { HStack, Spacer, Text, VStack } from "@volocopter/design-library-react";

export type FormSectionProps = {
    label: string;
    orientation?: string;
};

export const FormSection: FCC<FormSectionProps> = (props) => {
    const { children, label, orientation } = props;

    const content =
        orientation === "v" ? (
            <VStack spacing={6} width="full">
                {children}
            </VStack>
        ) : (
            <HStack alignItems="flex-start" spacing={6} width="full">
                {children}
            </HStack>
        );
    return (
        <VStack width="full">
            <Text
                fontSize="sm"
                lineHeight="1.5rem"
                size="medium"
                fontWeight="bold"
                color="blue500Mono500"
                height="fit-content"
                alignSelf="start"
            >
                {label}
            </Text>
            <Spacer />
            {content}
        </VStack>
    );
};
