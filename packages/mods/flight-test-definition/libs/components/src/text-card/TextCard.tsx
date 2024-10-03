import { Text, VStack } from "@volocopter/design-library-react";
import type { ReactNode } from "react";

export type TextCardProps = {
    label: ReactNode;
    text?: ReactNode;
};

export const TextCard = (props: TextCardProps) => {
    const { label, text = "-" } = props;

    return (
        <VStack p={3} borderRadius="sm" backgroundColor="gray100Gray900" spacing={0} alignItems="flex-start">
            <Text fontSize="sm" fontWeight="bold" lineHeight={6}>
                {label}
            </Text>
            <Text fontSize="sm" lineHeight={6} whiteSpace="pre-wrap">
                {text}
            </Text>
        </VStack>
    );
};
