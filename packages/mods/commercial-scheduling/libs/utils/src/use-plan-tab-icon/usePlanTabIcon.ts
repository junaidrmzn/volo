type UsePlanTabIconOptions = {
    isApproved?: boolean;
};

export const usePlanTabIcon = (options: UsePlanTabIconOptions) => {
    const { isApproved } = options;

    return isApproved ? ("success" as const) : ("arrowRightCircle" as const);
};
