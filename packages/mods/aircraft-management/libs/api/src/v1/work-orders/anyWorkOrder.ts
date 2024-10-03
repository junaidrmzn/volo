import { WorkOrder } from "./apiModels";

export const anyWorkOrder = (overwrites?: Partial<WorkOrder>): WorkOrder => ({
    number: 1223,
    aircraftId: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
    state: "OPEN",
    dueDate: "2023-09-01T06:01:00.000Z",
    defectClassification: "Z",
    ataChapterNumber: "00-00",
    aogClassification: "TEST aog_classification",
    priority: "2",
    issueSign: "WWWGUEST",
    packageName: "test package",
    workSteps: [
        {
            description: "AOG DUE TO DAMAGED PAINT",
            headline: "TEST headline",
            sequence: 1,
            workOrderNumber: 4236,
        },
        {
            sequence: 2,
            workOrderNumber: 4236,
            description: "AOG DUE TO DAMAGED SEAT",
        },
    ],
    ...overwrites,
});
