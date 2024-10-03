import { Button, Flex, Spinner, Text, VStack } from "@volocopter/design-library-react";
import type { WindchillRequirement } from "@voloiq/flight-test-definition-api/v1";
import { SearchInputField } from "@voloiq/flight-test-definition-components";
import { WindchillSelectableRequirementListItem } from "./WindchillSelectableRequirementListItem";
import { useWindchillRequirementsModalTranslation } from "./translations/useWindchillRequirementsModalTranslation";
import { useGetWindchillSearchedRequirements } from "./useGetWindchillSearchedRequirements";

type SearchResultWindchillRequirementsListProps = {
    handleCheckboxOnChange: (checked: boolean, requirement: WindchillRequirement) => void;
    selectedIds: string[];
};

export const SearchResultWindchillRequirementsList = (props: SearchResultWindchillRequirementsListProps) => {
    const { handleCheckboxOnChange, selectedIds } = props;

    const { t } = useWindchillRequirementsModalTranslation();
    const { searchResultRequirements, searchResultRequirementsTotal, isSearchLoading, showMoreItems, submitSearch } =
        useGetWindchillSearchedRequirements();

    return (
        <VStack flex={1} spacing={6}>
            <Flex justify="flex-start" w="full">
                <Text fontWeight="bold" fontSize="sm">
                    {`${t("All")} ${
                        !isSearchLoading ? `(${searchResultRequirements.length}/${searchResultRequirementsTotal})` : ""
                    }`}
                </Text>
            </Flex>
            <SearchInputField onChange={submitSearch} />
            <VStack w="full" pr={2} aria-label={t("Windchill Requirement Container")}>
                {searchResultRequirements.map((requirement) => (
                    <WindchillSelectableRequirementListItem
                        key={requirement.id}
                        requirement={requirement}
                        onCheckboxChange={handleCheckboxOnChange}
                        isChecked={selectedIds.includes(requirement.id)}
                        isSearchResult
                    />
                ))}
                {isSearchLoading && <Spinner size="sm" ml={3} />}

                {searchResultRequirements.length < searchResultRequirementsTotal && (
                    <Button onClick={showMoreItems} variant="ghost" width="full">
                        {t("Show more")}
                    </Button>
                )}
            </VStack>
        </VStack>
    );
};
