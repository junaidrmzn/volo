import type { ServiceState } from "@voloiq/service";

export const mergeServiceStates = (states: string[]): ServiceState => {
    if (states.includes("error")) {
        return "error";
    }
    if (states.includes("pending")) {
        return "pending";
    }
    if (states.filter((state) => state === "success").length === states.length) {
        return "success";
    }
    return "idle";
};
