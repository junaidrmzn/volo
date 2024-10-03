import { HStack, Spacer, Text, VStack } from "@volocopter/design-library-react";
import { ExpandableSelectableCard } from "@voloiq/flight-test-definition-components";
import { FtiParameterCard } from "./FtiParameterCard";
import { useFtiParametersTranslation } from "./translations/useFtiParametersTranslation";
import type { ResolvedFtiLink } from "./useFtiParametersPerWorkgroup";

export type FtiParameterWorkgroupCardProps = {
    workgroup: string;
    resolvedFtiLinks: ResolvedFtiLink[];
};

export const FtiParameterWorkgroupCard = (props: FtiParameterWorkgroupCardProps) => {
    const { workgroup, resolvedFtiLinks } = props;
    const { t } = useFtiParametersTranslation();

    const numberOfFtiParameters = resolvedFtiLinks.length;
    const numberOfEssentialFtiParameters = resolvedFtiLinks.filter(
        (resolvedFtiLink) => resolvedFtiLink.isEssential
    ).length;

    return (
        <ExpandableSelectableCard cardLabel={workgroup}>
            <ExpandableSelectableCard.Title>
                <HStack>
                    <Text fontSize="sm" lineHeight={6}>
                        {workgroup}
                    </Text>
                    <Spacer />
                    <Text fontSize="sm" lineHeight={6}>
                        {numberOfFtiParameters === 1
                            ? t("1 FTI Parameter")
                            : t("{numberOfFtiParameters} FTI Parameters", {
                                  numberOfFtiParameters,
                              })}{" "}
                        -{" "}
                        {t("{numberOfFtiParameters} essential", {
                            numberOfFtiParameters: numberOfEssentialFtiParameters,
                        })}
                    </Text>
                </HStack>
            </ExpandableSelectableCard.Title>
            <ExpandableSelectableCard.Content>
                <VStack spacing={2} alignItems="stretch">
                    {resolvedFtiLinks.map((resolvedFtiLink) => (
                        <FtiParameterCard
                            key={resolvedFtiLink.ftiParameter.id}
                            ftiParameter={resolvedFtiLink.ftiParameter}
                            isEssential={resolvedFtiLink.isEssential}
                        />
                    ))}
                </VStack>
            </ExpandableSelectableCard.Content>
        </ExpandableSelectableCard>
    );
};
