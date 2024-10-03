import { useCallback } from "react";
import { match } from "ts-pattern";
import type { FilterSet } from "@voloiq/filter-panel";
import { SelectOption } from "@voloiq/form";
import type { BulkEditData, BulkEditResourceOptions, FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useBulkEditVertiportService } from "@voloiq/vertiport-management-api/v1";
import {
    useDeleteVertiport,
    useGetAllVertiportsManual,
    useGetVertiportOverview,
} from "../api-hooks/useVertiportService";

const extractRegionAndServicesWithFilter = (filterString?: FilterSet<Event>) => {
    const serviceFilter = filterString?.filters.find((filter) => filter.propertyName === "services");
    const regionFilter = filterString?.filters.find((filter) => filter.propertyName === "region");

    return {
        ...(serviceFilter && {
            services:
                serviceFilter.type === "multiSelect"
                    ? serviceFilter.values.map((option) => option.value).join(",")
                    : undefined,
        }),
        ...(regionFilter && { regionId: regionFilter.type === "select" ? regionFilter.value.value : undefined }),
    };
};

const deleteRegionAndServicesFilter = (filterString?: FilterSet<Event>): FilterSet<Event> | undefined => {
    const filter = JSON.parse(JSON.stringify(filterString));
    if (filter) {
        for (const [index, item] of filter?.filters.entries()) {
            if (item.propertyName === "services") filter?.filters.splice(index, 1);
        }
        for (const [index, item] of filter?.filters.entries()) {
            if (item.propertyName === "region") filter?.filters.splice(index, 1);
        }
    }
    return filter;
};

const parseBulkEditFields = (data: BulkEditData) => {
    return match(data)
        .with({ fieldType: "region" }, () => ({ fieldType: "region.id", newValue: data.newValue }))
        .with({ fieldType: "country" }, () => ({ fieldType: "address.country", newValue: data.newValue }))
        .with({ fieldType: "services" }, () => {
            const defaultValue = { fieldType: data.fieldType, newValue: [] };

            if (!data.newValue) return defaultValue;

            const fieldNewValue = (data.newValue as SelectOption[]).map((item) => ({
                serviceKey: item.value,
                available: true,
            }));

            return { ...defaultValue, newValue: fieldNewValue };
        })
        .otherwise(() => data);
};

export const useVertiportOverviewPage = () => {
    const { sendRequestWithResponseEnvelope } = useGetAllVertiportsManual();
    const { refetchDataWithResponseEnvelope } = useGetVertiportOverview();
    const { sendVertiportBulkEditRequest } = useBulkEditVertiportService();
    const { sendRequestById } = useDeleteVertiport();

    const fetchAllVertiports = useCallback(
        (options: FetchAllResourceOptions<Vertiport>) => {
            const { page, size, filterSet, sortingConfiguration } = options;
            const vertiportFilter = deleteRegionAndServicesFilter(filterSet);
            return sendRequestWithResponseEnvelope({
                params: {
                    size,
                    page,
                    ...extractRegionAndServicesWithFilter(filterSet),
                    ...(vertiportFilter && vertiportFilter.filters.length > 0
                        ? { filter: serializeFilters(vertiportFilter, { useIlikeOperator: true }) }
                        : undefined),
                    orderBy: sortingConfiguration
                        ? `${sortingConfiguration.selectedOption}:${sortingConfiguration.selectedOrder.toUpperCase()}`
                        : undefined,
                },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    const fetchVertiport = useCallback(
        (resourceId: string) =>
            refetchDataWithResponseEnvelope({ url: `/vertiport-management/v1/vertiports/${resourceId}` }),
        [refetchDataWithResponseEnvelope]
    );

    const deleteVertiport = useCallback(
        (resourceId: string) => {
            return new Promise<void>((resolve, reject) => {
                sendRequestById(resourceId)
                    .then(() => resolve())
                    .catch(reject);
            });
        },
        [sendRequestById]
    );

    const bulkEditVertiport = useCallback(
        (options: BulkEditResourceOptions<Vertiport>) => {
            const { filterSet, data } = options;

            return sendVertiportBulkEditRequest({
                params: {
                    ...(filterSet && filterSet.filters.length > 0
                        ? { filter: serializeFilters(filterSet, { useIlikeOperator: true }) }
                        : undefined),
                },
                data: parseBulkEditFields(data),
            });
        },
        [sendVertiportBulkEditRequest]
    );

    return {
        fetchAllVertiports,
        fetchVertiport,
        deleteVertiport,
        bulkEditVertiport,
    };
};
