import type { PathParams } from "msw";
import { rest } from "msw";
import type { CrewMember, CrewMemberInsert } from "@voloiq/logbook-api/v6";
import type { MockResponse, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValues, getResponseValuesArray } from "./MockResponse";

export const anyCrewMember = (overwrites?: Partial<CrewMember>): CrewMember => ({
    createTime: new Date().toISOString(),
    id: "fewg34wferv4e",
    updateTime: new Date().toISOString(),
    email: "bob.peterson@mail.com",
    firstName: "Bob",
    lastName: "Peterson",
    ...overwrites,
});

export const anyCrewMemberInsert = (overwrites?: Partial<CrewMemberInsert>): CrewMemberInsert => ({
    email: "bob.peterson@mail.com",
    firstName: "Bob",
    lastName: "Peterson",
    ...overwrites,
});

export const makeGetAllCrewMemberHandler = (
    expectedResponse?: MockResponseArray<CrewMember>,
    expectedParams?: PathParams
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<CrewMember>(anyCrewMember, 200, expectedResponse);

    return rest.get(`${BACKEND_BASE_URL}/crew-members`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makePostCrewMemberHandler = (expectedResponse?: MockResponse<CrewMember>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<CrewMember>(anyCrewMember, 201, expectedResponse);

    return rest.post(`${BACKEND_BASE_URL}/crew-members`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};
