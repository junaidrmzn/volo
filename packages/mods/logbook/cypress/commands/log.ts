import type { Log, LogInsert } from "@voloiq-typescript-api/logbook-types";
import type { ResponseEnvelope } from "@voloiq/service";

export const createLog = (logInsert: LogInsert) => {
    return cy.request<ResponseEnvelope<Log>>("POST", "/logbook/v6/logs", logInsert);
};
