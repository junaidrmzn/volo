import { useCallback } from "react";
import { useLatest } from "react-use";
import { useTimeSchedulerConfig } from "../time-scheduler-config/useTimeSchedulerConfig";
import { isWithPersistentSettingsConfiguration } from "./persistentSettingsConfiguration";

export const usePersistentSettingsCallback = () => {
    const config = useTimeSchedulerConfig();
    const configRef = useLatest(config);

    const executeIfSettingsArePersisted = useCallback(
        (callback: (identifier: string) => void) => {
            const { current: config } = configRef;
            if (isWithPersistentSettingsConfiguration(config)) {
                const { identifier } = config;
                callback(identifier);
            }
        },
        [configRef]
    );

    return { executeIfSettingsArePersisted };
};
