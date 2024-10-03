import type { LogContextState } from "./LogContext";
import { LogContext } from "./LogContext";

type LogContextProviderProps = {
    value: LogContextState;
};

export const LogContextProvider: FCC<LogContextProviderProps> = (props) => {
    const { children, value } = props;

    return <LogContext.Provider value={value}>{children}</LogContext.Provider>;
};
