import { Card, VStack } from "@volocopter/design-library-react";
import type { CrewRole, CrewRoleUpdate } from "@voloiq-typescript-api/crew-api-types";
import React from "react";
import { FormProvider } from "@voloiq/form";
import type { RenderEditHandlerProps } from "@voloiq/resource-overview";
import { useUpdateCrewRole } from "../../api-hooks/useCrewRoleService";
import { useRequestWithErrorHandling } from "../../errors/useRequestWithErrorHandling";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";
import { useVisibilityToggleRequirements } from "../generic/useVisibilityToggleRequirements";
import { useCrewRoleEditForm } from "./useCrewRoleEditForm";
import { useInitializeToggle } from "./useInitializeToggle";

type EditCrewRoleProps = RenderEditHandlerProps<CrewRole>;

export const EditCrewRole = (props: EditCrewRoleProps) => {
    const { formRef, onAfterSubmit, onSubmitError, resource, onSubmit } = props;
    const { version } = resource;
    const { t } = useCrewApiTranslation();
    const { id: crewRoleId, validTo, validFrom, canBecomePilotInCharge } = resource;
    const { FormControl, editCrewRoleSchema, isEditCrewRoleFieldName } = useCrewRoleEditForm();
    const { sendRequestById } = useUpdateCrewRole();
    const { isVisible, setIsVisible } = useVisibilityToggleRequirements();
    const { isInitialized, setIsInitialized } = useInitializeToggle();
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: (requestConfig: { data: CrewRoleUpdate }) =>
            sendRequestById(crewRoleId || "-1", { ...requestConfig, params: { version } }),
        schema: editCrewRoleSchema,
        isFieldName: isEditCrewRoleFieldName,
    });
    if (!isInitialized) {
        setIsInitialized(true);
        setIsVisible(canBecomePilotInCharge ?? false);
    }
    const crewRoleInitialValues = {
        ...resource,
        validFrom: validFrom ? new Date(validFrom) : undefined,
        validTo: validTo ? new Date(validTo) : undefined,
    };

    return (
        <Card>
            <VStack alignItems="baseline" spacing="3">
                <FormProvider
                    schema={editCrewRoleSchema}
                    formType="edit"
                    formRef={formRef}
                    onAfterSubmit={onAfterSubmit}
                    onSubmitError={onSubmitError}
                    initialValues={crewRoleInitialValues}
                    onEdit={async (crewRoleFormData) => {
                        onSubmit();
                        try {
                            const data: CrewRoleUpdate = {
                                roleKey: crewRoleFormData.roleKey,
                                description: crewRoleFormData.description ?? "-",
                                requiresAircraftType: crewRoleFormData.requiresAircraftType,
                                requiresLicense:
                                    crewRoleFormData.canBecomePilotInCharge && crewRoleFormData.requiresLicense,
                                requiresWeight:
                                    crewRoleFormData.canBecomePilotInCharge && crewRoleFormData.requiresWeight,
                                canBecomePilotInCharge: crewRoleFormData.canBecomePilotInCharge,
                                createdBy: crewRoleFormData.createdBy ?? "Crew-Api",
                                updatedBy: crewRoleFormData.updatedBy,
                                validFrom: crewRoleFormData.validFrom ? crewRoleFormData.validFrom.toISOString() : "",
                                validTo: crewRoleFormData.validTo ? crewRoleFormData.validTo.toISOString() : "",
                            };
                            return await makeRequestWithErrorHandling(data);
                        } catch {
                            onSubmitError("GENERIC");
                            return {};
                        }
                    }}
                >
                    <FormControl
                        fieldName="roleKey"
                        isNotEditable
                        additionalInfo={t("crewRole.additionalInfo.roleKey")}
                    />
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
