import { Button, Icon } from "@volocopter/design-library-react";
import { useRef } from "react";
import { useBackToTopButtonTranslation } from "./translations/useBackToTopButtonTranslation";

const findNextScrollableParent = (element: HTMLElement | null): HTMLElement | null => {
    const parent: HTMLElement | null = element?.parentNode as HTMLElement;

    if (parent.scrollHeight > parent.clientHeight || parent === null) {
        return parent;
    }
    return findNextScrollableParent(parent);
};

const scrollToTop = <Element extends HTMLElement | null>(element: Element) => {
    const scrollableParent = findNextScrollableParent(element);
    scrollableParent?.scrollTo({ top: 0, behavior: "smooth" });
};

const useButtonRef = () => useRef<HTMLButtonElement>(null);

export const BackToTopButton = () => {
    const { t } = useBackToTopButtonTranslation();
    const ref = useButtonRef();

    return (
        <Button
            variant="ghost"
            size="lg"
            leftIcon={<Icon icon="arrowUp" />}
            onClick={() => scrollToTop(ref.current)}
            ref={ref}
        >
            {t("Back to top")}
        </Button>
    );
};
