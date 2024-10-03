import type { TextProps } from "@volocopter/design-library-react";
import { Button, Stack, Text } from "@volocopter/design-library-react";
import type { ReactNode } from "react";
import { match } from "ts-pattern";
import { useTextLayoutTranslations } from "../translations/useTextLayoutTranslations";

export type TextWithLabelProps = {
    label: ReactNode;
    text?: string;
    size?: "small" | "medium";
    unknownValueText?: string;
} & TextProps;

export const TextWithLinkLabel = (props: TextWithLabelProps) => {
    const { t } = useTextLayoutTranslations();
    const { label, text, size = "medium", unknownValueText = t("textWithLabel.unknownValue"), ...rest } = props;
    const textArray = text?.split(", ") ?? [];

    const labelProps = match(size)
        .with("small", () => ({ fontSize: "xxs" }))
        .with("medium", () => ({ fontSize: "xs" }))
        .exhaustive();

    const textProps = match(size)
        .with("small", () => ({ fontSize: "sm" }))
        .with("medium", () => ({ fontSize: "md" }))
        .exhaustive();

    return (
        <Stack spacing="0">
            <Text {...labelProps} lineHeight={6} fontWeight="bold" color="fontOnBgMuted" {...rest}>
                {label}
            </Text>
            {textArray.length > 0 &&
                Object.values(textArray).map((text) => (
                    <Button variant="link">
                        <Text {...textProps} lineHeight={6} overflowWrap="anywhere" whiteSpace="pre-wrap" {...rest}>
                            {text ?? unknownValueText}
                        </Text>
                    </Button>
                ))}
        </Stack>
    );
};
