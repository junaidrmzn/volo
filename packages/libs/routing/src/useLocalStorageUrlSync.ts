import { deepEqual } from "fast-equals";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "react-use";

const getSearchParamRecord = (searchParams: URLSearchParams) => {
    const paramRecord: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) paramRecord[key] = value;
    return paramRecord;
};

export const useLocalStorageUrlSync = (localStorageKey: string) => {
    const [localStorageParameters, setLocalStorageParameters] = useLocalStorage<Record<string, string>>(
        localStorageKey,
        {}
    );
    const [searchParameters, setSearchParameters] = useSearchParams();

    const getParameters = useCallback(
        (parameters: Record<string, string>) => {
            const areThereSearchParameters = [...searchParameters].length > 0;
            const areThereLocalStorageParameters = localStorageParameters !== undefined;
            const searchParametersMap = getSearchParamRecord(searchParameters);

            if (areThereSearchParameters && !deepEqual(searchParametersMap, parameters)) {
                return searchParametersMap;
            }
            if (areThereLocalStorageParameters && !deepEqual(localStorageParameters, parameters)) {
                return localStorageParameters;
            }
            return undefined;
        },
        [localStorageParameters, searchParameters]
    );
    const initialParametersRef = useRef(getParameters({}));
    const [parameters, _setParameters] = useState<Record<string, string>>(() => initialParametersRef.current ?? {});
    const setParameters = useCallback(
        (
            newParametersGetter: Record<string, string> | ((previous: Record<string, string>) => Record<string, string>)
        ) => {
            const newParameters =
                typeof newParametersGetter === "function" ? newParametersGetter(parameters) : newParametersGetter;
            for (const setter of [setLocalStorageParameters, setSearchParameters, _setParameters]) {
                setter(newParameters);
            }
        },
        [setLocalStorageParameters, setSearchParameters, _setParameters, parameters]
    );

    const isFirstRenderRef = useRef(true);

    useLayoutEffect(() => {
        if (isFirstRenderRef.current) {
            setParameters(initialParametersRef.current ?? {});
            isFirstRenderRef.current = false;
        } else {
            const newParameters = getParameters(parameters);
            if (newParameters) {
                setParameters(newParameters);
            }
        }
    }, [getParameters, parameters, setParameters]);

    return { parameters, setParameters };
};
