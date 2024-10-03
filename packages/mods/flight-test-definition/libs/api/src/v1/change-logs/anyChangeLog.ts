import { v4 as uuidV4 } from "uuid";
import type { ChangeLog } from "./apiModels";

export const anyChangeLog = (overwrites?: Partial<ChangeLog>): ChangeLog => ({
    id: uuidV4(),
    userId: uuidV4(),
    userName: "Calvin Bayer",
    updateTime: "2023-05-16T07:31:21.482211+00:00",
    updateType: "Status Change",
    title: "ChangeLog Title",
    entityType: "flightTestDefinition",
    status: "ENGINEERING REVIEW",
    referenceId: "12345",
    ...overwrites,
});
