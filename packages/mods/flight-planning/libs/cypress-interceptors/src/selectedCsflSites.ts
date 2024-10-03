import { SelectedCsflSite, anySelectedCsflSite } from "@voloiq/flight-planning-api/v1";
import { baseUrl } from "./constants";
import { getResponseValuesArray } from "./utils/mockResponse";
import { parameterRegex } from "./utils/regexTemplates";

export const getSelectedCsflSitesInterceptor = (routeId: number, selectedCsflSites?: Partial<SelectedCsflSite>[]) =>
    cy.intercept("GET", new RegExp(`${baseUrl}/routes/${routeId}/selected-csfl-sites${parameterRegex}$`), {
        ...getResponseValuesArray(anySelectedCsflSite, 200, selectedCsflSites),
    });
