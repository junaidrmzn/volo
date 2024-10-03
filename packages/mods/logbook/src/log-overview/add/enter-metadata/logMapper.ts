import type { AnyObjectSchema, FormValues, MultiselectOption } from "@voloiq/form";
import type { CrewMember, CrewMemberRole, LogCrewMemberInsert, LogInsert } from "@voloiq/logbook-api/v6";

const createLogCrewMemberInsertArrayFromCrewMemberIdArray = (
    crewMemberData: CrewMember[],
    crewMemberIds: string[] | undefined,
    role: CrewMemberRole
): LogCrewMemberInsert[] => {
    if (crewMemberIds && crewMemberData && crewMemberData.length > 0) {
        return crewMemberData
            ?.filter((value) => crewMemberIds.includes(value.id))
            .map(
                (crewMemberElement): LogCrewMemberInsert => ({
                    crewMemberId: crewMemberElement.id,
                    email: crewMemberElement.email,
                    firstName: crewMemberElement.firstName,
                    lastName: crewMemberElement.lastName,
                    role,
                })
            );
    }
    return [];
};

export const createLogInsertFromFormObject = <Schema extends AnyObjectSchema>(
    formData: FormValues<Schema>,
    crewMemberData: CrewMember[]
): LogInsert => {
    return {
        date: formData.date,
        aircraftId: formData.aircraftId.value,
        locationId: formData.locationId.value,
        crew: [
            ...createLogCrewMemberInsertArrayFromCrewMemberIdArray(
                crewMemberData,
                formData.crewPilot?.map((selection: MultiselectOption) => selection.value),
                "PILOT"
            ),
            ...createLogCrewMemberInsertArrayFromCrewMemberIdArray(
                crewMemberData,
                formData.crewSupervisor?.map((selection: MultiselectOption) => selection.value),
                "SUPERVISOR"
            ),
        ],
        remarks: formData.remarks,
    };
};
