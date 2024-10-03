import { Box, Button, HStack, Heading, Icon, IconButton, Table, Tbody, VStack } from "@volocopter/design-library-react";
import type { FilterSet } from "@voloiq/filter-panel";
import { FilterTags } from "@voloiq/filter-panel";
import type { RouteOption } from "@voloiq/flight-planning-api/v1";
import { RouteTemplate } from "@voloiq/flight-planning-api/v1";
import { useFlightPlanningTranslation } from "../../translations";
import { RouteTemplateListItem } from "./RouteTemplateListItem";
import type { RouteTemplateNavigationView } from "./types";

type RouteTemplateListProps = {
    routeTemplatesAtoB?: RouteTemplate[];
    routeTemplatesBtoA?: RouteTemplate[];
    onChangeView: (view: RouteTemplateNavigationView) => void;
    onSelectRouteTemplatePreview: (routeTemplate: RouteTemplate | undefined) => void;
    handleClose: () => void;
    filterSet: FilterSet<RouteTemplate>;
    handleSetFilter: (filters: FilterSet<RouteTemplate>) => void;
    previewedTemplate?: RouteTemplate;
    routeOption: RouteOption;
};
export const RouteTemplateList = (props: RouteTemplateListProps) => {
    const {
        routeTemplatesAtoB,
        routeTemplatesBtoA,
        onChangeView,
        onSelectRouteTemplatePreview,
        handleClose,
        filterSet,
        handleSetFilter,
        previewedTemplate,
        routeOption,
    } = props;
    const { t: translate } = useFlightPlanningTranslation();
    return (
        <VStack align="start" height="100%" width="100%">
            <Box p={3} flexDirection="column" width="100%">
                <HStack justifyContent="space-between" width="100%">
                    <IconButton
                        variant="ghost"
                        aria-label="close"
                        onClick={handleClose}
                        data-testid="route-templates-close-button"
                    >
                        <Icon icon="close" color="darkBlue.300" />
                    </IconButton>
                    <Heading size="md" fontWeight="bold">
                        {translate("routeTemplates.routeTemplateList.heading")}
                    </Heading>
                    <Box height="36px" width="40px" />
                </HStack>
                <HStack justifyContent="space-between" mt={3}>
                    <Button
                        width="48%"
                        data-testid="route-templates-sort-button"
                        onClick={() => {
                            onChangeView("Sort");
                        }}
                    >
                        {translate("common.sort")}
                    </Button>
                    <Button
                        width="48%"
                        data-testid="route-templates-filter-button"
                        onClick={() => {
                            onChangeView("Filter");
                        }}
                    >
                        {translate("common.filter")}
                    </Button>
                </HStack>
                {filterSet.filters && filterSet.filters.length > 0 && (
                    <FilterTags
                        filterSet={filterSet}
                        onFilterDelete={(filterSet) => handleSetFilter(filterSet)}
                        allowDelete
                        listAriaLabel={translate("filterPanel.filterTagListAriaLabel")}
                        mt={3}
                    />
                )}
            </Box>
            <Box overflowY="auto" flexGrow={1} width="100%">
                <Table variant="striped" size="xs">
                    <Tbody>
                        {routeTemplatesAtoB?.map((routeTemplate) => (
                            <RouteTemplateListItem
                                key={routeTemplate.id}
                                onSelectRouteTemplatePreview={onSelectRouteTemplatePreview}
                                routeTemplate={routeTemplate}
                                isSelected={routeTemplate.id === previewedTemplate?.id}
                                routeOption={routeOption}
                            />
                        ))}
                        {routeTemplatesBtoA?.map((routeTemplate) => (
                            <RouteTemplateListItem
                                key={routeTemplate.id}
                                onSelectRouteTemplatePreview={onSelectRouteTemplatePreview}
                                routeTemplate={routeTemplate}
                                isSelected={routeTemplate.id === previewedTemplate?.id}
                                inversed
                                routeOption={routeOption}
                            />
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </VStack>
    );
};
