import { Box, Button, HStack, Icon, Text } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import type { FormControlProps } from "@voloiq/form";
import { Table } from "@voloiq/table";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";
import type { CrewMemberAssignmentObject } from "../../types/CrewMemberAssignmentObject";
import { useCrewAssignments } from "../hooks/useCrewAssignments";
import type { CreateCrewMemberSchema } from "./useCreateCrewMemberForm";
import { useGetCreateAssignmentData } from "./useGetCreateAssignmentData";

type CreateCrewMemberType = {
    setCallBackAssignmentObject: Function;
    FormControl: (props: FormControlProps<CreateCrewMemberSchema>) => ReactElement | null;
};

export const CreateCrewMemberFormFields = (props: CreateCrewMemberType) => {
    const { setCallBackAssignmentObject, FormControl } = props;
    const {
        crewAssignmentObjects,
        setCrewAssignmentsObjects,
        editModeActive,
        setEditMode,
        crewAssignmentReverteObjects,
        setCrewAssignmentsReverteObjects,
        revertPossible,
        setRevertPossible,
        setAssignmentIsComplete,
        assignmentIsComplete,
    } = useCrewAssignments([]);
    const { t } = useCrewApiTranslation();

    const assignmentData = useGetCreateAssignmentData({
        crewAssignmentObjects,
        setCrewAssignmentsObjects,
        setEditMode,
        crewAssignmentReverteObjects,
        setCrewAssignmentsReverteObjects,
        setRevertPossible,
        setAssignmentIsComplete,
        assignmentIsComplete,
        setCallBackAssignmentObject,
    });

    return (
        <>
            <FormControl fieldName="firstName" additionalInfo={t("crewMember.additionalInfo.firstName")} />
            <FormControl fieldName="surName" additionalInfo={t("crewMember.additionalInfo.lastName")} />
            <FormControl fieldName="homeBase" additionalInfo={t("crewMember.additionalInfo.homebase")} />
            <FormControl fieldName="weight" additionalInfo={t("crewMember.additionalInfo.weight")} />
            <FormControl
                fieldName="licenseValidUntil"
                additionalInfo={t("crewMember.additionalInfo.licenseIsValidUntil")}
            />
            <FormControl fieldName="medicalCertificateValidUntil" />
            <FormControl fieldName="languageProficiencyValidUntil" />
            <FormControl fieldName="licensedRemotePilotedFlights" />
            <FormControl fieldName="licensedPilotedFlights" />
            <FormControl fieldName="email" additionalInfo={t("crewMember.additionalInfo.email")} />
            <FormControl fieldName="phoneNumber" />
            <FormControl fieldName="validFrom" />
            <FormControl fieldName="validTo" />
            <Text size="medium" lineHeight="short" fontWeight="medium" paddingTop={5} alignSelf="start">
                Role assignment:
            </Text>

            <Box
                display="flex-grow"
                flexDirection="row"
                width="100%"
                padding={1}
                backgroundColor="-moz-initial"
                borderRadius={10}
            >
                <Table
                    columns={[
                        {
                            Header: (
                                <Text size="medium" lineHeight="short" fontWeight="bold">
                                    Role
                                </Text>
                            ),
                            accessor: "role",
                            id: "roleKey",
                        },
                        {
                            Header: (
                                <HStack justifyContent="space-around" width="100%">
                                    <div>
                                        <Text size="medium" lineHeight="short" fontWeight="bold">
                                            Description
                                        </Text>
                                    </div>
                                </HStack>
                            ),
                            accessor: "description",
                            id: "description",
                        },
                        {
                            Header: (
                                <HStack justifyContent="space-around" width="100%">
                                    <div>
                                        <Text size="medium" lineHeight="short" fontWeight="bold">
                                            Aircraft Type
                                        </Text>
                                    </div>
                                </HStack>
                            ),
                            accessor: "actype",
                            id: "actype",
                        },
                        {
                            Header: (
                                <HStack justifyContent="space-around" width="100%">
                                    <div>
                                        <Text size="medium" lineHeight="short" fontWeight="bold">
                                            Assignment
                                        </Text>
                                        <Text size="medium" lineHeight="short" fontWeight="bold">
                                            valid from / to
                                        </Text>
                                    </div>
                                </HStack>
                            ),
                            accessor: "valid",
                            id: "valid",
                        },
                        {
                            Header: (
                                <HStack justifyContent="flex-end" width="100%">
                                    <Button
                                        title={t("crewMember.button.add")}
                                        marginRight={2}
                                        isDisabled={editModeActive}
                                        onClick={() => {
                                            if (!editModeActive) {
                                                setEditMode(true);
                                                const newAssignmentList: CrewMemberAssignmentObject[] = [
                                                    {
                                                        acTypeId: undefined,
                                                        memberId: undefined,
                                                        description: undefined,
                                                        roleId: undefined,
                                                        roleKey: undefined,
                                                        validFrom: undefined,
                                                        validTo: undefined,
                                                        acTypePossible: undefined,
                                                        editMode: true,
                                                    },
                                                    ...crewAssignmentObjects,
                                                ];
                                                if (newAssignmentList[0] !== undefined) {
                                                    setCrewAssignmentsObjects(newAssignmentList);
                                                }
                                            }
                                        }}
                                    >
                                        <Icon icon="add" size={6} />
                                    </Button>
                                    <Button
                                        title={t("crewMember.button.revert")}
                                        marginRight={2}
                                        isDisabled={!revertPossible}
                                        onClick={() => {
                                            if (crewAssignmentReverteObjects[0]) {
                                                const revertedList = [
                                                    crewAssignmentReverteObjects[0],
                                                    ...crewAssignmentObjects,
                                                ];
                                                setCrewAssignmentsObjects(revertedList);
                                            }

                                            const reducedRevertList = crewAssignmentReverteObjects.slice(1);
                                            setCrewAssignmentsReverteObjects(reducedRevertList);
                                            if (reducedRevertList.length === 0) setRevertPossible(false);
                                        }}
                                    >
                                        <Icon icon="repeat" size={6} />
                                    </Button>
                                </HStack>
                            ),
                            accessor: "selection",
                            id: "selection",
                        },
                    ]}
                    data={assignmentData}
                />
            </Box>
        </>
    );
};
