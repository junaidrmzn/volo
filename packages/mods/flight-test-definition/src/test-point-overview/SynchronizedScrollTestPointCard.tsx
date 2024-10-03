import { HStack, Icon, IconButton, useDisclosure } from "@volocopter/design-library-react";
import type { TestPoint } from "@voloiq/flight-test-definition-api/v1";
import type { TestPointCardProps } from "@voloiq/flight-test-definition-components";
import { TestPointCard } from "@voloiq/flight-test-definition-components";
import { useSynchronizedScrollElement } from "@voloiq/flight-test-definition-utils";
import { NoTestPointAttemptsFound } from "./NoTestPointAttemptsFound";
import { EditTestPointAttemptModal } from "./test-point-attempt-modal/EditTestPointAttemptModal";
import { TestPointAttemptTable } from "./test-point-attempt-table/TestPointAttemptTable";
import { useTestPointOverviewTranslation } from "./translations/useTestPointOverviewTranslation";

export type SynchronizedScrollTestPointCardProps = {
    reloadList: () => void;
    procedureTitle: string;
    testPoint: TestPoint;
};

export const SynchronizedScrollTestPointCard = (props: SynchronizedScrollTestPointCardProps) => {
    const { testPoint, procedureTitle, reloadList } = props;
    const {
        isApplicableForAgency,
        isApplicableForBuildUp,
        isApplicableForCertification,
        isApplicableForDevelopment,
        isApplicableForUnassigned,
        attempts,
        centerOfGravity,
        testPointId,
        testPointParameters,
        status,
        comments,
        grossWeight,
    } = testPoint;
    const { onScroll, ref } = useSynchronizedScrollElement();
    const { t } = useTestPointOverviewTranslation();
    const { isOpen: isEditModalOpen, onClose: onCloseEditModal, onOpen: onOpenEditModal } = useDisclosure();
    const onClose = () => {
        reloadList();
        onCloseEditModal();
    };

    // TODO: Remove this ugly code (the series of ifs) once the V1 TestPoint model and endpoints are deprecated.
    const applicabilities: TestPointCardProps["applicabilities"] = [];

    if (isApplicableForAgency) {
        applicabilities.push("AGENCY");
    }

    if (isApplicableForBuildUp) {
        applicabilities.push("BUILD_UP");
    }

    if (isApplicableForCertification) {
        applicabilities.push("CERTIFICATION");
    }

    if (isApplicableForDevelopment) {
        applicabilities.push("DEVELOPMENT");
    }

    if (isApplicableForUnassigned) {
        applicabilities.push("UNASSIGNED");
    }

    return (
        <TestPointCard
            testPointParameters={testPointParameters}
            centerOfGravity={centerOfGravity}
            testPointId={testPointId.split("-").pop() ?? "-"}
            comments={comments}
            grossWeight={grossWeight}
            status={status ?? "IN WORK"}
            applicabilities={applicabilities}
            testPointParameterContainerRef={ref}
            onScrollTestPointParameterContainer={onScroll}
        >
            <HStack alignItems="start">
                {attempts && attempts.length > 0 ? (
                    <TestPointAttemptTable testPointAttempts={attempts} />
                ) : (
                    <NoTestPointAttemptsFound />
                )}
                <IconButton variant="ghost" aria-label={t("Edit Test Point Attempts Button")} onClick={onOpenEditModal}>
                    <Icon icon="edit" size={4} />
                </IconButton>
                {isEditModalOpen && (
                    <EditTestPointAttemptModal
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
