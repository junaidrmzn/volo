import { Box } from "@volocopter/design-library-react";
import type { CrewAssignment, CrewMemberUpdateWithAssignments } from "@voloiq-typescript-api/crew-api-types";
import { FormProvider } from "@voloiq/form";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { useCreateCrewMember } from "../../api-hooks/useCrewMemberService";
import { useRequestWithErrorHandling } from "../../errors/useRequestWithErrorHandling";
import { useCrewAssignments } from "../hooks/useCrewAssignments";
import { CreateCrewMemberFormFields } from "./CreateCrewMemberFormFields";
import { useCrewMemberCreateForm } from "./useCreateCrewMemberForm";

type CrewMemberCreateProps = RenderAddHandlerProps;
export const CreateCrewMember = (props: CrewMemberCreateProps) => {
    const { formRef, onAfterSubmit, onSubmit, onSubmitError } = props;

    const { callBackAssignmentObject, setCallBackAssignmentObject } = useCrewAssignments([]);
    const { createCrewMemberSchema, isCreateCrewMemberFieldName, baseValues, FormControl } =
        useCrewMemberCreateForm(callBackAssignmentObject);
    const { sendRequest } = useCreateCrewMember();
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: sendRequest,
        schema: createCrewMemberSchema,
        isFieldName: isCreateCrewMemberFieldName,
    });

    const validFrom = new Date();
    validFrom.setHours(validFrom.getUTCHours() + 1);
    validFrom.setMinutes(validFrom.getMinutes());
    validFrom.setSeconds(0);
    validFrom.setMilliseconds(0);

    return (
        <Box background="mono500Gray750" borderRadius="md" padding={4}>
            <FormProvider
                formId="crewMemberCreateForm"
                schema={createCrewMemberSchema}
                formType="create"
                formRef={formRef}
                onAfterSubmit={onAfterSubmit}
                onSubmitError={onSubmitError}
                initialValues={{
                    validFrom,
                }}
                onCreate={async (crewMemberFormData) => {
                    onSubmit();
                    try {
                        const data: CrewMemberUpdateWithAssignments = {
                            firstName: crewMemberFormData.firstName,
                            surName: crewMemberFormData.surName,
                            weight:
                                crewMemberFormData.weight === undefined
                                    ? crewMemberFormData.weight
                                    : Number(baseValues.weight),
                            homeBase: crewMemberFormData.homeBase?.value,
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
                            roleAssignments: callBackAssignmentObject.map((assignmentObject) => {
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
                            phoneNumber: crewMemberFormData.phoneNumber ?? "",
                            createdBy: "Test",
                            updatedBy: "Test",
                            validFrom: crewMemberFormData.validFrom.toISOString(),
                            validTo: crewMemberFormData.validTo ? crewMemberFormData.validTo.toISOString() : "",
                        };
                        return await makeRequestWithErrorHandling(data);
                    } catch {
                        onSubmitError("GENERIC");
                        return {};
                    }
                }}
            >
                <CreateCrewMemberFormFields
                    setCallBackAssignmentObject={setCallBackAssignmentObject}
                    FormControl={FormControl}
                />
            </FormProvider>
        </Box>
    );
};
