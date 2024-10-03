import type { ReactElement, ReactNode } from "react";

export type ConditionalWrapperBaseProps<T> = {
    children: ReactNode;
    condition: boolean;
    Wrapper: (props: T & { children: ReactNode }) => ReactElement | null;
};
