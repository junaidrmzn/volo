import { Box, Button, Header, VStack } from "@volocopter/design-library-react";
import { FormProvider } from "react-hook-form";
import { FilterTags, Filters } from "@voloiq/filter-panel";
import { useGlobalState } from "../global-state/useGlobalState";
import type { BaseResource } from "../state-machine/BaseResource";
import { useResourceFilterTranslations } from "./translations/useResourceFilterTranslations";
import { useFiltersPanel } from "./useFiltersPanel";

export const FiltersPanel = <Resource extends BaseResource>() => {
    const { t } = useResourceFilterTranslations();
    const [, send] = useGlobalState();
    const { filters, filterSet, deleteFilter, applyFilters, formData } = useFiltersPanel<Resource>();

    return (
        <VStack
            align="stretch"
            paddingX="9"
            paddingY="6"
            spacing="10"
            height="full"
            overflowY="auto"
            data-testid="filter-sidePanel"
        >
            <Header>
                <Header.Title
                    title={t("Filter")}
                    hasReturnMarker
                    returnMarkerAriaLabel={t("Close filter panel")}
                    onClick={() => send("CLOSE")}
                />
                <Header.Controls>
                    <Button onClick={() => send("CLOSE")}>{t("Back")}</Button>
                    <Button onClick={applyFilters}>{t("Apply")}</Button>
                </Header.Controls>
            </Header>
            <Box flex={1}>
                {filterSet.filters.length === 0 ? null : (
                    <FilterTags
                        allowDelete
                        listAriaLabel="Filter Tag List"
                        filterSet={filterSet}
                        onFilterDelete={deleteFilter}
                    />
                )}
                <FormProvider {...formData}>
                    <form>
                        <Filters filters={filters} />
                    </form>
                </FormProvider>
            </Box>
        </VStack>
    );
};
