import type { CrewMember } from "@voloiq-typescript-api/crew-api-types";
import type { Region } from "@voloiq-typescript-api/vertiport-management-types";
import { useEffect, useMemo, useState } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import type { FieldName } from "@voloiq/form";
import { boolean, createFormControl, datetime, object, select, string, unit } from "@voloiq/form";
import { useGetAllRegionsOptions } from "../../api-hooks/useCrewManagementService";
import { useGetCrewMemberWithAssignments } from "../../api-hooks/useCrewMemberService";
import { useGetCrewRoles } from "../../api-hooks/useCrewRoleService";
import type { ResourcesTranslationFunction } from "../../translations/useCrewApiTranslation";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";
import { CrewMemberAssignmentObject } from "../../types/CrewMemberAssignmentObject";
import { useCrewAssignments } from "../hooks/useCrewAssignments";
import type { UnitBaseValues } from "./useUnitBaseValues";
import { useUnitBaseValues } from "./useUnitBaseValues";

const editCrewMemberSchemaFactory = (
    t: ResourcesTranslationFunction,
    regions: Region[],
    crewMember: CrewMember | undefined,
    baseValues: UnitBaseValues,
    handleBaseValueUpdate: (key: keyof UnitBaseValues, value: string) => void,
    crewAssignments: CrewMemberAssignmentObject[],
    canUpdate?: boolean
) =>
    object({
        firstName: string()
            .required(t("generic.required error"))
            .max(100, t("generic.maxLength error"))
            .min(0, t("generic.minLength error"))
            .label(t("crewMember.model.firstName")),
        middleName: string().label(t("crewMember.model.middleName")).nullable(),
        surName: string()
            .required(t("generic.required error"))
            .max(100, t("generic.maxLength error"))
            .min(0, t("generic.minLength error"))
            .label(t("crewMember.model.surName")),
        homeBase: select<string>({
            placeholder:
                regions.find((region: { id: string | undefined }) => region.id === crewMember?.homeBase)?.name ??
                t("generic.dropdown placeholder"),
            options: regions.map((region) => ({
                label: region.name,
                value: region.id,
            })),
            errorMessage: t("generic.dropdown error"),
        }).label(t("crewMember.model.homeBase")),
        department: string().label(t("crewMember.model.department")).nullable(),
        weight: unit({
            baseUnit: "kg",
            unitType: "weight",
            defaultBaseValue: baseValues.weight,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("weight", value);
            },
        })
            .optional()
            .max(200, t("generic.maxNumber error"))
            .min(canUpdate ? 40 : -1, t("generic.minNumber error"))
            .label(t("crewMember.model.weight")),
        entryDate: string().label(t("crewMember.model.entryDate")).nullable(),
        exitDate: string().label(t("crewMember.model.exitDate")).nullable(),
        licenseValidUntil: datetime().label(t("crewMember.model.licenseValidUntil")),
        medicalCertificateValidUntil: datetime().label(t("crewMember.model.medicalCertificateValidUntil")),
        languageProficiencyValidUntil: datetime().label(t("crewMember.model.languageProficiencyValidUntil")),
        licensedRemotePilotedFlights: boolean()
            .label(t("crewMember.model.licensedRemotePilotedFlights"))
            .test("licensedRemotePilotedFlights", t("generic.licenseValidationError"), (value, context) => {
                const { licensedPilotedFlights, licensedRemotePilotedFlights } = context.parent;
                const hasPilotRole = crewAssignments.some((assignment) => assignment.roleKey === "PIL");
                if (hasPilotRole && !licensedRemotePilotedFlights && !licensedPilotedFlights) {
                    return false;
                }
                console.log("licensedRemotePilotedFlights returning true");
                return true;
            }),
        licensedPilotedFlights: boolean()
            .label(t("crewMember.model.licensedPilotedFlights"))
            .test("licensedPilotedFlights", t("generic.licenseValidationError"), (value, context) => {
                const { licensedPilotedFlights, licensedRemotePilotedFlights } = context.parent;
                const hasPilotRole = crewAssignments.some((assignment) => assignment.roleKey === "PIL");
                if (hasPilotRole && !licensedPilotedFlights && !licensedRemotePilotedFlights) {
                    return false;
                }
                console.log("licensedPilotedFlights returning true");
                return true;
            }),
        email: string()
            .max(200, t("generic.maxLength error"))
            .min(0, t("generic.minLength error"))
            .label(t("crewMember.model.email"))
            .required(),
        phoneNumber: string().max(30, t("generic.maxLength error")).label(t("crewMember.model.phoneNumber")).nullable(),
        validToAssignment: datetime().label(t("crewMember.model.validTo")),
        validFromAssignment: datetime().label(t("crewMember.model.validFrom")),
        validTo: datetime().label(t("crewMember.model.validTo")),
        validFrom: datetime().label(t("crewMember.model.validFrom")).required(),
    });

export type EditCrewMemberSchema = ReturnType<typeof editCrewMemberSchemaFactory>;

