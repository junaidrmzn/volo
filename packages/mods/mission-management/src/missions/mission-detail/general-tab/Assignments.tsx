import { Flex, HStack, Text } from "@volocopter/design-library-react";
import { TechnicalStatus } from "@voloiq-typescript-api/aircraft-management-types";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { InfoCard, Section } from "@voloiq/network-scheduling-components";
import { getPilotName } from "../../mission-list-item/getPilotName";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { ActionPopover } from "./ActionPopover";

type AssignmentsProps = {
    mission: Mission;
    onReloadList: () => void;
    onRedirectToResource: (url: string) => void;
};

export const Assignments = (props: AssignmentsProps) => {
    const { mission, onRedirectToResource, onReloadList } = props;
    const { assignments } = mission;
    const { t } = useMissionTranslations();
    const assignedPilot = {
        pilotFirstName: assignments?.pilotFirstName,
        pilotMiddleName: assignments?.pilotMiddleName,
        pilotSurName: assignments?.pilotSurName,
    };
    return (
        <Section
            headerLabel={t("Assignments")}
            bodyContent={
                <>
                    <Flex width="100%" gap={3} alignItems="flex-start">
                        <HStack width="50%">
                            <InfoCard
                                headerLabel={t("aircraft")}
                                tagLabel={
                                    assignments?.aircraftId ? assignments?.aircraftTechnicalStatus : t("noAssignment")
                                }
                                tagType={
                                    assignments?.aircraftTechnicalStatus === TechnicalStatus.SERVICEABLE
                                        ? "normal"
                                        : "error"
                                }
                                actions={
                                    <ActionPopover
                                        type="aircraft"
                                        mission={mission}
                                        onReloadList={onReloadList}
                                        {...(assignments?.aircraftId && {
                                            onRedirectToResource: () =>
                                                onRedirectToResource(
                                                    `/aircraft-management/aircraft/overview/${assignments?.aircraftId}`
                                                ),
                                        })}
                                    />
                                }
                                bodyContent={
                                    <Text fontSize="xs">
                                        {assignments?.aircraftId
                                            ? `${assignments?.aircraftTypeName} • MSN ${assignments?.aircraftMSN}${
                                                  assignments?.aircraftRegistration
                                                      ? ` • ${assignments?.aircraftRegistration}`
                                                      : ""
                                              }`
                                            : t("noAssignment")}
                                    </Text>
                                }
                            />
                        </HStack>
                        <HStack width="50%">
                            <InfoCard
                                headerLabel={t("battery")}
                                bodyContent={
                                    <Text fontSize="xs">
                                        {assignments?.batteryId ? assignments.batteryName : t("noAssignment")}
                                    </Text>
                                }
                            />
                        </HStack>
                    </Flex>
                    <Flex width="100%" gap={3} alignItems="flex-start">
                        <HStack width="50%">
                            <InfoCard
                                headerLabel={t("pilot")}
                                tagLabel={assignments?.pilotId ? t("FTL.ftlChecked") : t("resourceCards.notAssigned")}
                                tagType={assignments?.pilotId ? "normal" : "error"}
                                actions={
                                    <ActionPopover
                                        type="pilot"
                                        mission={mission}
                                        onReloadList={onReloadList}
                                        {...(assignments?.pilotId && {
                                            onRedirectToResource: () =>
                                                onRedirectToResource(
                                                    `/crew-management/crewmember/overview/${assignments?.pilotId}`
                                                ),
                                        })}
                                    />
                                }
                                bodyContent={
                                    <Text fontSize="xs">
                                        {assignments?.pilotId ? getPilotName(assignedPilot) : t("noAssignment")}
                                    </Text>
                                }
                            />
                        </HStack>
                        <HStack width="50%">
                            <InfoCard
                                headerLabel={t("crewMember")}
                                actions={
                                    <ActionPopover type="crewMember" mission={mission} onReloadList={onReloadList} />
                                }
                                bodyContent={
                                    <Text fontSize="xs">
                                        {assignments?.crewMemberAssignments &&
                                        assignments?.crewMemberAssignments?.length > 0
                                            ? `${t("crewMembers")}: ${assignments?.crewMemberAssignments?.length}`
                                            : t("noAssignment")}
                                    </Text>
                                }
                            />
                        </HStack>
                    </Flex>
                </>
            }
        />
    );
};
