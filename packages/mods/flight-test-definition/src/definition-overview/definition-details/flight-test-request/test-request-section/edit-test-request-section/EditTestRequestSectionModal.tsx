import type { FlightTestDefinitionResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { EditResourceFormModal } from "@voloiq/flight-test-definition-components";
import { DefinitionFormControls, useDefinitionForm } from "@voloiq/flight-test-definition-forms";
import { useEditTestRequestSectionTranslation } from "./translations/useEditFlightTestRequestTranslation";
import { useGetTestRequestSectionInitialValues } from "./useGetTestRequestSectionInitialValues";
import { useOnEditFlightTestRequest } from "./useOnEditTestRequestSection";

export type EditFlightTestRequestModalProps = {
    definition: FlightTestDefinitionResponseBody;
    isOpen?: boolean;
    onClose: () => void;
};

export const EditFlightTestRequestModal = (props: EditFlightTestRequestModalProps) => {
    const { definition, onClose, isOpen } = props;
    const { id: definitionId, masterModel } = definition;
    const { t } = useEditTestRequestSectionTranslation();
    const { onChangeMasterModelOption, schema } = useDefinitionForm({ selectedMasterModel: masterModel });
    const { onEditFlightTestRequest } = useOnEditFlightTestRequest({ definitionId });
    const { getInitialValues } = useGetTestRequestSectionInitialValues();

    return (
        <EditResourceFormModal
            onEdit={async (...args) => {
                await onEditFlightTestRequest(...args);
                onClose();
            }}
            isOpen={isOpen}
            onClose={onClose}
            formSchema={schema}
            renderFormControls={(FormControl) => (
                <DefinitionFormControls
                    FormControl={FormControl}
                    onChangeMasterModelOption={onChangeMasterModelOption}
                />
            )}
            initialValues={getInitialValues(definition)}
            resourceNameSingular={t("Test Request Section")}
        />
    );
};
