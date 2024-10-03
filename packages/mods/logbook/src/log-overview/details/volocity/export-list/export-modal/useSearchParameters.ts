import type { Parameter } from "@voloiq-typescript-api/fti-types";
import { serializeFilters } from "@voloiq/service";
import { useGetParameters } from "../../../../../libs/logbook/useParameter";

let abortController = new AbortController();

export const useSearchParameters = () => {
    const { getParameters, pagination } = useGetParameters();

    const searchParameters = (searchString: string, date: string) => {
        abortController.abort();
        abortController = new AbortController();
        return getParameters({
            signal: abortController.signal,
            params: {
                status: "RELEASED",
                queryDate: date,
                size: 100,
                filter: serializeFilters<Parameter>(
                    {
                        filters: [
                            {
                                value: searchString,
                                type: "text",
                                propertyName: "ftiCode",
                                displayName: "FTI Code",
                                isActive: true,
                            },
                            {
                                value: searchString,
                                type: "text",
                                propertyName: "shortDescription",
                                displayName: "Short Description",
                                isActive: true,
                            },
                        ],
                    },
                    { useIlikeOperator: false, joinCondition: "OR" }
                ),
            },
        }).catch((error) => {
            if (error.message === "canceled") {
                return [];
            }
            throw error;
        });
    };

    return { searchParameters, pagination };
};
