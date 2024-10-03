import { Flex, HStack, Tag, Text, VStack } from "@volocopter/design-library-react";
import type { CrewMemberWithNames } from "@voloiq-typescript-api/crew-api-types";
import type { ReactElement } from "react";
import { CardListItem } from "@voloiq/card-list-item";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { IdentifierStack, TextWithLabel } from "@voloiq/text-layouts";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";

export type CrewMemberListItemProps = {
    crewMember: CrewMemberWithNames;
} & CardListItemProps;

export const CrewMemberListItem = (props: CrewMemberListItemProps) => {
    const { crewMember, onClick, isSelected } = props;
    const { t } = useCrewApiTranslation();
    const roleList: (ReactElement | null)[] = [];
    const numberOfAssignments: number = crewMember.roleAssignments == null ? 0 : crewMember.roleAssignments?.length;
    if (crewMember.roleAssignments?.length === 0) {
        roleList.push(<Text size="medium">{`${"-"}`}</Text>);
    } else {
        for (let index = 0; index < numberOfAssignments; index++) {
            if (crewMember.roleAssignments !== undefined && crewMember.roleAssignments[index] !== undefined)
                roleList.push(<Text size="medium">{`${crewMember.roleAssignments[index]?.toString() ?? "-"}`}</Text>);
        }
    }

    return (
        <CardListItem onClick={onClick!} isSelected={isSelected} ariaLabel={crewMember.id}>
            <CardListItem.Identifier>
                <IdentifierStack
                    mainIdentifier={crewMember.surName ?? "-"}
                    secondaryIdentifier={crewMember.firstName}
                />
            </CardListItem.Identifier>
            <CardListItem.AdditionalContent>
                <HStack justifyContent="space-evenly" align="flex-start">
                    <VStack spacing={1} align="flex-start" alignSelf="center">
                        <Text size="small" lineHeight="double" fontWeight="bold">
                            {t("crewMember.model.roles")}
                        </Text>
                        {roleList}
                    </VStack>
                </HStack>
            </CardListItem.AdditionalContent>
            <CardListItem.Status>
                <Flex>
                    <HStack justifyContent="flex-start" width="50%">
                        <TextWithLabel label={t("crewMember.model.homeBase")} text={crewMember.homebaseName} />
                    </HStack>
                    {crewMember.synchronizedWithLeon && (
                        <HStack justifyContent="flex-end" width="50%">
                            <Tag colorScheme="info-subtle">
                                <Tag.Label variant="light">{t("leon")}</Tag.Label>
                            </Tag>
                        </HStack>
                    )}
                </Flex>
            </CardListItem.Status>
        </CardListItem>
    );
};
