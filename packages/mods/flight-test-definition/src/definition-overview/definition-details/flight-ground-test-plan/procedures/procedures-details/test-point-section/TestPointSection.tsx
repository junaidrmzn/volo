import { Button, Icon, VStack, useDisclosure } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useGetAllTestPointsQuery } from "@voloiq/flight-test-definition-api/v1";
import { AddButton, EditButton } from "@voloiq/flight-test-definition-components";
import { SectionHeader } from "@voloiq/text-layouts";
import { TestPointSectionContent } from "./TestPointSectionContent";
import { TestPointsFormModal } from "./TestPointsFormModal";
import { useTestPointSectionTranslation } from "./translations/useTestPointSectionTranslation";

export type TestPointSectionProps = {
    definitionId: string;
    procedureId: string;
};

export const TestPointSection = (props: TestPointSectionProps) => {
    const { definitionId, procedureId } = props;
    const { t } = useTestPointSectionTranslation();
    const { testPoints } = useGetAllTestPointsQuery({
        definitionId,
        procedureId,
        params: { size: 100_000, orderBy: "sequenceIndex:asc" },
    });
    const { isOpen: isEditing, onOpen: onOpenEditModal, onClose: onCloseEditModal } = useDisclosure();
    const buttonProps = {
        resourceName: t("Test Points"),
        onClick: onOpenEditModal,
    };

    if (!testPoints) {
        return null;
    }

    return (
        <VStack spacing={6} boxSize="full" alignItems="stretch">
            <SectionHeader label={t("Test Points")}>
                {testPoints && testPoints.length > 0 ? <EditButton {...buttonProps} /> : <AddButton {...buttonProps} />}
            </SectionHeader>
            {match(testPoints)
                .when(
                    () => testPoints.length > 0,
                    () => <TestPointSectionContent testPoints={testPoints} />
                )
                .otherwise(() => (
                    <Button leftIcon={<Icon icon="plus" size={4} />} width="full" onClick={onOpenEditModal}>
                        {t("Add Test Points")}
                    </Button>
                ))}
            {isEditing && (
                <TestPointsFormModal
                    testPoints={testPoints}
                    onModalClose={onCloseEditModal}
                    definitionId={definitionId}
                    procedureId={procedureId}
                />
            )}
        </VStack>
    );
};
