import { FilterPanel } from "@voloiq/filter-panel";
import type { RouteOption } from "@voloiq/flight-planning-api/v1";
import { useOutletContext } from "@voloiq/routing";
import { SortingPanel } from "@voloiq/sorting-panel";
import { useFlightPlanningTranslation } from "../../translations";
import { RouteTemplateList } from "./RouteTemplateList";
import type { RouteTemplateNavigationSidebarContext } from "./types";
import { useRouteTemplateNavigation } from "./useRouteTemplateNavigation";

type RouteTemplateNavigationContentProps = {
    routeOption: RouteOption;
};

export const RouteTemplateNavigationContent = (props: RouteTemplateNavigationContentProps) => {
    const { routeOption } = props;
    const { onSelectRouteTemplatePreview, previewedTemplate, closeRightSidebar } =
        useOutletContext<RouteTemplateNavigationSidebarContext>();
    const { t: translate } = useFlightPlanningTranslation();

    const { routeTemplatesAtoB, routeTemplatesBtoA, filter, sort, view } = useRouteTemplateNavigation(
        routeOption.departureExternalVertiport?.id,
        routeOption.arrivalExternalVertiport?.id
    );

    const handleClose = () => {
        closeRightSidebar();
        onSelectRouteTemplatePreview(undefined);
    };

    if (view.current === "Filter") {
        return (
            <FilterPanel
                title={translate("filterPanel.title")}
                applyButtonLabel={translate("filterPanel.applyButtonLabel")}
                backButtonAriaLabel={translate("filterPanel.backButtonAriaLabel")}
                cancelButtonLabel={translate("filterPanel.cancelButtonLabel")}
                filterTagListAriaLabel={translate("filterPanel.filterTagListAriaLabel")}
                filters={filter.filters}
                activeFilterSet={filter.params}
                onCancel={sort.onReset}
                onClose={() => view.onChange("List")}
                onChange={filter.onApply}
            />
        );
    }
    if (view.current === "Sort") {
        return (
            <SortingPanel
                title={translate("sortingPanel.title")}
                applyButtonLabel={translate("sortingPanel.applyButtonLabel")}
                ascendingLabel={translate("sortingPanel.ascendingLabel")}
                descendingLabel={translate("sortingPanel.descendingLabel")}
                backButtonAriaLabel={translate("sortingPanel.backButtonAriaLabel")}
                cancelButtonLabel={translate("sortingPanel.cancelButtonLabel")}
                defaultOption={sort.params.orderBy!}
                defaultOrder={sort.params.order}
                options={sort.options}
                onCancel={sort.onReset}
                onClose={() => view.onChange("List")}
                onChange={sort.onApply}
            />
        );
    }
    return (
        <RouteTemplateList
            routeTemplatesAtoB={routeTemplatesAtoB}
            routeTemplatesBtoA={routeTemplatesBtoA}
            onChangeView={view.onChange}
            onSelectRouteTemplatePreview={onSelectRouteTemplatePreview}
            handleClose={handleClose}
            filterSet={filter.params}
            handleSetFilter={filter.onApply}
            previewedTemplate={previewedTemplate}
            routeOption={routeOption}
        />
    );
};
