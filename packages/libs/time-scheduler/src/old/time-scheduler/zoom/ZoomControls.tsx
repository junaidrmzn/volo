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
        const { left: horizontalContainerOffsetFromDocument, width } = element.getBoundingClientRect();
        const { scrollLeft: leftOffset } = element;

        dispatch({
            type: "zoom",
            zoomFactor: Math.round(zoomFactor * (direction === "in" ? 14 : 1 / 0.14)) / 10,
            leftOffset,
            mouseCursorOffset: horizontalContainerOffsetFromDocument + width / 2,
        });
    };
    return (
        <Box position="sticky" bottom={10} left="calc(100% - 60px)" zIndex="1000">
            <Box position="absolute" right="10px" bottom="10px">
                <ButtonGroup isAttached>
                    <IconButton variant="secondary" onClick={() => zoom("out")} aria-label={t("zoomOutButtonLabel")}>
                        <Icon icon="minus" />
                    </IconButton>
                    <IconButton variant="secondary" onClick={() => zoom("in")} aria-label={t("zoomInButtonLabel")}>
                        <Icon icon="plus" />
                    </IconButton>
                </ButtonGroup>
            </Box>
        </Box>
    );
};
