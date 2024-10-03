import type { TextProps } from "@volocopter/design-library-react";
import { HStack, Icon, IconButton, Stack, Text, Tooltip } from "@volocopter/design-library-react";
import { match } from "ts-pattern";

export type TextWithLabelAndSupProps = {
    label?: string;
    text?: string;
    sup?: string;
    size?: "small" | "medium";
    tooltip?: React.ReactNode;
    noValueText?: string;
} & TextProps;

export const TextWithLabelAndSup = (props: TextWithLabelAndSupProps) => {
    const { label, text, sup, size = "medium", tooltip, noValueText = "", ...rest } = props;

    const labelAndSupProps = match(size)
        .with("small", () => ({ fontSize: "xxs" }))
        .with("medium", () => ({ fontSize: "xs" }))
        .exhaustive();

    const textProps = match(size)
        .with("small", () => ({ fontSize: "sm" }))
        .with("medium", () => ({ fontSize: "md" }))
        .exhaustive();

    return (
        <Stack spacing="0">
            <HStack spacing={1}>
                {label && (
                    <Text {...labelAndSupProps} lineHeight={6} fontWeight="bold" {...rest}>
                        {label}
                    </Text>
                )}
                {tooltip && (
                    <Tooltip label={tooltip} hasArrow placement="bottom">
                        <IconButton aria-label="info" variant="ghost" size="md">
                            <Icon icon="infoLight" size={4} />
                        </IconButton>
                    </Tooltip>
                )}
            </HStack>
            <HStack spacing={1}>
                <Text {...textProps} lineHeight={6} overflowWrap="anywhere" whiteSpace="pre-wrap" {...rest}>
                    {text ?? noValueText}
                </Text>

                {sup && (
                    <sup>
                        <Text {...labelAndSupProps} size="small" lineHeight={6} fontWeight="bold" {...rest}>
                            [{sup}]
                        </Text>
                    </sup>
                )}
            </HStack>
        </Stack>
    );
};
