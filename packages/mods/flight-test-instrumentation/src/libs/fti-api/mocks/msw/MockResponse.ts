import type { PathParams } from "msw";
import type { Error, ResponseEnvelope, SizeBasedPagination } from "@voloiq/service";
import { isError } from "@voloiq/service";

export type MockResponse<Entity> = Partial<Entity> | Error;
export type MockResponseArray<Entity> = Partial<Entity>[] | Error;

export const getResponseValues = <T>(
    anyEntityFactory: (overwrites?: Partial<T>) => T,
    successCode: number,
    entity?: MockResponse<T>
) => {
    let returnStatus = successCode;
    let returnValue: ResponseEnvelope<T>;

    if (!entity) {
        return { returnStatus, returnValue: { data: anyEntityFactory() } };
    }

    if (isError(entity)) {
        returnStatus = entity.code;
        returnValue = { error: entity };
    } else {
        returnValue = { data: anyEntityFactory(entity) };
    }

    return { returnStatus, returnValue };
};

export const getResponseValuesArray = <T>(
    anyEntityFactory: (overwrites?: Partial<T>) => T,
    successCode: number,
    entity?: MockResponseArray<T>
) => {
    let returnStatus = successCode;
    let returnValue: ResponseEnvelope<T[]>;
    const paginationObject: SizeBasedPagination = {
        totalElements: 0,
        page: 1,
        totalPages: 1,
        size: 0,
    };

    if (!entity) {
        paginationObject.totalElements = 2;
        return {
            returnStatus,
            returnValue: { data: [anyEntityFactory(), anyEntityFactory()], pagination: paginationObject },
        };
    }

    if (isError(entity)) {
        returnStatus = entity.code;
        returnValue = { error: entity };
    } else {
        paginationObject.totalElements = entity.length;
        paginationObject.totalPages = Math.ceil(entity.length / 10);
        returnValue = { data: entity.map((element) => anyEntityFactory(element)), pagination: paginationObject };
    }

    return { returnStatus, returnValue };
};

export const checkParamsMatches = (presentParams: URLSearchParams, expectedParams?: PathParams) => {
    // eslint-disable-next-line unicorn/prefer-set-has
    const presentParamKeys = [...presentParams.keys()];

    if ([...presentParams].length !== Object.keys(expectedParams || {}).length) {
        return false;
    }

    for (const expectedParamsKey in expectedParams) {
        if (
            !presentParams ||
            !(
                presentParamKeys.includes(expectedParamsKey) &&
                presentParams.get(expectedParamsKey) === expectedParams[expectedParamsKey]
            )
        ) {
            return false;
        }
    }
    return true;
};
