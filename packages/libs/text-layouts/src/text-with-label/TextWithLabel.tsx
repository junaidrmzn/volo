import type { TextProps } from "@volocopter/design-library-react";
import { Stack, Text } from "@volocopter/design-library-react";
import type { ReactNode } from "react";
import { match } from "ts-pattern";
import { useTextLayoutTranslations } from "../translations/useTextLayoutTranslations";

export type TextWithLabelProps = {
    label: ReactNode;
    text?: ReactNode | number;
    size?: "xs" | "small" | "medium";
    unknownValueText?: string;
} & TextProps;

export const TextWithLabel = (props: TextWithLabelProps) => {
    const { t } = useTextLayoutTranslations();
    const { label, text, size = "medium", unknownValueText = t("textWithLabel.unknownValue"), ...rest } = props;

    const labelProps = match(size)
        .with("xs", () => ({ fontSize: "xxs" }))
        .with("small", () => ({ fontSize: "xxs" }))
        .with("medium", () => ({ fontSize: "xs" }))
        .exhaustive();

    const textProps = match(size)
        .with("xs", () => ({ fontSize: "xs" }))
        .with("small", () => ({ fontSize: "sm" }))
        .with("medium", () => ({ fontSize: "md" }))
        .exhaustive();

    return (
        <Stack spacing="0">
            <Text {...labelProps} lineHeight={6} fontWeight="bold" color="fontOnBgMuted" {...rest}>
                {label}
            </Text>
            <Text {...textProps} lineHeight={6} overflowWrap="anywhere" whiteSpace="pre-wrap" {...rest}>
                {text ?? unknownValueText}
            </Text>
        </Stack>
    );
};
