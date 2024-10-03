import { HStack, Text, VStack } from "@volocopter/design-library-react";
import type { CrewRole } from "@voloiq-typescript-api/crew-api-types";
import React from "react";
import { CardListItem } from "@voloiq/card-list-item";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { IdentifierStack } from "@voloiq/text-layouts";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";

export type CrewRoleListItemProps = {
    crewRole: CrewRole;
} & CardListItemProps;

export const CrewRoleListItem = (props: CrewRoleListItemProps) => {
    const { crewRole, onClick, isSelected } = props;
    const { t } = useCrewApiTranslation();

    return (
        <CardListItem key={crewRole.id} onClick={onClick!} isSelected={isSelected} ariaLabel={crewRole.roleKey}>
            <CardListItem.Identifier>
                <IdentifierStack mainIdentifier={crewRole.roleKey} />
            </CardListItem.Identifier>
            <CardListItem.AdditionalContent>
                <HStack justifyContent="space-evenly" align="flex-start">
                    <Text size="medium" fontWeight="bold" marginBottom={3}>
                        {crewRole.description ?? "-"}
                    </Text>
                </HStack>
            </CardListItem.AdditionalContent>
            <CardListItem.Status>
                <VStack spacing={1} align="flex-start">
                    <Text size="small" lineHeight="double" fontWeight="bold">
                        {t("crewRole.model.numberOfAssignments")}
                    </Text>
                    <Text size="medium">{crewRole.numberOfAssignments ?? 0}</Text>
                </VStack>
            </CardListItem.Status>
        </CardListItem>
    );
};
