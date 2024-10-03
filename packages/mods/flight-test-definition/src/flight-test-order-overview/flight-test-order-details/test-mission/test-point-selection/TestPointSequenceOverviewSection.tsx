import { useQueryClient } from "@tanstack/react-query";
import { VStack, useDisclosure } from "@volocopter/design-library-react";
import { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { BulkResourceFormModal, EditButton } from "@voloiq/flight-test-definition-components";
import { ModalHeaderLayout, SectionHeader } from "@voloiq/text-layouts";
import { TestPointSequenceList } from "./test-points-sequence-list/TestPointSequenceList";
import { useTestPointSelectionTranslation } from "./translations/useTestPointSelectionTranslation";
import { useTestPointSequencesFormSchema } from "./useTestPointSequencesFormSchema";
import { useTestPointSequencesSection } from "./useTestPointSequencesSection";

export type TestPointSequenceOverviewSectionProps = {
    flightTestOrderId: string;
};

export const TestPointSequenceOverviewSection = (props: TestPointSequenceOverviewSectionProps) => {
    const { flightTestOrderId } = props;

    const { isOpen, onClose, onOpen } = useDisclosure();
    const { t } = useTestPointSelectionTranslation();
    const { formSchema } = useTestPointSequencesFormSchema();

    const {
        testPointSequences,
        invalidateGetAllTestPointSequencesQuery,
        onBulkAddTestPointSequences,
        onBulkDeleteTestPointSequences,
        onBulkEditTestPointSequences,
    } = useTestPointSequencesSection({ flightTestOrderId });

    const queryClient = useQueryClient();

    const flightTestOrder: FlightTestOrder | undefined = queryClient.getQueryData([
        "FlightTestOrderV2",
        flightTestOrderId,
    ]);

    const isEditable =
        flightTestOrder && (flightTestOrder?.status === "DRAFT" || flightTestOrder?.status === "AWAITING_APPROVAL");

    const handleSubmit = () => {
        invalidateGetAllTestPointSequencesQuery();
        onClose();
    };

    return (
        <VStack spacing={6} boxSize="full">
            <SectionHeader label={t("Test Points Sequences Overview")}>
                {isEditable && <EditButton resourceName={t("Test Points Sequences")} onClick={onOpen} />}
            </SectionHeader>
            <TestPointSequenceList testPointSequences={testPointSequences} />
            <BulkResourceFormModal
                onModalClose={onClose}
                isOpen={isOpen}
                header={
                    <ModalHeaderLayout
                        modalType={testPointSequences && testPointSequences.length > 0 ? t("Edit") : t("Add")}
                        modalTitle={t("Test Points Sequences")}
                    />
                }
                entityName={t("Test Points Sequence")}
                schema={formSchema}
                initialValues={(() => testPointSequences)()}
                onAfterSubmit={handleSubmit}
                renderFormControlGroup={(FormControl) => (
                    <VStack spacing={3}>
                        <FormControl fieldName="type" />
                        <FormControl fieldName="testPoint" />
                        <FormControl fieldName="successCriteria" />
                    </VStack>
                )}
                onAdd={onBulkAddTestPointSequences}
                onDelete={onBulkDeleteTestPointSequences}
                onEdit={onBulkEditTestPointSequences}
            />
        </VStack>
    );
};
