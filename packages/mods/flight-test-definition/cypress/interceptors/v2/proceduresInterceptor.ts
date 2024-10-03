import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "../MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const patchProcedureInterceptorV2 = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "PATCH",
            new RegExp(`${baseUrl}/ftd/v2/definitions/${uuidRegex}/procedures/${uuidRegex}${parameterRegex}$`),
            {
                statusCode: 200,
                ...options,
            }
        )
        .as("patchProcedureInterceptor");
