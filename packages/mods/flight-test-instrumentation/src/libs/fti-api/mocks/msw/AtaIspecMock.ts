import type { AtaIspec } from "@voloiq-typescript-api/fti-types";
import type { PathParams } from "msw";
import { rest } from "msw";
import type { MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";

export const anyAtaIspec = (overwrites?: Partial<AtaIspec>): AtaIspec => ({
    id: "d7d89c68-6590-4aed-8e10-efd2630dcd17",
    label: "spec",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const makeGetAllAtaIspecsHandler = (
    expectedResponse?: MockResponseArray<AtaIspec>,
    expectedParams?: PathParams
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<AtaIspec>(anyAtaIspec, 200, expectedResponse);

    return rest.get(`${BACKEND_BASE_URL}/ata-ispecs`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};
