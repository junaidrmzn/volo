import { useLayoutEffect, useRef, useState } from "react";

export const useEventCardResize = () => {
    const [isStatusBoxVisible, setIsStatusBoxVisible] = useState(true);
    const [isSubtitleVisible, setIsSubTitleVisible] = useState(true);
    const [isTitleVisible, setIsTitleVisible] = useState(true);
    const [isOptionsIconVisible, setIsOptionsIconVisible] = useState(true);

    const outerStackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === outerStackRef.current) {
                    const newContainerWidth = entry.contentRect.width;
                    setIsStatusBoxVisible(newContainerWidth > 250);
                    setIsSubTitleVisible(newContainerWidth > 170);
                    setIsTitleVisible(newContainerWidth > 115);
                    setIsOptionsIconVisible(newContainerWidth > 130);
                }
            }
        });
        const targetElement = outerStackRef.current;

        if (targetElement) {
            resizeObserver.observe(targetElement);

            return () => {
                resizeObserver.unobserve(targetElement);
            };
        }

        return undefined;
    }, []);

    return { isTitleVisible, isStatusBoxVisible, isSubtitleVisible, isOptionsIconVisible, outerStackRef };
};
