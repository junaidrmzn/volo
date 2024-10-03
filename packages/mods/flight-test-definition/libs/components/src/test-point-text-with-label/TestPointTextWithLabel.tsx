import type { BoxProps } from "@volocopter/design-library-react";
import { Text, VStack } from "@volocopter/design-library-react";
import type { ReactNode } from "react";

export type TestPointTextWithLabelProps = {
    label: ReactNode;
    text?: ReactNode | number | string;
} & BoxProps;

export const TestPointTextWithLabel = (props: TestPointTextWithLabelProps) => {
    const { label, text, ...boxProps } = props;

    return (
        <VStack spacing={0} alignItems="flex-start" {...boxProps}>
            <Text lineHeight={6} fontSize="xs" fontWeight="bold" color="fontOnBgMuted" whiteSpace="nowrap">
                {label}
            </Text>
            {typeof text === "string" || typeof text === "number" || !text ? (
                <Text lineHeight={6} fontSize="sm" whiteSpace="nowrap">
                    {text ?? "-"}
                </Text>
            ) : (
                text
            )}
        </VStack>
    );
};
