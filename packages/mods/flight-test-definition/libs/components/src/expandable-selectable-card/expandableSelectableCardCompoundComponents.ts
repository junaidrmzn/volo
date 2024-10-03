import type { ReactElement, ReactNode } from "react";
import { Children, isValidElement } from "react";

export type CompoundComponent = (props: { children: ReactNode }) => null;
export const Title: CompoundComponent = () => null;
export const Content: CompoundComponent = () => null;
export const getCompoundComponentChildrenFactory = (children: ReactNode) => (compoundComponent: CompoundComponent) =>
    Children.toArray(children)
        .filter<ReactElement>(isValidElement)
        .find((child) => child.type === compoundComponent)?.props.children;
