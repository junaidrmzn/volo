import type { Config } from "./authConfig";

export const authConfigurationStub: Config = {
    authorization: {
        mapping: [],
    },
    domain: "unusedInTests",
    type: "static",
    verificationInfo: {
        authority: "unusedInTests",
        clientId: "unusedInTests",
        redirectUri: "unusedInTests",
    },
};
