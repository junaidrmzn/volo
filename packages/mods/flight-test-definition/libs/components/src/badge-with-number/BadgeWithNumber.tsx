import { HStack, Text } from "@volocopter/design-library-react";

export type BadgeWithNumberProps = {
    title: string;
    count: number;
};
export const BadgeWithNumber = (props: BadgeWithNumberProps) => {
    const { title, count } = props;
    return (
        <HStack spacing={0.5} borderRadius="xs" overflow="hidden" boxSize="max-content">
            <Text
                fontSize="xs"
                lineHeight={6}
                fontWeight="bold"
                whiteSpace="nowrap"
                background="blue50Mono800"
                px={1.5}
            >
                {title}
            </Text>
            <Text fontSize="xs" lineHeight={6} fontWeight="bold" background="blue50Mono800" px={1.5}>
                {count}
            </Text>
        </HStack>
    );
};
