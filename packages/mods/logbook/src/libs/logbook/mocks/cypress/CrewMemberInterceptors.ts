import { UUID } from "uuidjs";
import type { CrewMember, CrewMemberInsert } from "@voloiq/logbook-api/v6";
import type { CypressParameter, InterceptorOptions, MockResponse, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValues, getResponseValuesArray } from "./MockResponse";
import { parameterRegex } from "./RegexTemplates";

export const anyCrewMember = (overwrites?: Partial<CrewMember>): CrewMember => ({
    id: UUID.generate(),
    createTime: new Date().toISOString(),
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

export const makeGetAllCrewMemberInterceptor = (
    expectedResponse?: MockResponseArray<CrewMember>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<CrewMember>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<CrewMember>(anyCrewMember, 200, expectedResponse);
    const getAllCrewMemberRegex = new RegExp(`^${BACKEND_BASE_URL}/crew-members${parameterRegex}$`, "m");
    return cy
        .intercept("GET", getAllCrewMemberRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getAllCrewMember");
};

export const makePostCrewMemberHandler = (
    expectedResponse?: MockResponse<CrewMember>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<CrewMember>
) => {
    const { returnStatus, returnValue } = getResponseValues<CrewMember>(anyCrewMember, 201, expectedResponse);

    const postCrewMemberRegex = new RegExp(`^${BACKEND_BASE_URL}/crew-members${parameterRegex}$`, "m");
    return cy
        .intercept("POST", postCrewMemberRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postCrewMember");
};
