import { uuidRegex } from "@voloiq/flight-test-definition-utils";
import { InterceptorOptions } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const bulkEditRevisionsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("PATCH", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/revisions`), {
            statusCode: 200,
            ...options,
        })
        .as("bulkEditRevisionsInterceptor");
