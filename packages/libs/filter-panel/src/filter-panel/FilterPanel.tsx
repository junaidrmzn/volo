import { Box, Button, Flex, Header } from "@volocopter/design-library-react";
import { FormProvider } from "react-hook-form";
import { FilterTags } from "../filter-tags";
import type { FilterProps, FilterSet } from "./FilterPanelTypes";
import { Filters } from "./Filters";
import { useFilterPanel } from "./useFilterPanel";

export type FilterPanelProps<EntityType> = {
    filters: FilterProps<EntityType>[];
    onChange: (filterSet: FilterSet<EntityType>) => void;
    activeFilterSet: FilterSet<EntityType>;
    applyButtonLabel: string;
    backButtonAriaLabel: string;
    filterTagListAriaLabel: string;
    cancelButtonLabel: string;
    title: string;
    onCancel: () => void;
    onClose: () => void;
};

export const FilterPanel = <EntityType extends {}>(props: FilterPanelProps<EntityType>) => {
    const {
        applyButtonLabel,
        backButtonAriaLabel,
        cancelButtonLabel,
        onChange,
        filters,
        title,
        onClose,
        onCancel,
        activeFilterSet,
        filterTagListAriaLabel,
    } = props;

    const { currentFilterSet, handleDeleteFilter, handleFormSubmit, handleSubmit, formData, handleOnCancel } =
        useFilterPanel<EntityType>({
            activeFilterSet,
            onChange,
            filters,
            onCancel,
        });

    return (
        <FormProvider {...formData}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Flex flexDirection="column" height="100vh">
                    <Box px={4} pt={8}>
                        <Header>
                            <Header.Title
                                hasReturnMarker
                                returnMarkerAriaLabel={backButtonAriaLabel}
                                title={title}
                                onClick={onClose}
                            />
                            <Header.Controls>
                                <Button onClick={handleOnCancel}>{cancelButtonLabel}</Button>
                                <Button type="submit" variant="primary">
                                    {applyButtonLabel}
                                </Button>
                            </Header.Controls>
                        </Header>

                        {currentFilterSet && (
                            <FilterTags
                                allowDelete
                                filterSet={currentFilterSet}
                                onFilterDelete={handleDeleteFilter}
                                listAriaLabel={filterTagListAriaLabel}
                                pt={4}
                            />
                        )}
                    </Box>
                    <Box px={4} pb={5} flexGrow={1} overflow="auto">
                        <Filters filters={filters} />
                    </Box>
                </Flex>
            </form>
        </FormProvider>
    );
};
