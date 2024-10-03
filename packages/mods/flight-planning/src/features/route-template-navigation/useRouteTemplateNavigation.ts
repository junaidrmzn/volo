import type { RouteTemplate } from "@voloiq-typescript-api/flight-planning-types";
import { useMemo, useState } from "react";
import type { FilterProps, FilterSet } from "@voloiq/filter-panel";
import type { SortingConfiguration, SortingOption } from "@voloiq/sorting-panel";
import { useFlightPlanningTranslation } from "../../translations";
import { getFlightPlanningApiParams } from "../../utils";
import type { RouteTemplateNavigationView, RouteTemplateSortParams } from "./types";
import { useGetRouteTemplatesAtoB } from "./useGetRouteTemplatesAtoB";
import { useGetRouteTemplatesBtoA } from "./useGetRouteTemplatesBtoA";

export const useRouteTemplateNavigation = (departureVertiportId: number, arrivalVertiportId: number) => {
    const { t: translate, i18n } = useFlightPlanningTranslation();
    const [filterSet, setFilterSet] = useState<FilterSet<RouteTemplate>>({
        filters: [],
    });
    const [displayedView, setDisplayedView] = useState<RouteTemplateNavigationView>("List");
    const [sortParams, setSortParams] = useState<RouteTemplateSortParams>({ orderBy: "createdAt", order: "DESC" });

    const sortingOptions: SortingOption[] = useMemo(
        () => [
            {
                label: translate("routeTemplates.properties.createdAt"),
                id: "createdAt",
            },
            {
                label: translate("routeTemplates.properties.name"),
                id: "name",
            },
            {
                label: translate("routeTemplates.properties.distance"),
                id: "distance",
            },
            {
                label: translate("routeTemplates.properties.validityDate"),
                id: "validityDate",
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [i18n.language]
    );

    const handleApplySort = (sortingConfiguration: SortingConfiguration) => {
        setSortParams({ orderBy: sortingConfiguration.selectedOption, order: sortingConfiguration.selectedOrder });
        setDisplayedView("List");
    };

    const handleResetSort = () => {
        setSortParams({ orderBy: "createdAt", order: "DESC" });
        setDisplayedView("List");
    };

    const filters: FilterProps<RouteTemplate>[] = useMemo(
        () => [
            {
                type: "text",
                propertyName: "name",
                displayName: translate("routeTemplates.properties.name"),
            },
            {
                type: "text",
                propertyName: "plannedBy",
                displayName: translate("routeTemplates.properties.plannedBy"),
            },
            {
                type: "numberRange",
                propertyName: "distance",
                fromLabel: translate("filterPanel.numberRangeFilter.fromLabel"),
                toLabel: translate("filterPanel.numberRangeFilter.toLabel"),
                displayName: translate("routeTemplates.properties.distance"),
                min: "0",
            },
            {
                type: "range",
                propertyName: "createdAt",
                fromLabel: translate("filterPanel.dateRangeFilter.fromLabel"),
                toLabel: translate("filterPanel.dateRangeFilter.toLabel"),
                displayName: translate("routeTemplates.properties.createdAt"),
                useUtcTime: true,
                mode: "date",
            },
            {
                type: "range",
                propertyName: "validityDate",
                fromLabel: translate("filterPanel.dateRangeFilter.fromLabel"),
                toLabel: translate("filterPanel.dateRangeFilter.toLabel"),
                displayName: translate("routeTemplates.properties.validityDate"),
                useUtcTime: true,
                mode: "date",
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [i18n.language]
    );

    const handleResetFilter = () => {
        setFilterSet({ filters: [] });
        setDisplayedView("List");
    };

    const handleApplyFilter = (filterSet: FilterSet<RouteTemplate>) => {
        setFilterSet(filterSet);
        setDisplayedView("List");
    };

    const handleChangeView = (view: RouteTemplateNavigationView) => {
        setDisplayedView(view);
    };

    const { filterParams } = getFlightPlanningApiParams(filterSet);
    const routeTemplatesAtoB = useGetRouteTemplatesAtoB(
        sortParams,
        filterParams,
        departureVertiportId,
        arrivalVertiportId
    );
    const routeTemplatesBtoA = useGetRouteTemplatesBtoA(
        sortParams,
        filterParams,
        departureVertiportId,
        arrivalVertiportId
    );

    return {
        routeTemplatesAtoB,
        routeTemplatesBtoA,
        filter: {
            onApply: handleApplyFilter,
            onReset: handleResetFilter,
            params: filterSet,
            filters,
        },
        sort: {
            onApply: handleApplySort,
            onReset: handleResetSort,
            params: sortParams,
            options: sortingOptions,
        },
        view: {
            onChange: handleChangeView,
            current: displayedView,
        },
    };
};
