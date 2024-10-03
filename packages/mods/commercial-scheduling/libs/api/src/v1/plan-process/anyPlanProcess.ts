import { PlanProcess } from "./apiModel";

export const anyPlanProcess = (overwrites?: Partial<PlanProcess>): Required<PlanProcess> => ({
    id: "1",
    status: "NEW",
    remarks: "any plan process",
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
