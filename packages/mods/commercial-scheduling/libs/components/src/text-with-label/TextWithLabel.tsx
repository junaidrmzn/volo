import { Text, VStack } from "@volocopter/design-library-react";

export type TextWithLabelProps = {
    label?: string;
    text?: string | number;
    suffix?: string | number;
    noTextLabel?: string | number;
};

export const TextWithLabel = (props: TextWithLabelProps) => {
    const { label, text, suffix, noTextLabel = "" } = props;

    return (
        <VStack alignSelf="flex-end" alignItems="flex-start" flex={1}>
            {label && (
                <Text color="fontOnBgMuted" fontWeight="bold" size="small">
                    {label}
                </Text>
            )}
            <Text size="medium">
                {text ?? noTextLabel} {text && suffix ? suffix : ""}
            </Text>
        </VStack>
    );
};
