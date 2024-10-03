import { PlanProcessProgress } from "./apiModel";

export const anyPlanProcessProgress = (overwrites?: Partial<PlanProcessProgress>): Required<PlanProcessProgress> => ({
    status: "NEW",
    comments: "comments",
    errors: [
        {
            detailedError: "string",
            attribute: "string",
            value: "some value",
            message: "error string",
            key: "#MULTIPLE_REGIONS",
        },
    ],
    ...overwrites,
});
