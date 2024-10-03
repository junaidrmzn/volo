export type WorkOrderState = "OPEN" | "CLOSED";

export type WorkOrderDefectClassification = "X" | "Z";

export type WorkStep = {
    sequence: number;
    workOrderNumber: number;
    headline?: string;
    description: string;
};

export type WorkOrder = {
    aircraftId: string;
    number: number;
    state: WorkOrderState;
    issueSign: string;
    dueDate?: string;
    ataChapterNumber: string;
    defectClassification: WorkOrderDefectClassification;
    aogClassification?: string;
    priority?: string;
    packageName?: string;
    workSteps: WorkStep[];
};
