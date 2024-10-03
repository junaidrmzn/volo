import {
    Button,
    Flex,
    HStack,
    Header,
    HeaderLayout,
    Icon,
    Spinner,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
    useDisclosure,
} from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import {
    TestPointSequence,
    useGetAllTestPointSequenceTestPointAssociationsQuery,
} from "@voloiq/flight-test-definition-api/v1";
import { SynchronizedScrollProvider } from "@voloiq/flight-test-definition-utils";
import { AddBlankRowButton } from "./AddBlankRowButton";
import { AddTestPointsFromListModal } from "./add-test-points-from-list-modal/AddTestPointsFromListModal";
import { AdditionalNotesTabContent } from "./additional-notes-tab-content/AdditionalNotesTabContent";
import { useSubmitAdditionalNotes } from "./additional-notes-tab-content/useSubmitAdditionalNotes";
import { EmptyTestPointsTabContent } from "./test-points-tab-content/EmptyTestPointsTabContent";
import { TestPointsTabContent } from "./test-points-tab-content/TestPointsTabContent";
import { TestPointsTabContentHeader } from "./test-points-tab-content/TestPointsTabContentHeader";
import { useTestPointSequenceDetailsTranslation } from "./translations/useTestPointSequenceDetailsTranslation";
import { useFilteredTestPointParameters } from "./useFilteredTestPointParameters";
import { useFormActions } from "./useFormActions";
import { useSetBulkFormLoading } from "./useSetBulkFormLoading";
import { useTestPointSequenceDetails } from "./useTestPointSequenceDetails";
import { useTestPointSequenceDetailsTabs } from "./useTestPointSequenceDetailsTabs";

export type TestPointSequenceDetailsProps = {
    testPointSequence: TestPointSequence;
    onReturnMarkerClick: () => void;
};

export const TestPointSequenceDetails = (props: TestPointSequenceDetailsProps) => {
    const { onReturnMarkerClick, testPointSequence } = props;
    const { t } = useTestPointSequenceDetailsTranslation();
    const { isOpen, onOpen: onOpenAddTestPointsModal, onClose } = useDisclosure();
    const { currentTabIndex, handleTabsChange, TABS_INDEXES } = useTestPointSequenceDetailsTabs();
    const { testPointAssociations, isLoading, isFetching } = useGetAllTestPointSequenceTestPointAssociationsQuery({
        testPointSequenceId: testPointSequence.id,
        flightTestOrderId: testPointSequence.flightTestOrderId,
    });
    const { testPointParameters } = useFilteredTestPointParameters(testPointAssociations);
    const { isBulkFormLoading, setIsBulkFormLoading } = useSetBulkFormLoading();
    const { isFtoEditable } = useTestPointSequenceDetails({ flightTestOrderId: testPointSequence.flightTestOrderId });
    const { additionalNotes, setAdditionalNotes, onSubmitAdditionalNotes, isLoadingAdditionalNotesSubmit } =
        useSubmitAdditionalNotes({
            additionalNotes: testPointSequence.additionalNotes,
            testPointSequenceId: testPointSequence.id,
            flightTestOrderId: testPointSequence.flightTestOrderId,
        });
    const { formRef, onSubmit, onAfterSubmit, addBlankRowRef } = useFormActions({
        onSubmitAdditionalNotes,
        flightTestOrderId: testPointSequence.flightTestOrderId,
        testPointSequenceId: testPointSequence.id,
    });

    const isEmpty = !(!isLoading && (testPointAssociations?.length ?? 0) > 0);

    return (
        <SynchronizedScrollProvider>
            <HeaderLayout variant="secondary">
                <HeaderLayout.Header>
                    <Header.Title
                        parentTitle={t("Test Point Sequences")}
                        title={testPointSequence.type}
                        hasReturnMarker
                        onClick={onReturnMarkerClick}
                        returnMarkerAriaLabel={t("Back")}
                    />
                    <Header.Controls>
                        <Flex width="full" justifyContent="flex-end">
                            <Button
                                variant="primary"
                                onClick={onSubmit}
                                isDisabled={isEmpty}
                                isLoading={isLoadingAdditionalNotesSubmit || isBulkFormLoading}
                            >
                                {t("Save")}
                            </Button>
                        </Flex>
                    </Header.Controls>
                </HeaderLayout.Header>
                <HeaderLayout.Content>
                    <Tabs size="sm" variant="underline" index={currentTabIndex} onChange={handleTabsChange}>
                        <TabList>
                            <Tab>{t("Test Points Sequence")}</Tab>
                            <Tab>{t("Additional Notes")}</Tab>
                            <HStack marginLeft="auto" spacing={8} py={1.5} px={2}>
                                <AddBlankRowButton
                                    addBlankRowRef={addBlankRowRef}
                                    isDisabled={isEmpty || currentTabIndex === TABS_INDEXES.ADDITIONAL_NOTES}
                                />
                                <Button
                                    variant="ghost"
                                    leftIcon={<Icon icon="plus" size={4} />}
                                    isDisabled={currentTabIndex === TABS_INDEXES.ADDITIONAL_NOTES}
                                    onClick={onOpenAddTestPointsModal}
                                >
                                    {t("Add From List")}
                                </Button>
                            </HStack>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                {match({ isEmpty, isLoading, isFetching })
                                    .with({ isLoading: true }, { isFetching: true }, () => (
                                        <VStack alignItems="center">
                                            <Spinner size="lg" />
                                        </VStack>
                                    ))
                                    .with({ isEmpty: true }, () => <EmptyTestPointsTabContent />)
                                    .with({ isEmpty: false }, () => (
                                        <>
                                            <TestPointsTabContentHeader testPointParameters={testPointParameters} />
                                            <TestPointsTabContent
                                                formRef={formRef}
                                                addBlankRowRef={addBlankRowRef}
                                                onAfterSubmit={onAfterSubmit}
                                                testPointSequenceId={testPointSequence.id}
                                                testPointAssociations={testPointAssociations}
                                                testPointParameters={testPointParameters}
                                                setIsBulkFormLoading={setIsBulkFormLoading}
                                            />
                                        </>
                                    ))
                                    .exhaustive()}
                            </TabPanel>
                            <TabPanel>
                                <AdditionalNotesTabContent
                                    additionalNotes={additionalNotes}
                                    setAdditionalNotes={setAdditionalNotes}
                                    isFtoEditable={isFtoEditable}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    {isOpen && (
                        <AddTestPointsFromListModal
                            flightTestOrderId={testPointSequence.flightTestOrderId}
                            testPointSequenceId={testPointSequence.id}
                            isOpen={isOpen}
                            onClose={onClose}
                        />
                    )}
                </HeaderLayout.Content>
            </HeaderLayout>
        </SynchronizedScrollProvider>
    );
};
