import { Box, HStack, Icon, IconButton } from "@volocopter/design-library-react";
import { ReactNode, RefObject } from "react";
import { useScrollableContainerTranslation } from "./translations/useScrollableContainerTranslation";
import { OverflowDirections } from "./useOverflowDirections";
import { useScrollSelectedChildIntoView } from "./useScrollSelectedChildIntoView";

export type ScrollableContainerProps = {
    children: ReactNode;
    overflowDirections: OverflowDirections;
    scrollContainerRef: RefObject<HTMLDivElement>;
};

export const ScrollableContainer = (props: ScrollableContainerProps) => {
    const { children, overflowDirections, scrollContainerRef } = props;

    const { t } = useScrollableContainerTranslation();

    useScrollSelectedChildIntoView({ scrollContainerRef });

    const onScroll = (direction: "LEFT" | "RIGHT") => {
        const element = scrollContainerRef.current;
        if (!element) {
            return;
        }
        const scrollFactor = direction === "LEFT" ? -0.7 : 0.7;
        const scrollDistance = (element.clientWidth ?? 0) * scrollFactor;
        element.scroll({ left: element.scrollLeft + scrollDistance, behavior: "smooth" });
    };

    return (
        <Box position="relative" overflow="hidden" px={9}>
            {overflowDirections.includes("LEFT") && (
                <IconButton
                    aria-label={t("Scroll left")}
                    variant="ghost"
                    position="absolute"
                    left={0}
                    top={2}
                    onClick={() => onScroll("LEFT")}
                >
                    <Icon icon="chevronLeft" size={4} />
                </IconButton>
            )}
            <HStack
                spacing={2.5}
                overflowX="scroll"
                css={{
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none",
                }}
                ref={scrollContainerRef}
            >
                {children}
            </HStack>
            {overflowDirections.includes("RIGHT") && (
                <IconButton
                    aria-label={t("Scroll right")}
                    variant="ghost"
                    position="absolute"
                    right={0}
                    top={2}
                    onClick={() => onScroll("RIGHT")}
                >
                    <Icon icon="chevronRight" size={4} />
                </IconButton>
            )}
        </Box>
    );
};
