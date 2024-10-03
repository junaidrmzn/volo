import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import { useSetRowLabelHeight } from "../scheduler-row-height/row-label-height/useSetRowLabelHeight";

const getAbsoluteHeight = (element: Element) => {
    const styles = window.getComputedStyle(element);
    const margin = Number.parseFloat(styles.marginTop) + Number.parseFloat(styles.marginBottom);
    const padding = Number.parseFloat(styles.paddingTop) + Number.parseFloat(styles.paddingBottom);

    return Math.ceil(element.getBoundingClientRect().height + margin + padding);
};

export type UseSchedulerRowLabelHeightProps = {
    schedulerRowIndex: number;
    labelChildren: ReactNode;
};
export const useSchedulerRowLabelHeight = (props: UseSchedulerRowLabelHeightProps) => {
    const { schedulerRowIndex, labelChildren } = props;
    const { setRowLabelHeight } = useSetRowLabelHeight({ schedulerRowIndex });
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const { current: element } = ref;
        if (!element || !element.children) {
            return;
        }
        const { children } = element;
        let totalChildrenHeight = 0;
        for (const childNode of children) {
            totalChildrenHeight += getAbsoluteHeight(childNode);
        }
        setRowLabelHeight(totalChildrenHeight);

        // labelChildren needs to be a dependency even though it is not used, because we need to recalculate the childrens' total height whenever they change
    }, [labelChildren, setRowLabelHeight]);

    return { ref };
};
