import { VStack } from "@volocopter/design-library-react";
import type { CrewRoleCreate } from "@voloiq-typescript-api/crew-api-types";
import { addYears } from "date-fns";
import { FormProvider } from "@voloiq/form";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { Card } from "@voloiq/text-layouts";
import { useCreateCrewRole } from "../../api-hooks/useCrewRoleService";
import { useRequestWithErrorHandling } from "../../errors/useRequestWithErrorHandling";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";
import { useVisibilityToggleRequirements } from "../generic/useVisibilityToggleRequirements";
import { useCrewRoleCreateForm } from "./useCreateCrewRoleForm";

type CrewRoleCreateProps = RenderAddHandlerProps;
export const CreateCrewRole = (props: CrewRoleCreateProps) => {
    const { formRef, onSubmitError, onAfterSubmit, onSubmit } = props;
    const { t } = useCrewApiTranslation();
    const { FormControl, createCrewRoleSchema, isCreateCrewRoleFieldName } = useCrewRoleCreateForm();
    const { sendRequest } = useCreateCrewRole();
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: sendRequest,
        schema: createCrewRoleSchema,
        isFieldName: isCreateCrewRoleFieldName,
    });

    const { isVisible, setIsVisible } = useVisibilityToggleRequirements();

    return (
        <Card>
            <VStack alignItems="baseline" spacing="3">
                <FormProvider
                    formId="crewRoleCreateForm"
                    schema={createCrewRoleSchema}
                    formRef={formRef}
                    formType="create"
                    onAfterSubmit={onAfterSubmit}
                    onSubmitError={onSubmitError}
                    onCreate={async (crewRoleFormData) => {
                        onSubmit();
                        try {
                            const data: CrewRoleCreate = {
                                roleKey: crewRoleFormData.roleKey,
                                description: crewRoleFormData.description ?? "-",
                                requiresAircraftType: crewRoleFormData.requiresAircraftType,
                                requiresLicense:
                                    crewRoleFormData.canBecomePilotInCharge && crewRoleFormData.requiresLicense,
                                requiresWeight:
                                    crewRoleFormData.canBecomePilotInCharge && crewRoleFormData.requiresWeight,
                                canBecomePilotInCharge: crewRoleFormData.canBecomePilotInCharge,
                                createdBy: "Test",
                                updatedBy: "Test",
                                validFrom: new Date().toISOString(),
                                validTo: addYears(new Date(), 1000).toISOString(),
                            };
                            return await makeRequestWithErrorHandling(data);
                        } catch {
                            onSubmitError("GENERIC");
                            return {};
                        }
                    }}
                >
                    <FormControl fieldName="roleKey" additionalInfo={t("crewRole.additionalInfo.roleKey")} />
                    <FormControl fieldName="description" additionalInfo={t("crewRole.additionalInfo.description")} />
                    <FormControl fieldName="requiresAircraftType" showLabel={false} />
                    <FormControl
                        fieldName="canBecomePilotInCharge"
                        showLabel={false}
                        onChange={() => setIsVisible(!isVisible)}
                    />
                    {isVisible && (
                        <>
                            <FormControl fieldName="requiresLicense" showLabel={false} />
                            <FormControl fieldName="requiresWeight" showLabel={false} />
                        </>
                    )}
                </FormProvider>
            </VStack>
        </Card>
    );
};
