import type { ConditionalWrapperBaseProps } from "./ConditionalWrapperBaseProps";

export type ConditionalWrapperWithoutPropsProps<T> = ConditionalWrapperBaseProps<T>;
export const isWrapperWithoutProps = <T>(object: {}): object is ConditionalWrapperWithoutPropsProps<T> =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-assertion
    (object as any).wrapperProps === undefined;
