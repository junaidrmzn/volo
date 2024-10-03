import type { ResponseValues } from "axios-hooks";
import { useEffect, useRef } from "react";
import { __, match, not } from "ts-pattern";

export type ServiceState = ReturnType<typeof useServiceState>;
export type UseServiceStateProps = Pick<ResponseValues<{}, {}, {}>, "loading" | "error">;

export const useServiceState = (state: UseServiceStateProps) => {
    const previousIdleStateRef = useRef(true);

    useEffect(() => {
        const { loading, error } = state;
        if (loading || error !== null) {
            previousIdleStateRef.current = false;
        }
    }, [state]);

    const previousIdleState = previousIdleStateRef.current;
    return match({ state, previousIdleState })
        .with({ state: { error: not(__.nullish) } }, () => "error" as const)
        .with({ state: { loading: true } }, () => "pending" as const)
        .with({ state: { loading: false }, previousIdleState: true }, () => "idle" as const)
        .with({ state: { loading: false }, previousIdleState: false }, () => "success" as const)
        .exhaustive();
};
