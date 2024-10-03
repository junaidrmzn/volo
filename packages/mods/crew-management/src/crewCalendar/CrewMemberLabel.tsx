import { Button, HStack, Icon, IconButton, Spacer, VStack, useDisclosure } from "@volocopter/design-library-react";
import React from "react";
import { CrewMembersBlockingTimes } from "@voloiq/crew-management-api/v1";
import { IdentifierStack, TextWithLabel } from "@voloiq/text-layouts";
import { useCrewApiTranslation } from "../translations/useCrewApiTranslation";
import { AddEventModal } from "./events/modal/add-event";

export type CrewMemberLabelProps = {
    crewMember: CrewMembersBlockingTimes;
    onDiscard: () => void;
    refetchCrewMembersCalendars: () => void;
};
export const CrewMemberLabel = (props: CrewMemberLabelProps) => {
    const { crewMember, onDiscard, refetchCrewMembersCalendars } = props;
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { t } = useCrewApiTranslation();

    return (
        <VStack w="full">
            <HStack
                width="100%"
                p={3}
                spacing={2}
                justifyContent="center"
                alignItems="center"
                aria-label={crewMember.id}
            >
                <IconButton aria-label="Dirscard CrewMember" onClick={onDiscard} size="sm">
                    <Icon icon="close" size={3} />
                </IconButton>
                <Button variant="primary" size="sm" onClick={onOpen}>
                    {t("calendar.actionButtons.add")}
                </Button>
            </HStack>
            <VStack
                width="100%"
                p={3}
                mt={0}
                columnGap={2}
                spacing={0}
                alignItems="flex-start"
                aria-label={crewMember.surname}
            >
                <VStack width="100%" alignItems="flex-start">
                    <IdentifierStack mainIdentifier={crewMember.surname ?? "-"} secondaryIdentifier={crewMember.name} />
                    <Spacer />
                </VStack>
                <HStack boxSize="full" justifyContent="space-between">
                    <TextWithLabel
                        label={t("crewMember.model.roles")}
                        text={crewMember.roles ? crewMember.roles.toString() : "-"}
                    />
                    {crewMember.homeBase && (
                        <TextWithLabel label={t("crewMember.model.homeBase")} text={crewMember.homebaseName ?? "-"} />
                    )}
                </HStack>
            </VStack>
            <AddEventModal
                isOpen={isOpen}
                onClose={onClose}
                crewMemberId={crewMember.id}
                refetchCrewMembersCalendars={refetchCrewMembersCalendars}
            />
        </VStack>
    );
};
