import { Box, Center, Spinner } from "@volocopter/design-library-react";
import type {
    CrewAssignment,
    CrewMember,
    CrewMemberUpdateWithAssignments,
} from "@voloiq-typescript-api/crew-api-types";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { FormProvider } from "@voloiq/form";
import type { RenderEditHandlerProps } from "@voloiq/resource-overview";
import { useUpdateCrewMemberWithAssignments } from "../../api-hooks/useCrewMemberService";
import { useRequestWithErrorHandling } from "../../errors/useRequestWithErrorHandling";
import { EditCrewMemberFormFields } from "./EditCrewMemberFormFields";
import { RoleAssignment } from "./RoleAssignment";
import { useCrewMemberEditForm } from "./useCrewMemberEditForm";

type CrewMemberEditProps = RenderEditHandlerProps<CrewMember>;

export const EditCrewMember = (props: CrewMemberEditProps) => {
    const { formRef, resource, onAfterSubmit, onSubmitError, onSubmit } = props;
    const { id: crewMemberId } = resource;
    const {
        crewMemberInitialValues,
        editCrewMemberSchema,
        isEditCrewMemberFieldName,
        version,
        baseValues,
        FormControl,
        crewRoles,
        crewAssignments,
        rolesLoaded,
    } = useCrewMemberEditForm(resource);

    const { sendRequestById } = useUpdateCrewMemberWithAssignments();
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: (requestConfig: { data: CrewMemberUpdateWithAssignments }) =>
            sendRequestById(crewMemberId || "-1", { ...requestConfig, params: { version } }),
        schema: editCrewMemberSchema,
        isFieldName: isEditCrewMemberFieldName,
    });
    const canUpdateCrewSensitiveInformation = useIsAuthorizedTo(["update"], ["CrewInformation"]);

    return (
        <Box background="mono500Gray750" borderRadius="md" padding={4}>
            {rolesLoaded ? (
                <FormProvider
                    formId="crewMemberEditForm"
                    schema={editCrewMemberSchema}
                    formType="edit"
                    formRef={formRef}
                    initialValues={crewMemberInitialValues}
                    onAfterSubmit={onAfterSubmit}
                    onSubmitError={onSubmitError}
                    onEdit={async (crewMemberFormData) => {
                        onSubmit();
                        try {
                            const data: CrewMemberUpdateWithAssignments = {
                                firstName: crewMemberFormData.firstName,
                                middleName: crewMemberInitialValues.middleName,
                                surName: crewMemberFormData.surName,
                                weight:
                                    crewMemberFormData.weight === undefined
                                        ? crewMemberFormData.weight
                                        : Number(baseValues.weight),
                                homeBase: crewMemberFormData.homeBase?.value ?? crewMemberInitialValues.homeBase.value,
                                licenseValidUntil: crewMemberFormData.licenseValidUntil
                                    ? crewMemberFormData.licenseValidUntil.toISOString()
                                    : "",
                                medicalCertificateValidUntil: crewMemberFormData.medicalCertificateValidUntil
                                    ? crewMemberFormData.medicalCertificateValidUntil.toISOString()
                                    : "",
                                languageProficiencyValidUntil: crewMemberFormData.languageProficiencyValidUntil
                                    ? crewMemberFormData.languageProficiencyValidUntil.toISOString()
                                    : "",
                                licensedRemotePilotedFlights: crewMemberFormData.licensedRemotePilotedFlights,
                                licensedPilotedFlights: crewMemberFormData.licensedPilotedFlights,
                                email: crewMemberFormData.email,
                                phoneNumber: crewMemberInitialValues.phoneNumber,
                                department: crewMemberInitialValues.department,
                                entryTime: crewMemberInitialValues.entryTime,
                                exitTime: crewMemberInitialValues.exitTime,
                                roleAssignments: crewAssignments.crewAssignmentObjects.map((assignmentObject) => {
                                    return {
                                        id: assignmentObject.id ?? assignmentObject.roleId,
                                        crewMemberId: assignmentObject.memberId ?? assignmentObject.roleId,
                                        crewRoleId: assignmentObject.roleId,
                                        acTypeId: assignmentObject.acTypeId,
                                        validFrom: assignmentObject.validFrom ?? "",
                                        validTo: assignmentObject.validTo ?? "",
                                        createdBy: "frontend-input",
                                        updatedBy: "frontend-input",
                                        createTime: assignmentObject.validFrom,
                                        updateTime: assignmentObject.validFrom,
                                    } as CrewAssignment;
                                }),
                                createdBy: "Test",
                                updatedBy: "Test",
                                validFrom: crewMemberFormData.validFrom.toISOString(),
                                validTo: crewMemberFormData.validTo ? crewMemberFormData.validTo.toISOString() : "",
                            };
                            if (!canUpdateCrewSensitiveInformation) {
                                delete data.weight;
                            }
                            return await makeRequestWithErrorHandling(data);
                        } catch {
                            onSubmitError("GENERIC");
                            return {};
                        }
                    }}
                >
                    <EditCrewMemberFormFields FormControl={FormControl} hrId={crewMemberInitialValues.hrId} />
                    <RoleAssignment FormControl={FormControl} crewRoles={crewRoles} crewAssignments={crewAssignments} />
                </FormProvider>
            ) : (
                <Center height="full">
                    <Spinner />
                </Center>
            )}
        </Box>
    );
};
