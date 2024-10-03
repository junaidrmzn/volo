import type { FlightTestDefinitionInsert } from "@voloiq/flight-test-definition-api/v2";
import { useOptimisticEditDefinition } from "@voloiq/flight-test-definition-api/v2";
import type { DefinitionFormSchema } from "@voloiq/flight-test-definition-forms";
import type { OnEditHandler } from "@voloiq/form";
import { useDefinitionEditSessionId } from "../../../definition-edit-session-id-context/useDefinitionEditSessionId";

export type UseOnEditFlightTestRequestOptions = {
    definitionId: string;
};

export const useOnEditFlightTestRequest = (options: UseOnEditFlightTestRequestOptions) => {
    const { definitionId } = options;
    const { optimisticEditDefinition } = useOptimisticEditDefinition({ definitionId });
    const { definitionEditSessionId: editSessionId } = useDefinitionEditSessionId();
    const onEditFlightTestRequest: OnEditHandler<DefinitionFormSchema> = (formData) => {
        const data: Omit<FlightTestDefinitionInsert, "requesterName"> = {
            // we need to explicitly build this object here, because the forms library will populate the formData object
            // with all the data that's passed into the initialValues. That would also include the definition's status
            // which can cause unintended status changes
            title: formData.title,
            summary: formData.summary,
            scope: formData.scope,
            testArticle: formData.testArticle,
            revision: formData.revision,
            ata: formData.ata,
            testNumber: formData.testNumber,
            msn: formData.msn.value,
            masterModel: formData.masterModel.value,
            testType: formData.testType.value,
            model: formData.model,
        };
        optimisticEditDefinition({ data, params: { editSessionId } });
    };

    return { onEditFlightTestRequest };
};
