import { cloneElement } from "react";
import type { ConditionalWrapperWithPropsProps } from "./ConditionalWrapperWithProps";
import { isWrapperWithProps } from "./ConditionalWrapperWithProps";
import type { ConditionalWrapperWithoutPropsProps } from "./ConditionalWrapperWithoutProps";
import { isWrapperWithoutProps } from "./ConditionalWrapperWithoutProps";

export type ConditionalWrapperProps<T> = ConditionalWrapperWithoutPropsProps<T> | ConditionalWrapperWithPropsProps<T>;

export const ConditionalWrapper = <T extends {}>(props: ConditionalWrapperProps<T>) => {
    const { condition, children } = props;

    if (condition && isWrapperWithProps(props)) {
        const { wrapperProps, Wrapper } = props;
        return cloneElement(<Wrapper {...wrapperProps}>{children}</Wrapper>);
    }
    if (condition && isWrapperWithoutProps(props)) {
        const { Wrapper } = props;
        return cloneElement(<Wrapper>{children}</Wrapper>);
    }

    return <>{children}</>;
};
