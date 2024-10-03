import { parameterRegex, revisionRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const exportPdfFileInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "POST",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/revisions/${revisionRegex}/pdf${parameterRegex}$`),
            (request) => {
                request.reply({
                    statusCode: 200,
                    body: "Hi folks",
                    headers: {
                        "content-type": "application/pdf",
                    },
                    ...options,
                });
            }
        )
        .as("exportPdfFile");
