import { Text, TextProps } from "@volocopter/design-library-react";

export type TextSeparatorProps = {
    separator?: string;
} & TextProps;

export const TextSeparator = (props: TextSeparatorProps) => {
    const { separator = "|", ...textProps } = props;

    return (
        <Text color="accentSecondaryDisabled" {...textProps}>
            {separator}
        </Text>
    );
};
