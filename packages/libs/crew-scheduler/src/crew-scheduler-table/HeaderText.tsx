import type { TextProps } from "@volocopter/design-library-react";
import { Text } from "@volocopter/design-library-react";

export const HeaderText = (props: TextProps) => {
    const { children, ...textProps } = props;

    return (
        <Text fontSize="sm" lineHeight={4} fontWeight="bold" {...textProps}>
            {children}
        </Text>
    );
};
