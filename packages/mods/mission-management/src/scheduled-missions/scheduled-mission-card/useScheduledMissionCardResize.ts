import { useLayoutEffect, useRef, useState } from "react";

export const useScheduledMissionCardResize = () => {
    const [isXSCardVisible, setIsXSCardVisible] = useState(true);
    const [isSCardVisible, setIsSCardVisible] = useState(true);
    const [isMCardVisible, setIsMCardVisible] = useState(true);
    const [isLCardVisible, setIsLCardVisible] = useState(true);

    const outerStackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === outerStackRef.current) {
                    const newContainerWidth = entry.contentRect.width;
                    setIsXSCardVisible(newContainerWidth > 100);
                    setIsSCardVisible(newContainerWidth > 155);
                    setIsMCardVisible(newContainerWidth > 220);
                    setIsLCardVisible(newContainerWidth > 290);
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

    return { isXSCardVisible, isSCardVisible, isMCardVisible, isLCardVisible, outerStackRef };
};
