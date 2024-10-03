import { PlanConnectionsState } from "@voloiq/commercial-scheduling-api/v1";

type UsePlanTabIconOptions = {
    connectionsState?: PlanConnectionsState;
};

export const usePlanAlertIcon = (options: UsePlanTabIconOptions) => {
    const { connectionsState } = options;
    return connectionsState === "ALL_INCONSISTENT"
        ? ("error" as const)
        : connectionsState === "SOME_INCONSISTENT"
        ? ("warning" as const)
        : ("neutralSuccess" as const);
};
