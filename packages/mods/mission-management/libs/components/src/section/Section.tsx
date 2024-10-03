import { Box, Flex, HStack, Text, VStack } from "@volocopter/design-library-react";
import { ReactNode } from "react";

type FontWeight = "light" | "normal" | "medium" | "semibold" | "bold";
export type SectionProps = {
    headerLabel: string;
    headerFontWeight?: FontWeight;
    resourceLabel?: string;
    headerIcon?: ReactNode;
    actions?: ReactNode;
    bodyContent: ReactNode;
    useInitialSpacing?: boolean;
    bg?: string;
};

export const Section = (props: SectionProps) => {
    const {
        headerLabel,
        headerFontWeight,
        resourceLabel,
        bodyContent,
        actions,
        headerIcon,
        useInitialSpacing = true,
        bg,
    } = props;

    return (
        <Box width="100%" backgroundColor={bg || "bgNavigationLayer1"} borderRadius="md">
            <VStack spacing={1.5} alignItems="flex-start" p={useInitialSpacing ? 3 : "unset"}>
                <Flex width="100%" mb={1}>
                    <VStack spacing={0} alignItems="flex-start" width="100%">
                        <HStack>
                            <Text fontWeight={headerFontWeight || "light"}>{headerLabel}</Text>
                            {resourceLabel && (
                                <>
                                    <Text>•</Text>
                                    <Text fontSize="inherit" lineHeight="inherit" fontWeight="bold" whiteSpace="nowrap">
                                        {resourceLabel}
                                    </Text>
                                </>
                            )}
                            {headerIcon}
                        </HStack>
                    </VStack>
                    <VStack spacing={0} alignItems="flex-end">
                        <HStack spacing={0} alignItems="flex-end">
                            {actions}
                        </HStack>
                    </VStack>
                </Flex>
                <VStack width="100%" alignItems="flex-start">
                    {bodyContent}
                </VStack>
            </VStack>
        </Box>
    );
};
