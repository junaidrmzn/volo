import { array, mixed, object, string } from "yup";

export const authSchema = object({
    domain: string().required(),
    type: mixed<"static" | "msal">().oneOf(["static", "msal"]).required(),
    verificationInfo: object({
        clientId: string().required(),
        authority: string().required(),
        redirectUri: string().required(),
    }).default(undefined),
    authorization: object({
        mapping: array()
            .of(
                object({
                    sourceId: string().required(),
                    targetGroupName: string().required(),
                })
            )
            .required(),
    }).required(),
});
