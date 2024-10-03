import { VStack } from "@volocopter/design-library-react";

export const LeftPanel: FCC = (props) => {
    const { children } = props;
    return (
        <VStack
            w="300px"
            position="absolute"
            left={32}
            top={6}
            zIndex="99"
            boxShadow="lg"
            borderRadius="lg"
            data-testid="left-panel"
            overflow="hidden"
            alignItems="flex-start"
            gap={8}
        >
            {children}
        </VStack>
    );
};
