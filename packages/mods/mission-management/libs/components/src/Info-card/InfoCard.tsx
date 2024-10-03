import { Card, Divider, Flex, HStack, Text, VStack } from "@volocopter/design-library-react";
import { ReactNode } from "react";
import { TagWithTooltip } from "../tag-with-tooltip/TagWithTooltip";

type TagType = "normal" | "warning" | "error";

type TagPosition = "right" | "left";

export type InfoCardProps = {
    headerLabel: string;
    tagLabel?: string;
    tagType?: TagType;
    tagTooltipLabel?: string;
    tagPosition?: TagPosition;
    actions?: ReactNode;
    bodyContent: ReactNode;
};

export const InfoCard = (props: InfoCardProps) => {
    const {
        headerLabel,
        tagLabel,
        tagTooltipLabel,
        actions,
        bodyContent,
        tagType = "normal",
        tagPosition = "right",
    } = props;

    return (
        <Card width="100%" p={3}>
            <VStack alignItems="flex-start">
                <Flex width="100%" mb={1} alignItems="center">
                    <VStack spacing={0} alignItems="flex-start" minWidth="-webkit-fit-content">
                        <HStack minWidth="-webkit-fill-available" spacing={0}>
                            <Text fontSize="sm" fontWeight="bold">
                                {headerLabel}
                            </Text>
                        </HStack>
                    </VStack>
                    {(tagLabel || actions) && (
                        <VStack
                            spacing={0}
                            alignItems={tagPosition === "right" ? "flex-end" : "stretch"}
                            width="100%"
                            justifyContent="space-between"
                        >
                            <HStack
                                spacing={0}
                                alignItems={tagPosition === "right" ? "flex-end" : "stretch"}
                                justifyContent="space-between"
                                ml={3}
                            >
                                {tagLabel && (
                                    <TagWithTooltip
                                        placement="top"
                                        colorScheme={
                                            tagType === "warning"
                                                ? "warning-subtle"
                                                : tagType === "error"
                                                ? "error-subtle"
                                                : "gray"
                                        }
                                        tooltipLabel={tagTooltipLabel}
                                        tagContent={tagLabel}
                                    />
                                )}
                                <VStack spacing={0} alignItems="stretch" justifyContent="space-between">
                                    <HStack spacing={0} alignItems="stretch" justifyContent="space-between">
                                        {actions}
                                    </HStack>
                                </VStack>
                            </HStack>
                        </VStack>
                    )}
                </Flex>
                <Divider />
                <VStack width="100%" alignItems="flex-start" gap={3} pt={1}>
                    {bodyContent}
                </VStack>
            </VStack>
        </Card>
    );
};
