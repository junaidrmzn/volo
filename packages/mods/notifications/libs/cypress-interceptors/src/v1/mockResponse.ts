import type { GenericStaticResponse } from "cypress/types/net-stubbing";
import type { ResponseEnvelope, SizeBasedPagination } from "@voloiq/service";

export type MockResponse<Entity> = Partial<Entity>;
export type MockResponseArray<Entity> = Partial<Entity>[];
export type CypressParameter = Record<string, string | number>;

export type InterceptorOptions<Entity> = Pick<
    GenericStaticResponse<string, Entity>,
    "delay" | "throttleKbps" | "forceNetworkError"
>;

export const getResponseValues = <T>(
    anyEntityFactory: (overwrites?: Partial<T>) => T,
    statusCode: number,
    entity?: Partial<T>
) => {
    if (!entity) {
        return { statusCode, body: { data: anyEntityFactory() } };
    }
    const body: ResponseEnvelope<T> = { data: anyEntityFactory(entity) };
    return { statusCode, body };
};

export const getResponseValuesArray = <T>(
    anyEntityFactory: (overwrites?: Partial<T>) => T,
    statusCode: number,
    entities?: T[]
) => {
    const paginationObject: SizeBasedPagination = {
        totalElements: 0,
        page: 1,
        totalPages: 1,
        size: 0,
    };

    if (!entities) {
        paginationObject.totalElements = 2;
        return {
            statusCode,
            body: { data: [anyEntityFactory()], pagination: paginationObject },
        };
    }

    paginationObject.totalElements = entities.length;
    paginationObject.totalPages = Math.ceil(entities.length / 10);

    const body: ResponseEnvelope<T[]> = {
        data: entities,
        pagination: paginationObject,
    };

    return { statusCode, body };
};
