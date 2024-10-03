import { Box, Flex, Spinner, Text, VStack } from "@volocopter/design-library-react";
import type { TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { SearchInputField } from "@voloiq/flight-test-definition-components";
import { SelectableHazardGroupCard } from "./SelectableHazardGroupCard";
import { useSafetyReviewBoardSectionModalTranslation } from "./translations/useSafetyReviewBoardSectionModalTranslation";
import { useTestHazardAssessmentSearch } from "./useTestHazardAssessmentSearch";

type TestHazardAssessmentsSearchResultsProps = {
    handleOnToggle: (isChecked: boolean, testHazardAssessment: TestHazardAssessment) => void;
    getIsItemSelected: (id: string) => boolean;
};

export const TestHazardAssessmentsSearchResults = (props: TestHazardAssessmentsSearchResultsProps) => {
    const { handleOnToggle, getIsItemSelected } = props;

    const { t } = useSafetyReviewBoardSectionModalTranslation();
    const { searchResultItems, groupedSearchResultItems, isSearchLoading, submitSearch } =
        useTestHazardAssessmentSearch();

    return (
        <VStack w="full" h="full" spacing={6}>
            <Flex justify="flex-start" w="full">
                <Text fontWeight="bold" fontSize="xs">
                    {`${t("All")} ${!isSearchLoading ? `(${searchResultItems.length})` : ""}`}
                </Text>
                {isSearchLoading && <Spinner size="xs" ml={3} />}
            </Flex>

            <SearchInputField onChange={submitSearch} />

            <VStack
                w="full"
                pr={2}
                spacing={4}
                overflowY="scroll"
                maxH="47vh"
                role="list"
                aria-label={t("Test Hazard Assessments Search Results")}
            >
                {groupedSearchResultItems.map((group) => (
                    <Box key={group.id} w="full">
                        <SelectableHazardGroupCard
                            hazardGroup={t(`HazardGroupEnum.${group.id}`)}
                            getIsItemSelected={getIsItemSelected}
                            onToggleItem={handleOnToggle}
                            testHazardAssessments={group.testHazardAssessments}
                        />
                    </Box>
                ))}
            </VStack>
        </VStack>
    );
};