export const useCrewMemberEditForm = (crewMember: CrewMember) => {
    const { t } = useCrewApiTranslation();
    const { data: crewMemberData } = useGetCrewMemberWithAssignments(crewMember.id);
    const { data: regions } = useGetAllRegionsOptions();
    const { baseValues, handleBaseValueUpdate } = useUnitBaseValues(crewMember);
    const canUpdateCrewSensitiveInformation = useIsAuthorizedTo(["update"], ["CrewInformation"]);
    const { data: crewRoles } = useGetCrewRoles(1);

    const {
        crewAssignmentObjects,
        setCrewAssignmentsObjects,
        editModeActive,
        setEditMode,
        setCrewAssignmentsReverteObjects,
        revertPossible,
        setRevertPossible,
        crewAssignmentReverteObjects,
        init,
        setInit,
        setAssignmentIsComplete,
        assignmentIsComplete,
    } = useCrewAssignments([]);

    const editCrewMemberSchema = useMemo(
        () =>
            editCrewMemberSchemaFactory(
                t,
                regions,
                crewMemberData,
                baseValues,
                handleBaseValueUpdate,
                crewAssignmentObjects,
                canUpdateCrewSensitiveInformation
            ),
        [t, regions, crewMemberData, baseValues, handleBaseValueUpdate, canUpdateCrewSensitiveInformation]
    );

    const isEditCrewMemberFieldName = (attribute: unknown): attribute is FieldName<EditCrewMemberSchema> =>
        Object.keys(editCrewMemberSchema.describe().fields).includes(attribute as FieldName<EditCrewMemberSchema>);

    const [rolesLoaded, setRolesLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (!crewMemberData?.roleAssignments || crewMemberData?.roleAssignments?.length === 0) {
            setRolesLoaded(true);
        }
        if (
            crewRoles.length > 0 &&
            crewMemberData?.roleAssignments &&
            crewMemberData.roleAssignments.length > 0 &&
            !init
        ) {
            const temporaryAssignments: CrewMemberAssignmentObject[] = [];
            for (const assignment of crewMemberData?.roleAssignments) {
                if (assignment) {
                    for (const crewRole of crewRoles) {
                        if (assignment.crewRoleId === crewRole.id) {
                            temporaryAssignments.push({
                                id: assignment.id,
                                acTypeId: assignment.acTypeId,
                                memberId: assignment.crewMemberId,
                                description: crewRole.description,
                                roleId: crewRole.id,
                                roleKey: crewRole.roleKey,
                                validFrom: assignment.validFrom,
                                validTo: assignment.validTo,
                                acTypePossible: true,
                                editMode: false,
                            });
                        }
                    }
                }
            }
            setCrewAssignmentsObjects(temporaryAssignments);
            setInit(true);
            setRolesLoaded(true);
        }
    }, [crewMemberData?.roleAssignments, crewRoles, init, setCrewAssignmentsObjects, setInit]);

    const crewMemberInitialValues = {
        firstName: crewMember?.firstName,
        middleName: crewMember?.middleName,
        surName: crewMember?.surName,
        weight: crewMember?.weight == null ? undefined : crewMember?.weight,
        licenseValidUntil: crewMember?.licenseValidUntil ? new Date(crewMember?.licenseValidUntil) : undefined,
        medicalCertificateValidUntil: crewMember?.medicalCertificateValidUntil
            ? new Date(crewMember?.medicalCertificateValidUntil)
            : undefined,
        languageProficiencyValidUntil: crewMember?.languageProficiencyValidUntil
            ? new Date(crewMember?.languageProficiencyValidUntil)
            : undefined,
        licensedRemotePilotedFlights: crewMember?.licensedRemotePilotedFlights ?? false,
        licensedPilotedFlights: crewMember?.licensedPilotedFlights ?? false,
        email: crewMember?.email ?? undefined,
        homeBase: {
            value: regions.find((region) => region.id === crewMember?.homeBase)?.id,
            label: regions.find((region) => region.id === crewMember?.homeBase)?.name,
        },
        roles: crewMemberData?.roleAssignments ?? [],
        validFrom: new Date(crewMember.validFrom),
        validTo: crewMember?.validTo ? new Date(crewMember?.validTo) : undefined,
        phoneNumber: crewMember?.phoneNumber,
        department: crewMember?.department,
        entryTime: crewMember?.entryTime,
        exitTime: crewMember?.exitTime,
        hrId: crewMember?.hrId,
    };

    const FormControl = createFormControl<typeof editCrewMemberSchema>();

    return {
        FormControl,
        crewMemberInitialValues,
        editCrewMemberSchema,
        isEditCrewMemberFieldName,
        version: crewMember?.version,
        baseValues,
        crewAssignmentObjects,
        crewRoles,
        init,
        rolesLoaded,
        crewAssignments: {
            crewAssignmentObjects,
            setCrewAssignmentsObjects,
            editModeActive,
            setEditMode,
            setCrewAssignmentsReverteObjects,
            revertPossible,
            setRevertPossible,
            crewAssignmentReverteObjects,
            setAssignmentIsComplete,
            assignmentIsComplete,
        },
    };
};
