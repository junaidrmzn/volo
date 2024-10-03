import { Box, BoxProps, Icon } from "@volocopter/design-library-react";
import type { RefObject } from "react";
import { useTimeSchedulerState } from "../time-scheduler-state/useTimeSchedulerState";
import { useTranslations } from "../translations/useTranslations";
import { useScroll } from "./context/useScroll";

export type ScrollControlProps = {
    containerRef: RefObject<HTMLDivElement>;
    direction: "left" | "right";
} & Partial<BoxProps>;
export const ScrollControl = (props: ScrollControlProps) => {
    const { containerRef, direction, ...boxProps } = props;
    const { t } = useTranslations();
    const icon = direction === "left" ? "chevronLeft" : "chevronRight";
    const label = direction === "left" ? t("scrollLeftButtonLabel") : t("scrollRightButtonLabel");
    const { scrollTo } = useScroll();
    const { dispatch } = useTimeSchedulerState();

    const scroll = () => {
        const pixelsToShift = 400;
        const { current: element } = containerRef;
        if (element === null) return;
        const { scrollLeft, clientWidth, scrollWidth } = element;
        const left = scrollLeft + pixelsToShift * (direction === "left" ? -1 : 1);

        scrollTo(left);
        if (left < 500) {
            dispatch({ type: "scroll", direction: "left", leftOffset: left });
        } else if (left + clientWidth > scrollWidth - 500) {
            dispatch({ type: "scroll", direction: "right", leftOffset: left });
        } else {
            dispatch({ type: "scroll", direction, leftOffset: left, updateOffsetOnly: true });
        }
    };

    return (
        <Box as="button" aria-label={label} height={4.5} minWidth={0} onClick={scroll} {...boxProps}>
            <Icon icon={icon} size={4} />
        </Box>
    );
};
