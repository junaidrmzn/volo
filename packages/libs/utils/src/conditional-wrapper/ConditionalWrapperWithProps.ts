import type { ConditionalWrapperBaseProps } from "./ConditionalWrapperBaseProps";

export type ConditionalWrapperWithPropsProps<T> = ConditionalWrapperBaseProps<T> & {
    wrapperProps: T;
};

export const isWrapperWithProps = <T extends {}>(object: unknown): object is ConditionalWrapperWithPropsProps<T> =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (object as ConditionalWrapperWithPropsProps<T>).wrapperProps !== undefined;
