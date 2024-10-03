import { Box, Icon, IconButton } from "@volocopter/design-library-react";
import type { RefObject } from "react";
import { useTranslations } from "../translations/useTranslations";
import { useScroll } from "./context/useScroll";

export type ScrollControlProps = {
    containerRef: RefObject<HTMLDivElement>;
    direction: "left" | "right";
};
export const ScrollControl = (props: ScrollControlProps) => {
    const { containerRef, direction } = props;
    const { t } = useTranslations();
    const icon = direction === "left" ? "chevronLeft" : "chevronRight";
    const label = direction === "left" ? t("scrollLeftButtonLabel") : t("scrollRightButtonLabel");
    const { scrollTo, iconRef } = useScroll();

    const scroll = () => {
        const { current: element } = containerRef;
        if (element === null) return;
        const { scrollLeft } = element;
        const left = scrollLeft + 400 * (direction === "left" ? -1 : 1);
        scrollTo(left);
    };

    return (
        <Box ref={iconRef}>
            <IconButton
                variant="ghost"
                icon={<Icon icon={icon} size={6} />}
                aria-label={label}
                height="30px"
                minWidth={0}
                onClick={scroll}
            />
        </Box>
    );
};
