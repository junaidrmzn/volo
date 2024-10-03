import { useContext } from "react";
import { TimeSchedulerConfigContext } from "./TimeSchedulerConfigContext";

export const useTimeSchedulerConfig = () => {
    const config = useContext(TimeSchedulerConfigContext);

    if (config === undefined) {
        throw new Error("useTimeSchedulerConfig must be used within TimeSchedulerConfigProvider");
    }

    return config;
};
