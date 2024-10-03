import type { ReactElement, ReactNode } from "react";
import { Children, isValidElement } from "react";

const getCompoundComponentProps = <P, T extends ReactElement<P> = ReactElement<P>>(
    element: ReactNode,
    typeguard: (object: unknown) => object is T
) => {
    const props = Children.toArray(element).filter<ReactElement>(isValidElement).find(typeguard)?.props;

    if (!props) {
        throw new Error("Props on compound component are not defined");
    }

    return props;
};

const getCompoundComponentOptionalProps = <P, T extends ReactElement<P> = ReactElement<P>>(
    element: ReactNode,
    typeguard: (object: unknown) => object is T
) => {
    return Children.toArray(element).filter<ReactElement>(isValidElement).find(typeguard)?.props;
};

export const createCompoundComponent = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unicorn/consistent-function-scoping
    const CompoundComponent = <P = { children?: ReactNode }>(props: P): ReactElement<P> | null => null;
    const isCompoundComponent = <P = { children?: ReactNode }>(object: unknown): object is ReactElement<P> =>
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        (object as ReactElement).type === CompoundComponent;

    return {
        CompoundComponent,
        getCompoundComponentProps: <P = { children?: ReactNode }>(element: ReactNode) =>
            getCompoundComponentProps<P>(element, isCompoundComponent),
        getCompoundComponentOptionalProps: <P = { children?: ReactNode }>(element: ReactNode) =>
            getCompoundComponentOptionalProps<P>(element, isCompoundComponent),
    };
};
