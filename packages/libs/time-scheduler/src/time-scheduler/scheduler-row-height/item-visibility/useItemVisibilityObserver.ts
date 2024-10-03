import { useEffect, useRef } from "react";
import { useToggleItemVisibility } from "./useToggleItemVisibility";

export type UseItemVisibilityObserverProps = {
    id: string;
    itemRowIndex: number;
    schedulerRowIndex: number;
};

export const useItemVisibilityObserver = (props: UseItemVisibilityObserverProps) => {
    const { id, itemRowIndex, schedulerRowIndex } = props;

    const ref = useRef<HTMLDivElement>(null);
    const { toggleItemVisibility } = useToggleItemVisibility();

    useEffect(() => {
        const { current: element } = ref;
        if (!element) {
            return () => null;
        }

        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                toggleItemVisibility(id, itemRowIndex, schedulerRowIndex, !!entry?.isIntersecting);
            },
            {
                rootMargin: "100% 0% 100% 0%",
                root: document,
            }
        );

        intersectionObserver.observe(element);

        return () => {
            intersectionObserver.unobserve(element);
        };
    }, [ref, id, itemRowIndex, schedulerRowIndex, toggleItemVisibility]);

    return { ref };
};
