import { HStack, Spacer, VStack } from "@volocopter/design-library-react";
import React from "react";
import { IdentifierStack, TextWithLabel } from "@voloiq/text-layouts";
import { useCrewApiTranslation } from "../translations/useCrewApiTranslation";

export const PlaceholderLabel = () => {
    const { t } = useCrewApiTranslation();

    return (
        <VStack width="100%" p={4} columnGap={2} spacing={0} alignItems="flex-start">
            <VStack width="100%" alignItems="flex-start">
                <IdentifierStack mainIdentifier="-" secondaryIdentifier="-" />
                <Spacer />
            </VStack>
            <HStack boxSize="full" justifyContent="space-between">
                <TextWithLabel label={t("crewMember.model.roles")} text="-" />
                <TextWithLabel label={t("crewMember.model.homeBase")} text="-" />
            </HStack>
        </VStack>
    );
};
