export type CreateActionBarMachineOptions = {
    getResourceInfo: () => string;
};
export const createActionBarMachine = (config: CreateActionBarMachineOptions) => {
    const { getResourceInfo } = config;

    return {
        context: {
            getResourceInfo,
        },
        states: {
            action_bar: {
                id: "action_bar",
            },
        },
    };
};
