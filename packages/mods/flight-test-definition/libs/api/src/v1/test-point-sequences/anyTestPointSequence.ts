import { anyTipTapJson } from "../../common";
import { TestPointSequence } from "./apiModels";

const someDate = new Date("2024-04-01T00:00:00Z");
const id = "ce118b6e-d8e1-11e7-9296-cec278b6b50a";
const flightTestOrderId = "ce118b6e-d8e1-11e7-9296-cec278b6b50b";

export const anyTestPointSequence = (overwrites: Partial<TestPointSequence> = {}): TestPointSequence => ({
    id,
    createTime: someDate.toISOString(),
    updateTime: someDate.toISOString(),
    flightTestOrderId,
    type: "Test Type",
    testPoint: JSON.stringify(anyTipTapJson("Test Success Criteria")),
    successCriteria: JSON.stringify(anyTipTapJson("Test Success Criteria")),
    ...overwrites,
});
