import { pactify } from "../../pactify";
import { anyTestPointParameter } from "./anyTestPointParameter";

// This is an attempt to prevent diverging fixtures in UI and Contract tests.
// The contract test data and the ui test data should always have the same source.
// See here for reference: https://docs.pact.io/consumer/using_pact_to_support_ui_testing#3-use-shared-fixtures-to-set-up-the-pact-tests-and-seed-a-non-pact-stub-server
export const anyPactTestPointParameter = pactify(anyTestPointParameter);
