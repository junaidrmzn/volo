import { Button, Divider, HStack, Icon, IconButton, Text, VStack } from "@volocopter/design-library-react";
import { ReactNode } from "react";
import { RouteCardActions } from "../route-card/RouteCardActions";
import { useLayoutSection } from "./hooks/useLayoutSection";
import { useLayoutSectionTranslation } from "./translations";

export type LayoutSectionProps = {
    children?: ReactNode;
    firstLabel: string;
    secondLabel?: string;
    hasCollapseButton?: boolean;
    hasAddButton?: boolean;
    hasActionButton?: boolean;
    hasActionItem?: boolean;
    hasCloseButton?: boolean;
    onClose?: () => void;
};

export const LayoutSection = (props: LayoutSectionProps) => {
    const {
        firstLabel,
        secondLabel,
        hasCollapseButton,
        children,
        hasAddButton,
        hasCloseButton,
        hasActionButton,
        hasActionItem,
        onClose,
    } = props;
    const { t } = useLayoutSectionTranslation();
    const { isCollapsed, setIsCollapsed } = useLayoutSection();

    return (
        <VStack p={3} gap={2.5} width="100%" backgroundColor="bgNavigationLayer1">
            <HStack w="100%">
                <HStack w="100%">
                    {hasCollapseButton && (
                        <IconButton
                            variant="ghost"
                            aria-label={isCollapsed ? t("expand") : t("collapse")}
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            <Icon icon={isCollapsed ? "chevronDown" : "chevronUp"} size={4} />
                        </IconButton>
                    )}
                    <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color="fontOnBgActive"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        maxWidth={150}
                    >
                        {firstLabel}
                    </Text>
                    {secondLabel && (
                        <>
                            <Text fontSize="sm" fontWeight="semibold" color="fontOnBgActive" align="start">
                                {" - "}
                            </Text>
                            <Text fontSize="sm" color="fontOnBgActive">
                                {secondLabel}
                            </Text>
                        </>
                    )}
                </HStack>
                {hasAddButton && (
                    <VStack align="flex-end">
                        <Button variant="secondary" size="sm">
                            {t("add")}
                        </Button>
                    </VStack>
                )}

                {hasActionButton && (
                    <VStack align="flex-end">
                        <Button variant="secondary" size="sm">
                            {t("validity.recalculate")}
                        </Button>
                    </VStack>
                )}
                {hasActionItem && <RouteCardActions />}
                {hasCloseButton && (
                    <VStack align="flex-end">
                        <IconButton variant="ghost" aria-label={t("close")} onClick={onClose}>
                            <Icon icon="close" size={4} />
                        </IconButton>
                    </VStack>
                )}
            </HStack>
            <Divider />
            {!isCollapsed && children}
        </VStack>
    );
};
