import { v4 as uuidV4 } from "uuid";
import { ChangeLogV2 } from "./apiModels";

export const anyChangeLogV2 = (overwrites?: Partial<ChangeLogV2>): ChangeLogV2 => ({
    id: uuidV4(),
    revision: "A00",
    value: [
        {
            id: "8b4fc1ea-6b56-4a7d-b57e-9d043f57d6e1",
            userName: "Usama Imtiaz",
            userId: "45796a5b-235b-462f-8799-1799cee5e2e2",
            updateTime: "2023-11-28T10:10:21.122829Z",
            updateType: "Status Change",
            entityType: "flightTestDefinition",
            title: "Flight Test Review",
            revision: "A01",
            status: "ENGINEERING REVIEW",
            transactionId: 1879,
            referenceId: "5c63b9b0-a20b-4ff2-981b-650f7813a975",
        },
    ],
    ...overwrites,
});
