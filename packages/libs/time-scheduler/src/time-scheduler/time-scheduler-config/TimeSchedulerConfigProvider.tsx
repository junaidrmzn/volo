import type { PropsWithChildren } from "react";
import type { TimeSchedulerConfigContextType } from "./TimeSchedulerConfigContext";
import { TimeSchedulerConfigContext } from "./TimeSchedulerConfigContext";

export type TimeSchedulerConfigProviderProps = PropsWithChildren<TimeSchedulerConfigContextType>;
export const TimeSchedulerConfigProvider = (props: TimeSchedulerConfigProviderProps) => {
    const { children, ...Config } = props;

    return <TimeSchedulerConfigContext.Provider value={Config}>{children}</TimeSchedulerConfigContext.Provider>;
};
