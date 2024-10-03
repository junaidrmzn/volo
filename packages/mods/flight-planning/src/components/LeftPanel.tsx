import { VStack } from "@volocopter/design-library-react";

export const LeftPanel: FCC = (props) => {
    const { children } = props;
    return (
        <VStack
            spacing={9}
            pos="absolute"
            pointerEvents="none"
            top={6}
            left={6}
            bottom="232px"
            w="300px"
            alignItems="normal"
        >
            {children}
        </VStack>
    );
};
