import type { TextProps } from "@volocopter/design-library-react";
import { Text } from "@volocopter/design-library-react";

export const ColumnText = (props: TextProps) => {
    const { children, ...textProps } = props;

    return (
        <Text fontSize="xxs" lineHeight={4} color="fontOnBgAction" {...textProps}>
            {children || "-"}
        </Text>
    );
};
