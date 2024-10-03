import { Button, HStack, Icon, Select, Text, Textarea, VStack } from "@volocopter/design-library-react";
import { add } from "date-fns";
import React, { useMemo } from "react";
import { useFormatDateTime } from "@voloiq/dates";
import { useForm } from "@voloiq/form";
import { useGetAllAircraftTypes } from "../../api-hooks/useCrewManagementService";
import { useGetCrewRoles } from "../../api-hooks/useCrewRoleService";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";
import type { CrewMemberAssignmentObject } from "../../types/CrewMemberAssignmentObject";
import { useCrewMemberCreateForm } from "./useCreateCrewMemberForm";

type CreateCrewMemberType = {
    crewAssignmentObjects: CrewMemberAssignmentObject[];
    setCrewAssignmentsReverteObjects: Function;
    setRevertPossible: Function;
    crewAssignmentReverteObjects: CrewMemberAssignmentObject[];
    setCrewAssignmentsObjects: Function;
    setAssignmentIsComplete: Function;
    setEditMode: Function;
    assignmentIsComplete: boolean;
    setCallBackAssignmentObject: Function;
};

const getValidToDate = (validFrom: string | undefined) => {
    if (validFrom) return add(new Date(validFrom), { years: 1 }).toISOString();
    return "";
};

