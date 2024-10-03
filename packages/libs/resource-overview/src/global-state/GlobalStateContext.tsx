import type { useMachine } from "@xstate/react";
import { createContext } from "react";

export const GlobalStateContext = createContext<ReturnType<typeof useMachine> | undefined>(undefined);
