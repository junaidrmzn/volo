import { v4 as uuidV4 } from "uuid";
import { anyDefinition } from "../../v2";
import type { ChangeLogDetails } from "./apiModels";

export const anyChangeLogDetails = (overwrites?: Partial<ChangeLogDetails>): ChangeLogDetails => ({
    id: uuidV4(),
    userId: uuidV4(),
    userName: "Calvin Bayer",
    updateTime: "2023-05-16T07:31:21.482211+00:00",
    updateType: "Status Change",
    transactionId: 12_345,
    entity: anyDefinition(),
    ...overwrites,
});
