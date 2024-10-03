import { ReactNode } from "react";
import { SegmentEditingContext } from "./SegmentEditingContext";
import { useSegmentEditingState } from "./useSegmentEditingState";

type SegmentEditingProviderProps = {
    children: ReactNode;
};
export const SegmentEditingProvider = (props: SegmentEditingProviderProps) => {
    const { children } = props;
    const routeOptionOverviewState = useSegmentEditingState();

    return <SegmentEditingContext.Provider value={routeOptionOverviewState}>{children}</SegmentEditingContext.Provider>;
};
