import type { Parameter, ParameterInsert, ParameterPatch } from "@voloiq-typescript-api/fti-types";
import type { ResponseEnvelope } from "@voloiq/service";

export const createParameter = (parameter: ParameterInsert) => {
    return cy.request<ResponseEnvelope<Parameter>>("POST", "/ftd/v1/test-point-parameters", parameter);
};

export const updateParameter = (parameterId: string, parameter: ParameterPatch) => {
    return cy.request<ResponseEnvelope<Parameter>>("PATCH", `/ftd/v1/test-point-parameters/${parameterId}`, parameter);
};
