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
    entity?: Partial<T>[],
    totalEntries?: number
) => {
    const paginationObject: SizeBasedPagination = {
        totalElements: totalEntries || 0,
        page: 1,
        totalPages: 1,
        size: 0,
    };

    if (!entity) {
        paginationObject.totalElements = 2;
        return {
            statusCode,
            body: { data: [anyEntityFactory()], pagination: paginationObject },
        };
    }

    paginationObject.totalElements = totalEntries || entity?.length;
    paginationObject.totalPages = Math.ceil((totalEntries || entity?.length) / 10);

    const body: ResponseEnvelope<T[]> = {
        data: entity.map((element) => anyEntityFactory(element)),
        pagination: paginationObject,
    };

    return { statusCode, body };
};
