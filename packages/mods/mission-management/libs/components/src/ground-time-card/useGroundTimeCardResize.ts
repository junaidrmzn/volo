import { useLayoutEffect, useRef, useState } from "react";

export const useGroundTimeCardResize = () => {
    const [isSCardVisible, setIsSCardVisible] = useState(true);
    const [isMCardVisible, setIsMCardVisible] = useState(true);

    const outerStackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === outerStackRef.current) {
                    const newContainerWidth = entry.contentRect.width;
                    setIsSCardVisible(newContainerWidth > 100);
                    setIsMCardVisible(newContainerWidth > 155);
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

    return { isSCardVisible, isMCardVisible, outerStackRef };
};
