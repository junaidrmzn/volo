import { Box, Button, HStack, Icon, VStack } from "@volocopter/design-library-react";
import type { TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { SelectedTestHazardAssessments } from "./SelectedTestHazardAssessments";
import { TestHazardAssessmentsSearchResults } from "./TestHazardAssessmentsSearchResults";
import { useSafetyReviewBoardSectionModalTranslation } from "./translations/useSafetyReviewBoardSectionModalTranslation";
import { useSelectTestHazardAssessments } from "./useSelectTestHazardAssessments";

type SafetyReviewBoardModalContentProps = {
    testHazardAssessments: TestHazardAssessment[];
    onClose: () => void;
};

export const SafetyReviewBoardModalContent = (props: SafetyReviewBoardModalContentProps) => {
    const { onClose, testHazardAssessments } = props;
    const { t } = useSafetyReviewBoardSectionModalTranslation();
    const {
        getIsItemSelected,
        onToggleItem,
        selectedItems,
        groupedSelectedItems,
        onSubmitSelectedItems,
        isSubmitLoading,
    } = useSelectTestHazardAssessments({
        initialItems: testHazardAssessments,
    });

    const handleOnSubmit = async () => {
        await onSubmitSelectedItems();
        onClose();
    };

    return (
        <VStack w="full" h="full" align="flex-end" spacing={3}>
            <HStack alignItems="flex-start" justifyContent="space-between" w="full" spacing={3}>
                <Box flex={1}>
                    <TestHazardAssessmentsSearchResults
                        handleOnToggle={onToggleItem}
                        getIsItemSelected={getIsItemSelected}
                    />
                </Box>

                <Box borderRightWidth={1} borderColor="decorative1Basic" my={1} minH="60vh" />

                <Box flex={1}>
                    <SelectedTestHazardAssessments
                        selectedItems={selectedItems}
                        groupedSelectedItems={groupedSelectedItems}
                        handleOnToggle={onToggleItem}
                    />
                </Box>
            </HStack>

            <Button
                type="button"
                leftIcon={<Icon icon="check" size={4} />}
                size="lg"
                variant="primary"
                onClick={handleOnSubmit}
                isLoading={isSubmitLoading}
            >
                {t("Done")}
            </Button>
        </VStack>
    );
};