export const useGetCreateAssignmentData = (props: CreateCrewMemberType) => {
    const {
        crewAssignmentObjects,
        setCrewAssignmentsReverteObjects,
        setRevertPossible,
        crewAssignmentReverteObjects,
        setCrewAssignmentsObjects,
        setAssignmentIsComplete,
        setEditMode,
        assignmentIsComplete,
        setCallBackAssignmentObject,
    } = props;

    const { FormControl } = useCrewMemberCreateForm();
    const { formatDateTime } = useFormatDateTime();
    const { t } = useCrewApiTranslation();
    const { setValue } = useForm();

    const { data: crewRoles } = useGetCrewRoles(1);
    const { data: aircraftTypes } = useGetAllAircraftTypes();
    const assignmentData = useMemo(() => {
        return [
            ...crewAssignmentObjects.map((assignmentObject) => {
                return {
                    role: (
                        <VStack justifyContent="space-between" align="flex-start" width="-moz-fit-content">
                            {assignmentObject.editMode && (
                                <div style={{ width: "16vh" }}>
                                    <Select
                                        name="Role"
                                        maxMenuHeight={180}
                                        placeholder="Role"
                                        onChange={(value) => {
                                            const newAssignment = crewAssignmentObjects[0];
                                            if (newAssignment !== undefined) {
                                                newAssignment.roleKey = value?.value.roleKey;
                                                newAssignment.description = value?.value.description;
                                                newAssignment.roleId = value?.value.id;
                                                newAssignment.acTypePossible =
                                                    value?.value.requiresAircraftType ?? false;
                                                const assignmentList = [newAssignment, ...crewAssignmentObjects];
                                                assignmentList.splice(1, 1);
                                                setCrewAssignmentsObjects(assignmentList);
                                                if (
                                                    newAssignment.roleKey !== undefined &&
                                                    newAssignment.validFrom !== undefined &&
                                                    (newAssignment.acTypeId !== undefined ||
                                                        !newAssignment.acTypePossible)
                                                ) {
                                                    setAssignmentIsComplete(true);
                                                } else setAssignmentIsComplete(false);
                                            }
                                        }}
                                        options={crewRoles.map((role) => {
                                            return {
                                                label: role.roleKey,
                                                value: role,
                                            };
                                        })}
                                    />
                                </div>
                            )}
                            {assignmentObject.roleKey !== undefined && !assignmentObject.editMode && (
                                <Text size="medium" fontWeight="medium">
                                    {" "}
                                    {assignmentObject.roleKey}{" "}
                                </Text>
                            )}
                        </VStack>
                    ),
                    description: (
                        <VStack justifyContent="space-evenly" width="-moz-fit-content">
                            <HStack justifyContent="space-evenly" width="-moz-fit-content">
                                {assignmentObject.description === undefined && (
                                    <Text size="medium" alignSelf="start" width="full" fontWeight="medium">
                                        N.A.
                                    </Text>
                                )}
                                {assignmentObject.description !== undefined &&
                                    assignmentObject.description.length >= 35 && (
                                        <Textarea value={`${assignmentObject.description}`} />
                                    )}
                                {assignmentObject.description !== undefined &&
                                    assignmentObject.description.length < 35 && (
                                        <Text size="medium" alignSelf="start" width="full" fontWeight="medium">
                                            {`${assignmentObject.description}`}
                                        </Text>
                                    )}{" "}
                            </HStack>
                        </VStack>
                    ),
                    actype: (
                        <VStack justifyContent="space-evenly" width="-moz-fit-content">
                            <HStack justifyContent="space-evenly" width="-moz-fit-content">
                                {assignmentObject.editMode && assignmentObject.acTypePossible && (
                                    <VStack>
                                        <div style={{ width: "16vh" }}>
                                            <Select
                                                name="AC"
                                                maxMenuHeight={180}
                                                placeholder="AC"
                                                onChange={(acType) => {
                                                    const newAssignment = crewAssignmentObjects[0];
                                                    if (newAssignment) {
                                                        newAssignment.acTypeId = acType?.value.id;
                                                        newAssignment.acTypeName = acType?.value.name;
                                                        const newAssignmentList = [
                                                            newAssignment,
                                                            ...crewAssignmentObjects,
                                                        ];
                                                        newAssignmentList.splice(1, 1);
                                                        setCrewAssignmentsObjects(newAssignmentList);
                                                        if (
                                                            newAssignment.roleKey !== undefined &&
                                                            newAssignment.validFrom !== undefined
                                                        ) {
                                                            setAssignmentIsComplete(true);
                                                        } else setAssignmentIsComplete(false);
                                                    }
                                                }}
                                                options={aircraftTypes.map((acType) => {
                                                    return {
                                                        label: acType.name,
                                                        value: acType,
                                                    };
                                                })}
                                            />
                                        </div>
                                    </VStack>
                                )}
                                {assignmentObject.acTypeId !== undefined &&
                                    assignmentObject.acTypeId !== null &&
                                    !assignmentObject.editMode && (
                                        <Text size="medium" fontWeight="medium">{`${
                                            aircraftTypes.find((acType) => acType.id === assignmentObject.acTypeId)
                                                ?.name ?? ""
                                        } `}</Text>
                                    )}
                            </HStack>
                        </VStack>
                    ),
                    valid: (
                        <VStack justifyContent="space-around" alignContent="center" width="-moz-fit-content">
                            {assignmentObject.editMode && (
                                <div style={{ width: "22vh" }}>
                                    <VStack justifyContent="space-around" align="flex-start" width="-moz-fit-content">
                                        <FormControl
                                            fieldName="validFromAssignment"
                                            showLabel={false}
                                            onClose={(newValue: unknown) => {
                                                const newAssignment = crewAssignmentObjects[0];
                                                if (newAssignment && newValue) {
                                                    newAssignment.validFrom = (newValue as Date).toISOString();
                                                    const newAssignmentList = [newAssignment, ...crewAssignmentObjects];
                                                    newAssignmentList.splice(1, 1);
                                                    setCrewAssignmentsObjects(newAssignmentList);
                                                    if (newAssignment.validFrom != null) {
                                                        setValue(
                                                            "validToAssignment",
                                                            newAssignment?.validTo ??
                                                                getValidToDate(newAssignment?.validFrom)
                                                        );
                                                    }
                                                    if (
                                                        newAssignment.roleKey != null &&
                                                        newAssignment.validFrom != null
                                                    ) {
                                                        setAssignmentIsComplete(true);
                                                    } else setAssignmentIsComplete(false);
                                                }
                                            }}
                                        />
                                        <div style={{ height: "2vh" }} />
                                        <FormControl
                                            fieldName="validToAssignment"
                                            showLabel={false}
                                            onClose={(newValue) => {
                                                const newAssignment = crewAssignmentObjects[0];
                                                if (newAssignment && newValue) {
                                                    newAssignment.validTo = (newValue as Date).toISOString();
                                                    const newAssignmentList = [newAssignment, ...crewAssignmentObjects];
                                                    newAssignmentList.splice(1, 1);
                                                    setCrewAssignmentsObjects(newAssignmentList);
                                                    if (
                                                        newAssignment.roleKey != null &&
                                                        newAssignment.validFrom != null
                                                    ) {
                                                        setAssignmentIsComplete(true);
                                                    } else setAssignmentIsComplete(false);
                                                }
                                            }}
                                        />
                                    </VStack>
                                </div>
                            )}
                            <VStack justifyContent="space-around" align="flex-start" width="-moz-fit-content">
                                {!assignmentObject.editMode && (
                                    <Text size="medium" fontWeight="medium" alignSelf="start" width="full">
                                        {assignmentObject.validFrom !== undefined
                                            ? formatDateTime(assignmentObject.validFrom)
                                            : ""}
                                    </Text>
                                )}
                                {!assignmentObject.editMode && (
                                    <Text size="medium" fontWeight="medium" alignSelf="start" width="full">
                                        {assignmentObject.validTo !== undefined &&
                                            formatDateTime(assignmentObject.validTo)}
                                    </Text>
                                )}
                            </VStack>
                        </VStack>
                    ),
                    selection: (
                        <VStack
                            justifyContent="space-evenly"
                            align="flex-start"
                            width="-moz-fit-content"
                            alignItems="end"
                        >
                            {assignmentObject.editMode && (
                                <Button
                                    title={t("crewMember.button.check")}
                                    isDisabled={!assignmentIsComplete}
                                    onClick={() => {
                                        setEditMode(false);
                                        const newAssignment = crewAssignmentObjects[0];
                                        if (newAssignment !== undefined) {
                                            newAssignment.editMode = false;
                                            if (newAssignment.validTo === "" || newAssignment.validTo === undefined) {
                                                newAssignment.validTo = getValidToDate(
                                                    crewAssignmentObjects[0]?.validFrom
                                                );
                                            }
                                            const newAssignmentList = [newAssignment, ...crewAssignmentObjects];
                                            newAssignmentList.splice(1, 1);
                                            setCrewAssignmentsObjects(newAssignmentList);
                                            setCallBackAssignmentObject(newAssignmentList);
                                            setAssignmentIsComplete(false);
                                        }
                                    }}
                                >
                                    <Icon icon="check" size={6} />
                                </Button>
                            )}
                            <Button
                                title={t("crewMember.button.delete")}
                                onClick={() => {
                                    const newAssignmentList = [...crewAssignmentObjects];
                                    newAssignmentList.splice(crewAssignmentObjects.indexOf(assignmentObject), 1);
                                    setCrewAssignmentsObjects(newAssignmentList);

                                    const revertList = [assignmentObject, ...crewAssignmentReverteObjects];
                                    setCrewAssignmentsReverteObjects(revertList);
                                    setRevertPossible(true);
                                }}
                            >
                                <Icon icon="trash" size={6} />
                            </Button>
                        </VStack>
                    ),
                    edit: null,
                };
            }),
            {
                role: <div style={{ height: "10vh" }} />,
                description: <></>,
                valid: <></>,
                selection: <></>,
                edit: null,
            },
        ];
    }, [
        crewAssignmentObjects,
        crewRoles,
        aircraftTypes,
        FormControl,
        formatDateTime,
        t,
        assignmentIsComplete,
        setCrewAssignmentsObjects,
        setAssignmentIsComplete,
        setValue,
        setEditMode,
        setCallBackAssignmentObject,
        crewAssignmentReverteObjects,
        setCrewAssignmentsReverteObjects,
        setRevertPossible,
    ]);

    return assignmentData;
};
