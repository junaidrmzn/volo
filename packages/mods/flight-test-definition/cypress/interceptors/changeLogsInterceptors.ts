import { ChangeLogV2, anyChangeLogV2 } from "@voloiq/flight-test-definition-api/v2";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getAllChangelogsInterceptor = (
    changeLog?: Partial<ChangeLogV2>[],
    options?: InterceptorOptions<ChangeLogV2>
) => {
    cy.intercept("GET", new RegExp(`${baseUrl}/ftd/v2/definitions/${uuidRegex}/changelogs${parameterRegex}$`), {
        ...getResponseValuesArray<ChangeLogV2>(anyChangeLogV2, 200, changeLog),
        ...options,
    }).as("getAllChangelogs");
};
