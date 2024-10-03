import { anyRegion } from "@voloiq/commercial-scheduling-api/v1";
import { regionUrl } from "./endPoints";
import { paramsRegex } from "./regex";

export const getRegionsInterceptor = () => {
    const url = new RegExp(`^${regionUrl}${paramsRegex}$`);

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: [anyRegion()],
            error: null,
            meta: null,
            paginatoion: { page: 1, size: 3, totalPages: 1, totalElements: 1 },
        },
    }).as("getRegions");
};
