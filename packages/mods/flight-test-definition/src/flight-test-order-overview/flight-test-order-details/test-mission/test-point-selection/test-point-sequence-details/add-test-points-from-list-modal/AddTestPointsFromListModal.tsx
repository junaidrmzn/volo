import {
    Button,
    HStack,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@volocopter/design-library-react";
import { ResourceListWrapper } from "@voloiq/flight-test-definition-components";
import { SynchronizedScrollProvider } from "@voloiq/flight-test-definition-utils";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { TestPointListItem } from "./test-points-search-tab-content/TestPointListItem";
import { TestPointsSearchTabContent } from "./test-points-search-tab-content/TestPointsSearchTabContent";
import { useAddTestPointsFromListModalTranslation } from "./translations/useAddTestPointsFromListModalTranslation";
import { useFlightTestDefinitionSearch } from "./useFlightTestDefinitionSearch";
import { useProcedureSearchResults } from "./useProcedureSearchResults";
import { useSelectedFlightTestDefinition } from "./useSelectedFlightTestDefinition";
import { useSelectedTestPoints } from "./useSelectedTestPoints";

export type AddTestPointsFromListModalProps = {
    flightTestOrderId: string;
    testPointSequenceId: string;
    isOpen: boolean;
    onClose: () => void;
};

export const AddTestPointsFromListModal = (props: AddTestPointsFromListModalProps) => {
    const { flightTestOrderId, testPointSequenceId, isOpen, onClose } = props;

    const { t } = useAddTestPointsFromListModalTranslation();
    const { searchResults, submitSearch } = useFlightTestDefinitionSearch();
    const { selectedDefinition, onSelectDefinition } = useSelectedFlightTestDefinition();
    const { selectedTestPoints, selectedTestPointIds, onSelectTestPoint, isSubmitLoading, onSubmitSelectedTestPoints } =
        useSelectedTestPoints({
            flightTestOrderId,
            testPointSequenceId,
        });
    const { procedures } = useProcedureSearchResults({ definitionId: selectedDefinition?.id });

    const handleOnSubmit = async () => {
        await onSubmitSelectedTestPoints();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalType={t("Add")} modalTitle={t("Test Points")} />
                </ModalHeader>
                <ModalBody>
                    <Tabs size="sm" variant="default" isLazy>
                        <TabList mb={3}>
                            <Tab>{t("Test Points")}</Tab>
                            <Tab>{`${t("Selected")} (${selectedTestPoints.length})`}</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <TestPointsSearchTabContent
                                    definitions={searchResults}
                                    procedures={procedures}
                                    selectedDefinition={selectedDefinition}
                                    onSelectDefinition={onSelectDefinition}
                                    selectedTestPointIds={selectedTestPointIds}
                                    onSelectTestPoint={onSelectTestPoint}
                                    onSearchDefinitions={submitSearch}
                                />
                            </TabPanel>
                            <TabPanel>
                                <SynchronizedScrollProvider>
                                    <ResourceListWrapper
                                        list={selectedTestPoints}
                                        emptyMessage={t("No test points found")}
                                        renderItem={(testPoint) => (
                                            <TestPointListItem
                                                key={testPoint.id}
                                                testPoint={testPoint}
                                                onSelectTestPoint={onSelectTestPoint}
                                                defaultChecked={selectedTestPointIds.includes(testPoint.id)}
                                            />
                                        )}
                                    />
                                </SynchronizedScrollProvider>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>
                <ModalFooter>
                    <HStack justify="flex-end">
                        <Button
                            leftIcon={<Icon icon="check" />}
                            variant="primary"
                            size="lg"
                            isDisabled={isSubmitLoading}
                            onClick={handleOnSubmit}
                        >
                            {t("Done")}
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
