import { HStack, Icon, IconButton, useDisclosure } from "@volocopter/design-library-react";
import { TestPoint } from "@voloiq/flight-test-definition-api/v2";
import { TestPointCard } from "@voloiq/flight-test-definition-components";
import { useSynchronizedScrollElement } from "@voloiq/flight-test-definition-utils";
import { NoTestPointAttemptsFound } from "./NoTestPointAttemptsFound";
import { EditTestPointAttemptModalV2 } from "./test-point-attempt-modal-v2/EditTestPointAttemptModalV2";
import { TestPointAttemptTableV2 } from "./test-point-attempt-table/TestPointAttemptTableV2";
import { useTestPointOverviewTranslation } from "./translations/useTestPointOverviewTranslation";

export type SynchronizedScrollTestPointCardV2Props = {
    onEditModalClose: () => void;
    procedureTitle: string;
    testPoint: TestPoint;
};

export const SynchronizedScrollTestPointCardV2 = (props: SynchronizedScrollTestPointCardV2Props) => {
    const { testPoint, procedureTitle, onEditModalClose } = props;
    const {
        testPointId,
        attempts,
        testPointParameters,
        centerOfGravity,
        comments,
        grossWeight,
        applicability,
        status,
    } = testPoint;
    const { onScroll, ref } = useSynchronizedScrollElement();
    const { t } = useTestPointOverviewTranslation();
    const { isOpen: isEditModalOpen, onClose: onCloseEditModal, onOpen: onOpenEditModal } = useDisclosure();
    const onClose = () => {
        onEditModalClose();
        onCloseEditModal();
    };

    return (
        <TestPointCard
            testPointParameters={testPointParameters}
            centerOfGravity={centerOfGravity}
            testPointId={testPointId.split("-").pop() ?? "-"}
            comments={comments}
            grossWeight={grossWeight}
            applicabilities={[applicability]}
            status={status ?? "IN WORK"}
            testPointParameterContainerRef={ref}
            onScrollTestPointParameterContainer={onScroll}
        >
            <HStack alignItems="start">
                {attempts && attempts.length > 0 ? (
                    <TestPointAttemptTableV2 testPointAttempts={attempts} />
                ) : (
                    <NoTestPointAttemptsFound />
                )}
                <IconButton variant="ghost" aria-label={t("Edit Test Point Attempts Button")} onClick={onOpenEditModal}>
                    <Icon icon="edit" size={4} />
                </IconButton>
                {isEditModalOpen && (
                    <EditTestPointAttemptModalV2
                        onClose={onClose}
                        isOpen={isEditModalOpen}
                        testPoint={testPoint}
                        procedureTitle={procedureTitle}
                    />
                )}
            </HStack>
        </TestPointCard>
    );
};
