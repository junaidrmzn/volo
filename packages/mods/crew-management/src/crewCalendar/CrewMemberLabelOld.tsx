import { HStack, Icon, IconButton, Spacer, VStack } from "@volocopter/design-library-react";
import type { CrewMembersBlockingTimes } from "@voloiq-typescript-api/crew-api-types";
import React from "react";
import { IdentifierStack, TextWithLabel } from "@voloiq/text-layouts";
import { useCrewApiTranslation } from "../translations/useCrewApiTranslation";

export type CrewMemberLabelProps = {
    crewMember: CrewMembersBlockingTimes;
    onDiscard: () => void;
};
export const CrewMemberLabelOld = (props: CrewMemberLabelProps) => {
    const { crewMember, onDiscard } = props;
    const { t } = useCrewApiTranslation();

    return (
        <>
            <VStack width="min" pt={2} pl={2} spacing={0} alignItems="flex-start" aria-label={crewMember.id}>
                <IconButton aria-label="Dirscard CrewMember" onClick={onDiscard} size="lg">
                    <Icon icon="close" size={4} />
                </IconButton>
            </VStack>
            <VStack
                width="100%"
                p={4}
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
        </>
    );
};
