import { ExternalAircraftType, anyExternalAircraftType } from "@voloiq/flight-planning-api/v1";
import { baseUrl } from "./constants";
import { getResponseValuesArray } from "./utils/mockResponse";
import { parameterRegex } from "./utils/regexTemplates";

export const getExternalAircraftTypesInterceptor = (aircraftTypes?: Partial<ExternalAircraftType>[]) =>
    cy.intercept("GET", new RegExp(`${baseUrl}/external/aircraft-types${parameterRegex}`), {
        ...getResponseValuesArray(anyExternalAircraftType, 200, aircraftTypes),
    });
