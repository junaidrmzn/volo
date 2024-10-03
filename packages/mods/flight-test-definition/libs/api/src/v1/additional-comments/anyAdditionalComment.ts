import { v4 as uuidV4 } from "uuid";
import type { AdditionalComment } from "./apiModels";

export const anyAdditionalComment = (overwrites?: Partial<AdditionalComment>): AdditionalComment => ({
    id: uuidV4(),
    comment: "This is important!",
    ...overwrites,
});
