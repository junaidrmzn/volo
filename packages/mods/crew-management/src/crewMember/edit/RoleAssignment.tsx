import { Box, Button, HStack, Icon, Text } from "@volocopter/design-library-react";
import { CrewRole } from "@voloiq-typescript-api/crew-api-types";
import type { ReactElement } from "react";
import type { FormControlProps } from "@voloiq/form";
import { Table } from "@voloiq/table";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";
import type { CrewMemberAssignmentObject } from "../../types/CrewMemberAssignmentObject";
import type { EditCrewMemberSchema } from "./useCrewMemberEditForm";
import { useGetEditAssignmentData } from "./useGetEditAssignmentData";

type RoleAssignmentProps = {
    FormControl: (props: FormControlProps<EditCrewMemberSchema>) => ReactElement | null;
    crewRoles: CrewRole[];
    crewAssignments: {
        crewAssignmentObjects: CrewMemberAssignmentObject[];
        setCrewAssignmentsReverteObjects: Function;
        setRevertPossible: Function;
        crewAssignmentReverteObjects: CrewMemberAssignmentObject[];
        setCrewAssignmentsObjects: Function;
        setAssignmentIsComplete: Function;
        setEditMode: Function;
        assignmentIsComplete: boolean;
        editModeActive: boolean;
        revertPossible: boolean;
    };
};

export const RoleAssignment = (props: RoleAssignmentProps) => {
    const { FormControl, crewRoles, crewAssignments } = props;
    const {
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
    } = crewAssignments;
    const { t } = useCrewApiTranslation();

    const assignmentData = useGetEditAssignmentData({
        crewAssignmentObjects,
        setCrewAssignmentsReverteObjects,
        setRevertPossible,
        crewAssignmentReverteObjects,
        setCrewAssignmentsObjects,
        setAssignmentIsComplete,
        setEditMode,
        assignmentIsComplete,
        FormControl,
        crewRoles,
    });

    return (
        <>
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
                                            Assignment is
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
