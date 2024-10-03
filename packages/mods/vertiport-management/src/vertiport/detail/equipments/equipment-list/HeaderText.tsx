import { Text } from "@volocopter/design-library-react";

export const HeaderText: FCC = (props) => {
    const { children } = props;

    return (
        <Text fontSize="xxs" lineHeight={4} fontWeight="bold" color="darkBlue.500">
            {children}
        </Text>
    );
};
