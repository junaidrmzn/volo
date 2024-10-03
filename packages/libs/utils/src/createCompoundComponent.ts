import type { ReactElement, ReactNode } from "react";
import { Children, isValidElement } from "react";

const getCompoundComponentChildren = <T extends ReactElement<{ children?: ReactNode }>>(
    element: ReactNode,
    typeguard: (object: unknown) => object is T
) => Children.toArray(element).filter<ReactElement>(isValidElement).find(typeguard)?.props.children;

const getCompoundComponent = <T extends ReactElement>(
    element: ReactNode,
    typeguard: (object: unknown) => object is T
) => Children.toArray(element).filter<ReactElement>(isValidElement).filter(typeguard);

export const createCompoundComponent = <P extends {} = { children?: ReactNode }>() => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const CompoundComponent: FCC<P> = () => null;
    const isCompoundComponent = (object: unknown): object is ReactElement<P> =>
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        (object as ReactElement).type === CompoundComponent;

    return {
        CompoundComponent,
        getCompoundComponent: (element: ReactNode) => getCompoundComponent(element, isCompoundComponent),
        getCompoundComponentChildren: (element: ReactNode) =>
            getCompoundComponentChildren(element, isCompoundComponent),
    };
};
