import { Box, HStack, Text, Textarea } from "@volocopter/design-library-react";
import type { CrewAssignment, CrewMemberWithNames } from "@voloiq-typescript-api/crew-api-types";
import { useFormatDateTime } from "@voloiq/dates";
import { Table } from "@voloiq/table";
import { useGetAllAircraftTypes } from "../../api-hooks/useCrewManagementService";
import { useGetCrewMemberWithAssignments } from "../../api-hooks/useCrewMemberService";
import { useGetCrewRoles } from "../../api-hooks/useCrewRoleService";

type CrewMemberDetailGeneralProps = {
    crewMember: CrewMemberWithNames;
};
export const CrewMemberDetailTabRoles = (props: CrewMemberDetailGeneralProps) => {
    const { crewMember } = props;
    const { data: crewRoles } = useGetCrewRoles(1);
    const { data: crewMemberData } = useGetCrewMemberWithAssignments(crewMember.id);
    const { formatDateTime } = useFormatDateTime();
    const { data: aircraftTypes } = useGetAllAircraftTypes();

    const crewAssignments = (crewMemberData?.roleAssignments ?? []).filter(
        (assignment) => typeof assignment !== "string"
    ) as unknown as CrewAssignment[];

    const crewRoleIds = new Set(crewAssignments.map((assignment) => assignment.crewRoleId));
    const temporaryCrewRoles = crewRoles.filter((crewRole) => crewRoleIds.has(crewRole.id));

    return (
        <Box>
            <Text size="medium" lineHeight="short" fontWeight="medium" paddingTop={5} alignSelf="start">
                Role selection:
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
                    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
                    columns={[
                        {
                            Header: "Role",
                            accessor: "role",
                            id: "roleKey",
                        },
                        {
                            Header: "Description",
                            accessor: "description",
                            id: "description",
                        },
                        {
                            Header: "Aircraft Type",
                            accessor: "aircraftType",
                            id: "aircraftType",
                        },
                        {
                            Header: "Valid From",
                            accessor: "validFrom",
                            id: "validFrom",
                        },
                        {
                            Header: "Valid To",
                            accessor: "validTo",
                            id: "validTo",
                        },
                    ]}
                    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
                    data={crewAssignments.map((crewAssignment) => {
                        const crewRole = temporaryCrewRoles.find((role) => role.id === crewAssignment.crewRoleId);
                        const aircraftType = aircraftTypes.find(
                            (aircraftType) => aircraftType.id === crewAssignment?.acTypeId
                        );

                        return {
                            role: <Text size="medium"> {crewRole?.roleKey} </Text>,
                            description: (
                                <HStack justifyContent="space-evenly" align="flex-start" width="-moz-fit-content">
                                    {(crewRole?.description.length || 0) >= 35 && (
                                        <Textarea value={crewRole?.description} />
                                    )}
                                    {(crewRole?.description.length || 0) < 35 && (
                                        <Text size="medium" alignSelf="start" width="full">
                                            {crewRole?.description}
                                        </Text>
                                    )}
                                    ,
                                </HStack>
                            ),
                            aircraftType: (
                                <HStack justifyContent="space-evenly" align="flex-start" width="-moz-fit-content">
                                    {(aircraftType?.name.length || 0) >= 35 && <Textarea value={aircraftType?.name} />}
                                    {(aircraftType?.name.length || 0) < 35 && (
                                        <Text size="medium" alignSelf="start" width="full">
                                            {aircraftType?.name}
                                        </Text>
                                    )}
                                    ,
                                </HStack>
                            ),
                            validFrom: (
                                <HStack justifyContent="space-evenly" align="flex-start" width="-moz-fit-content">
                                    {crewAssignment.validFrom.length >= 35 && (
                                        <Textarea value={formatDateTime(crewAssignment.validFrom)} />
                                    )}
                                    {crewAssignment.validFrom.length < 35 && (
                                        <Text size="medium" alignSelf="start" width="full">
                                            {formatDateTime(crewAssignment.validFrom)}
                                        </Text>
                                    )}
                                    ,
                                </HStack>
                            ),
                            validTo: (
                                <HStack justifyContent="space-evenly" align="flex-start" width="-moz-fit-content">
                                    {(crewAssignment?.validTo?.length || 0) >= 35 && (
                                        <Textarea
                                            value={
                                                crewAssignment.validTo != null
                                                    ? formatDateTime(crewAssignment.validTo)
                                                    : "-"
                                            }
                                        />
                                    )}
                                    {(crewAssignment?.validTo?.length || 0) < 35 && (
                                        <Text size="medium" alignSelf="start" width="full">
                                            {crewAssignment.validTo != null
                                                ? formatDateTime(crewAssignment.validTo)
                                                : "-"}
                                        </Text>
                                    )}
                                    ,
                                </HStack>
                            ),
                            edit: null,
                        };
                    })}
                />
            </Box>
        </Box>
    );
};
