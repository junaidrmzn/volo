import { HStack, Text, VStack } from "@volocopter/design-library-react";

export const Home = () => {
    return (
        <VStack h="100%" justifyContent="center">
            <svg viewBox="0 0 62 68" height="200px">
                <path
                    d="M54.92 1.75A12.91 12.91 0 0048.41 0H13A13 13 0 001.75 19.53l17.69 30.65a13 13 0 0022.56 0l17.69-30.64a13 13 0 00-4.77-17.79zM13 5.62h24.7c-.2.29-.39.58-.57.89l-8 13.92H13a7.41 7.41 0 010-14.81zm21.4 44.46a7.41 7.41 0 01-10.1-2.71L12 26c.35 0 .7.05 1 .05h16.1l8 13.92a7.41 7.41 0 01-2.68 10.11zm20.43-33.35L42.49 38.1c-.15-.32-.31-.63-.49-.94l-8-13.92 8-13.92a7.41 7.41 0 0112.83 7.41zm21.46-2.36h6.88l7.41"
                    fill="currentColor"
                />
            </svg>
            <HStack spacing={0}>
                <Text fontSize="5xl" fontWeight="bold">
                    Volo
                </Text>
                <Text fontSize="5xl">IQ</Text>
            </HStack>
        </VStack>
    );
};
