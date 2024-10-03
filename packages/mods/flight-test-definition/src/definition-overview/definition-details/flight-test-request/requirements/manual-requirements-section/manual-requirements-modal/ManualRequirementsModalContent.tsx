import { useQueryClient } from "@tanstack/react-query";
import { VStack } from "@volocopter/design-library-react";
import { useGetAllRequirementsQuery } from "@voloiq/flight-test-definition-api/v1";
import { BulkResourceForm } from "@voloiq/flight-test-definition-components";
import { useDefinition } from "../../../../definition-context/useDefinition";
import { useManualRequirementsModalTranslation } from "./translations/useManualRequirementsModalTranslation";
import { useRequirementBulkFormSchema } from "./useRequirementBulkFormSchema";
import { useRequirementsOnBulkOperations } from "./useRequirementsOnBulkOperations";

export type ManualRequirementsModalContentProps = {
    onAfterSubmit: () => void;
};

export const ManualRequirementsModalContent = (props: ManualRequirementsModalContentProps) => {
    const { onAfterSubmit } = props;

    const queryClient = useQueryClient();
    const { t } = useManualRequirementsModalTranslation();
    const {
        definition: { id: definitionId },
    } = useDefinition();
    const { requirementsBulkFormSchema } = useRequirementBulkFormSchema();
    const { requirements } = useGetAllRequirementsQuery({ definitionId });
    const { onBulkAddRequirements, onBulkDeleteRequirements, onBulkEditRequirements } = useRequirementsOnBulkOperations(
        { definitionId }
    );

    const handleOnAfterSubmit = () => {
        queryClient.invalidateQueries(["requirements"]);
        queryClient.invalidateQueries(["tabCounters"]);
        onAfterSubmit();
    };

    return (
        <BulkResourceForm
            entityName={t("Requirement")}
            onAdd={onBulkAddRequirements}
            onDelete={onBulkDeleteRequirements}
            onEdit={onBulkEditRequirements}
            schema={requirementsBulkFormSchema}
            initialValues={requirements}
            onAfterSubmit={handleOnAfterSubmit}
            renderFormControlGroup={(FormControl) => (
                <VStack w="full">
                    <FormControl fieldName="title" />
                    <FormControl fieldName="description" />
                    <FormControl fieldName="passOrFailCriteria" />
                </VStack>
            )}
            withSubmitButton
        />
    );
};
