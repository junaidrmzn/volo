import type { Vertiport } from "@voloiq-typescript-api/battery-management-types";
import { useGetAllService } from "@voloiq/service";
import { VERTIPORT_MANAGEMENT } from "./serviceEndpoints";

const route = `${VERTIPORT_MANAGEMENT}/vertiports`;

export const generateValidityFilterString = (
    validityStartDate: string | undefined,
    validityEndDate: string | undefined
) => {
    let filterString = "";
    if (validityStartDate && validityEndDate) {
        filterString += `validFrom LE '${validityStartDate}' AND (validTo GE '${validityEndDate}' OR validTo IS 'null')`;
    }
    return filterString;
};

export const useGetAllVertiportWithinValidity = (
    validFrom?: string,
    validTo?: string,
    pageNumber: number = 1,
    pageSize: number = 100
) =>
    useGetAllService<Vertiport>({
        params: {
            page: pageNumber,
            size: pageSize,
            filter: generateValidityFilterString(validFrom, validTo),
        },
        route,
    });
