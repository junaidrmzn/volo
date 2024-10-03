import { cloneDeep } from "lodash";
import { useCallback, useState } from "react";
import type { Parameter } from "@voloiq/flight-test-definition-api/v1";
import { useGetAllFtiParameters } from "@voloiq/flight-test-definition-api/v1";

type FtiParameterId = string;
type FtiParameterMap = Record<FtiParameterId, Parameter>;

export const useSearchFtiParameters = () => {
    const [allFtiParametersCache, setAllFtiParametersCache] = useState<FtiParameterMap>({});
    const { getAllFtiParameters } = useGetAllFtiParameters();

    const updateAllFtiParametersCache = useCallback((ftiParameters: Parameter[]) => {
        setAllFtiParametersCache((allFtiParametersCache) => {
            const nextAllFtiParametersCache = cloneDeep(allFtiParametersCache);
            for (const ftiParameter of ftiParameters) {
                nextAllFtiParametersCache[ftiParameter.id] = ftiParameter;
            }
            return nextAllFtiParametersCache;
        });
    }, []);

    const searchFtiParameters = useCallback(
        (filter: string) => {
            return getAllFtiParameters({ params: { filter, size: 100_000 } }).then((ftiParameters) => {
                if (ftiParameters) {
                    updateAllFtiParametersCache(ftiParameters);
                }
                return ftiParameters;
            });
        },
        [getAllFtiParameters, updateAllFtiParametersCache]
    );

    const getFtiParameter = useCallback(
        (ftiParameterId: string) => allFtiParametersCache[ftiParameterId],
        [allFtiParametersCache]
    );

    return { searchFtiParameters, getFtiParameter, updateAllFtiParametersCache };
};

export type SearchFtiParameters = ReturnType<typeof useSearchFtiParameters>["searchFtiParameters"];
export type GetFtiParameter = ReturnType<typeof useSearchFtiParameters>["getFtiParameter"];
