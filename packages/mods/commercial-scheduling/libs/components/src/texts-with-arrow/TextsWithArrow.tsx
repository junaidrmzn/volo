import { HStack, Icon, Text, TextProps } from "@volocopter/design-library-react";

export type TextsWithArrowProps = TextProps & {
    leftText: React.ReactNode;
    rightText: React.ReactNode;
};

export const TextsWithArrow = (props: TextsWithArrowProps) => {
    const { leftText, rightText, ...restProps } = props;

    return leftText && rightText ? (
        <HStack spacing={3}>
            <Text {...restProps}>{leftText}</Text>
            <Icon aria-label="arrowRight" icon="arrowRight" />
            <Text {...restProps}>{rightText}</Text>
        </HStack>
    ) : null;
};
