import { Box, ButtonGroup, Icon, IconButton } from "@volocopter/design-library-react";
import type { RefObject } from "react";
import { useTimeSchedulerState } from "../time-scheduler-state/useTimeSchedulerState";
import { useTranslations } from "../translations/useTranslations";

export type ZoomControlsProps = { containerRef: RefObject<HTMLDivElement> };
export const ZoomControls = (props: ZoomControlsProps) => {
    const { containerRef } = props;
    const { t } = useTranslations();
    const { dispatch, zoomFactor } = useTimeSchedulerState();

    const zoom = (direction: "in" | "out") => {
        const { current: element } = containerRef;
        if (element === null) return;
        const { width } = element.getBoundingClientRect();
        const { scrollLeft: leftOffset } = element;

        dispatch({
            type: "zoom",
            zoomFactor: Math.round(zoomFactor * (direction === "in" ? 14 : 1 / 0.14)) / 10,
            leftOffset,
            mouseCursorOffset: width / 2,
        });
    };
    return (
        <Box position="sticky" bottom={0} left="calc(100% - 64px)" zIndex="1000">
            <Box position="absolute" right={0} bottom={0} p={3} pr={0} background="white" borderTopLeftRadius="md">
                <ButtonGroup isAttached>
                    <IconButton variant="secondary" onClick={() => zoom("in")} aria-label={t("zoomInButtonLabel")}>
                        <Icon icon="plus" />
                    </IconButton>
                    <IconButton variant="secondary" onClick={() => zoom("out")} aria-label={t("zoomOutButtonLabel")}>
                        <Icon icon="minus" />
                    </IconButton>
                </ButtonGroup>
            </Box>
        </Box>
    );
};
