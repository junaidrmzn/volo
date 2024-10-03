import { Revision, anyRevision } from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import { InterceptorOptions, getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getAllRevisionsInterceptor = (revisions?: Partial<Revision>[], options?: InterceptorOptions<Revision>) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/revisions${parameterRegex}$`), {
            ...getResponseValuesArray<Revision>(anyRevision, 200, revisions),
            ...options,
        })
        .as("getAllRevisions");
