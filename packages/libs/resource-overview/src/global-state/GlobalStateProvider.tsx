import { useMachine } from "@xstate/react";
import type { PropsWithChildren } from "react";
import type { AnyStateMachine } from "xstate";
import { isDevelopment } from "@voloiq/utils";
import { GlobalStateContext } from "./GlobalStateContext";

export type GlobalStateProviderProps = {
    stateMachine: AnyStateMachine;
};

export const GlobalStateProvider = (props: PropsWithChildren<GlobalStateProviderProps>) => {
    const { stateMachine, children } = props;
    const machine = useMachine(stateMachine, { devTools: isDevelopment });

    return <GlobalStateContext.Provider value={machine}>{children}</GlobalStateContext.Provider>;
};
