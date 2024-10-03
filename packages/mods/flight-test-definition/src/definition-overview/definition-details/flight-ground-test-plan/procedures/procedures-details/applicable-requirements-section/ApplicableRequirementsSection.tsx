import { Text, VStack, useDisclosure } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { EditButton } from "@voloiq/flight-test-definition-components";
import { SectionHeader } from "@voloiq/text-layouts";
import { ApplicableRequirementsSectionContent } from "./ApplicableRequirementsSectionContent";
import { ToggleApplicableRequirementsModal } from "./ToggleApplicableRequirementsModal";
import { useApplicableRequirementsSectionTranslation } from "./translations/useApplicableRequirementsSectionTranslation";
import { useApplicableRequirements } from "./useApplicableRequirements";
import { useAreThereRequirements } from "./useAreThereRequirements";

export type ApplicableRequirementsSectionProps = {
    definitionId: string;
    procedureId: string;
};

export const ApplicableRequirementsSection = (props: ApplicableRequirementsSectionProps) => {
    const { definitionId, procedureId } = props;
    const { t } = useApplicableRequirementsSectionTranslation();
    const areThereRequirements = useAreThereRequirements({ definitionId });
    const { applicableRequirements } = useApplicableRequirements({ definitionId, procedureId });
    const { isOpen: isEditModalOpen, onClose: onCloseEditModal, onOpen: onOpenEditModal } = useDisclosure();

    return (
        <>
            <VStack spacing={6} boxSize="full" alignItems="stretch">
                <SectionHeader label={t("Applicable Requirements")}>
                    <EditButton
                        resourceName={t("Applicable Requirements")}
                        onClick={onOpenEditModal}
                        isDisabled={!areThereRequirements}
                    />
                </SectionHeader>
                {match({ areThereRequirements, applicableRequirements })
                    .when(
                        () => !areThereRequirements,
                        () => (
                            <Text p={2} textAlign="center" fontSize="sm" lineHeight={6}>
                                {t("No Requirements available for this Flight Test Definition")}
                            </Text>
                        )
                    )
                    .when(
                        () => applicableRequirements === undefined || applicableRequirements.length === 0,
                        () => (
                            <Text p={2} textAlign="center" fontSize="sm" lineHeight={6}>
                                {t("No Requirements selected for this Procedure")}
                            </Text>
                        )
                    )
                    .otherwise(() => (
                        <ApplicableRequirementsSectionContent applicableRequirements={applicableRequirements} />
                    ))}
            </VStack>
            <ToggleApplicableRequirementsModal
                onClose={onCloseEditModal}
                isOpen={isEditModalOpen}
                definitionId={definitionId}
                procedureId={procedureId}
            />
        </>
    );
};
