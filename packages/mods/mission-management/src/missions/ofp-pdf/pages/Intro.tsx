import { Box, HStack, ListItem, Text, UnorderedList } from "@volocopter/design-library-react";
import { voloIQAirServices } from "../resources";

export const Intro = () => {
    return (
        <Box position="relative" w="100%" h="100%">
            <img src={voloIQAirServices} alt="logo" style={{ width: 500 }} />
            <Box position="absolute" w="100%" top="40%">
                <Box borderWidth={2} borderColor="#d1d1d1" p={5}>
                    <Text fontSize="md" fontWeight="bold" mb={5}>
                        Operational Flight Plan
                    </Text>
                    <HStack marginLeft={18}>
                        <Text fontSize="sm">for</Text>
                        <Text fontSize="md" fontWeight="bold">
                            Flight Group
                        </Text>
                    </HStack>
                </Box>
                <HStack justifyContent="flex-end">
                    <Text my={2} fontSize="xxs" fontWeight="bold">
                        Air Support - Operational Flight Plan
                    </Text>
                </HStack>
                <Text ml={10} fontSize="xs">
                    Flight Group flights:
                </Text>
                <UnorderedList>
                    <ListItem>
                        <HStack justifyContent="space-between">
                            <Text fontSize="xs">VO1DIVAS-EDFM-EDFE (STD 111100)</Text>
                            <Text fontSize="xs">ATC FPL status: ACK</Text>
                            <Text fontSize="xs">EOBT: 1100</Text>
                        </HStack>
                    </ListItem>
                    <ListItem>
                        <HStack justifyContent="space-between">
                            <Text fontSize="xs">VO1DIVAS-EDFM-EDFE (STD 111100)</Text>
                            <Text fontSize="xs">ATC FPL status: ACK</Text>
                            <Text fontSize="xs">EOBT: 1100</Text>
                        </HStack>
                    </ListItem>
                </UnorderedList>
            </Box>
        </Box>
    );
};
