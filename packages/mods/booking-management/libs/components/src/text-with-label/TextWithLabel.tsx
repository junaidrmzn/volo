import { Text, VStack } from "@volocopter/design-library-react";

export type TextWithLabelProps = {
    label: string | number;
};

export const TextWithLabel: FCC<TextWithLabelProps> = (props) => {
    const { label, children } = props;

    return (
        <VStack align="flex-start" spacing={0}>
            <Text size="small" color="fontOnBgBasic">
                {label}
            </Text>
            <Text size="medium">{children}</Text>
        </VStack>
    );
};
