import { Flex, useColorModeValue } from "@volocopter/design-library-react";

type RightPanelProps = {
    isVisible: boolean;
};
export const RightPanel: FCC<RightPanelProps> = (props) => {
    const { children, isVisible } = props;
    const bgColor = useColorModeValue("white", "gray.900");
    return (
        <Flex
            flexDirection="column"
            bgColor={bgColor}
            pos="absolute"
            top={28}
            bottom={80}
            right={24}
            w="300px"
            boxShadow="lg"
            borderRadius="lg"
            alignItems="normal"
            display={isVisible ? "flex" : "none"}
            overflow="hidden"
            data-testid="right-panel"
        >
            {children}
        </Flex>
    );
};
