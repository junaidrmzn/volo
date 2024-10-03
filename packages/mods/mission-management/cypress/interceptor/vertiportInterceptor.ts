import { Pad } from "@voloiq-typescript-api/vertiport-management-types";
import { BASE_URL, PARAMETER_REGEX, UUID_REGEX } from "./regex";

export const availablePadsListInterceptor = (pads: Pad[]) =>
    cy.intercept(
        "GET",
        new RegExp(`${BASE_URL}/vertiport-management/v1/vertiport/${UUID_REGEX}/pads/availability${PARAMETER_REGEX}$`),
        {
            statusCode: 200,
            body: {
                data: pads,
            },
        }
    );
