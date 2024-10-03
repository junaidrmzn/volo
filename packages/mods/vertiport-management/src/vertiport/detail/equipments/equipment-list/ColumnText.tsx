import type { TextProps } from "@volocopter/design-library-react";
import { Text } from "@volocopter/design-library-react";

export const ColumnText = (props: TextProps) => {
    const { children, ...textProps } = props;

    return (
        <Text fontSize="xs" lineHeight={4} color="darkBlue.700" {...textProps}>
            {children || "-"}
        </Text>
    );
};
