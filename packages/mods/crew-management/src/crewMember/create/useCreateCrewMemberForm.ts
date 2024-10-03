import type { Region } from "@voloiq-typescript-api/vertiport-management-types";
import { useMemo } from "react";
import { useFormatDateTime } from "@voloiq/dates";
import type { FieldName } from "@voloiq/form";
import { boolean, createFormControl, datetime, object, select, string, unit } from "@voloiq/form";
import { useGetAllRegionsOptions } from "../../api-hooks/useCrewManagementService";
import type { ResourcesTranslationFunction } from "../../translations/useCrewApiTranslation";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";
import { CrewMemberAssignmentObject } from "../../types/CrewMemberAssignmentObject";
import { useUnitBaseValues } from "./useUnitBaseValues";
import type { UnitBaseValues } from "./useUnitBaseValues";

const createCrewMemberSchemaFactory = (
    t: ResourcesTranslationFunction,
    regions: Region[],
    baseValues: UnitBaseValues,
    handleBaseValueUpdate: (key: keyof UnitBaseValues, value: string) => void,
    formatDateTime: Function,
    crewAssignments: CrewMemberAssignmentObject[]
) => {
    const validFrom = new Date();
    validFrom.setHours(validFrom.getUTCHours() + 1);
    validFrom.setMinutes(validFrom.getMinutes());
    validFrom.setSeconds(0);
    validFrom.setMilliseconds(0);

    return object({
        firstName: string()
            .required(t("generic.required error"))
            .max(100, t("generic.maxLength error"))
            .min(0, t("generic.minLength error"))
            .label(t("crewMember.model.firstName")),
        surName: string()
            .required(t("generic.required error"))
            .max(100, t("generic.maxLength error"))
            .min(0, t("generic.minLength error"))
            .label(t("crewMember.model.surName")),
        homeBase: select({
            placeholder: t("generic.dropdown placeholder"),
            options: regions.map((region) => ({
                label: region.name,
                value: region.id,
            })),
            errorMessage: t("generic.dropdown error"),
        }).label(t("crewMember.model.homeBase")),
        weight: unit({
            baseUnit: "kg",
            unitType: "weight",
            defaultBaseValue: baseValues.weight,
            onChangeBaseValue: (value: string) => {
                handleBaseValueUpdate("weight", value);
            },
        })
            .max(200, t("generic.maxNumber error"))
            .min(40, t("generic.minNumber error"))
            .label(t("crewMember.model.weight")),
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
                return true;
            }),
        email: string()
            .matches(
                /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/
            )
            .max(200, t("generic.maxLength error"))
            .min(0, t("generic.minLength error"))
            .label(t("crewMember.model.email"))
            .required(),
        phoneNumber: string().max(30, t("generic.maxLength error")).label(t("crewMember.model.phoneNumber")).nullable(),
        validToAssignment: datetime().label(t("crewMember.model.validTo")),
        validFromAssignment: datetime().label(t("crewMember.model.validFrom")),
        validFrom: datetime()
            .min(
                validFrom,
                t("generic.validFrom error", {
                    minValidFromDate: formatDateTime(validFrom),
                })
            )
            .label(t("crewMember.model.validFrom"))
            .required(),
        validTo: datetime()
            .when(
                "validFrom",
                (validFrom, yup) =>
                    validFrom &&
                    yup.min(
                        validFrom,
                        t("generic.validTo error", {
                            minValidToDate: formatDateTime(validFrom),
                        })
                    )
            )
            .label(t("crewMember.model.validTo")),
    });
};

export type CreateCrewMemberSchema = ReturnType<typeof createCrewMemberSchemaFactory>;

export const useCrewMemberCreateForm = (callBackAssignmentObject: CrewMemberAssignmentObject[] = []) => {
    const { t } = useCrewApiTranslation();
    const { data: regions } = useGetAllRegionsOptions();
    const { baseValues, handleBaseValueUpdate } = useUnitBaseValues();
    const { formatDateTime } = useFormatDateTime();

    const createCrewMemberSchema = useMemo(
        () =>
            createCrewMemberSchemaFactory(
                t,
                regions,
                baseValues,
                handleBaseValueUpdate,
                formatDateTime,
                callBackAssignmentObject
            ),
        [baseValues, handleBaseValueUpdate, regions, t, formatDateTime]
    );
    const isCreateCrewMemberFieldName = (attribute: unknown): attribute is FieldName<CreateCrewMemberSchema> =>
        Object.keys(createCrewMemberSchema.describe().fields).includes(attribute as FieldName<CreateCrewMemberSchema>);

    const FormControl = createFormControl<typeof createCrewMemberSchema>();
    return { FormControl, createCrewMemberSchema, isCreateCrewMemberFieldName, baseValues };
};
