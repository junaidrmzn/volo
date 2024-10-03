import { CsflSite, anyCsflSite } from "@voloiq/flight-planning-api/v1";
import { baseUrl } from "./constants";
import { getResponseValuesArray } from "./utils/mockResponse";
import { parameterRegex } from "./utils/regexTemplates";

export const getCsflSitesInterceptor = (routeId: number, csflSites?: Partial<CsflSite>[]) =>
    cy.intercept("GET", new RegExp(`${baseUrl}/routes/${routeId}/csfl-sites${parameterRegex}$`), {
        ...getResponseValuesArray(anyCsflSite, 200, csflSites),
    });
