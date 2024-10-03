import { Center, Flex, HStack, Icon, useColorModeValue } from "@volocopter/design-library-react";

type FlightStatusItemProps = {
    icon: "battery" | "clock" | "mapPin" | "alert";
};

export const FlightStatusItem: FCC<FlightStatusItemProps> = (props) => {
    const { icon, children } = props;

    const bgColorRight = useColorModeValue("darkBlue.800", "darkBlue.300");
    const txtColor = useColorModeValue("white", "darkBlue.800");
    const bgColorLeft = useColorModeValue("white", "gray.700");

    return (
        <HStack columnGap="3" height="12" borderRadius="sm" overflow="hidden">
            <Flex flexDirection="row" h="100%" w="50">
                <Flex
                    backgroundColor={bgColorLeft}
                    flexGrow="1"
                    flexDir="column"
                    boxSizing="border-box"
                    p={1}
                    paddingLeft={3}
                    justifyContent="center"
                >
                    {children}
                </Flex>
                <Center backgroundColor={bgColorRight} textColor={txtColor} w="10">
                    <Icon icon={icon} />
                </Center>
            </Flex>
        </HStack>
    );
};
