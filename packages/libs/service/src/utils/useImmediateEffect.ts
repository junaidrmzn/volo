import type { DependencyList, EffectCallback } from "react";
import { useEffect, useRef } from "react";

const areArraysEqual = <T>(a?: T, b?: T) => JSON.stringify(a) === JSON.stringify(b);

export const useImmediateEffect = (effect: EffectCallback, deps?: DependencyList) => {
    const destructorRef = useRef<ReturnType<EffectCallback>>();
    const depsRef = useRef<DependencyList>();

    if (!depsRef.current || areArraysEqual(depsRef.current, deps)) {
        depsRef.current = deps;
        destructorRef.current?.();
        destructorRef.current = effect();
    }

    useEffect(
        () => () => {
            destructorRef.current?.();
        },
        []
    );
};
