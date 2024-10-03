import { Grid, GridItem, HStack, Tag, Text } from "@volocopter/design-library-react";
import { CardListItem, CardListItemProps } from "@voloiq/card-list-item";
import { TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useTestHazardAssessmentUtils } from "../utils/useTestHazardAssessmentUtils";
import { useTestHazardAssessmentListTranslation } from "./translations/useTestHazardAssessmentListTranslation";

export type TestHazardListItemProps = CardListItemProps & {
    testHazards: TestHazardAssessment;
};

export const TestHazardAssessmentListItem = (props: TestHazardListItemProps) => {
    const { testHazards, ...cardListItemProps } = props;
    const { hazard, preMitigationRiskLevel, inactive, applicability } = testHazards;
    const { t } = useTestHazardAssessmentListTranslation();

    const { getTestHazardApplicability, getTestHazardLevel } = useTestHazardAssessmentUtils();

    return (
        <CardListItem {...cardListItemProps}>
            <CardListItem.Identifier>
                <Text fontWeight="bold" fontSize="sm" lineHeight="short">
                    {hazard}
                </Text>
            </CardListItem.Identifier>
            <CardListItem.AdditionalContent>
                <Grid boxSize="full" templateColumns="repeat(3, 1fr)" columnGap={6}>
                    <GridItem colStart={2}>
                        <TextWithLabel
                            size="small"
                            label={t("list.applicability")}
                            text={getTestHazardApplicability(applicability)}
                        />
                    </GridItem>
                    <GridItem>
                        <TextWithLabel
                            size="small"
                            label={t("list.risk-level-pre-mitigation")}
                            text={getTestHazardLevel(preMitigationRiskLevel)}
                        />
                    </GridItem>
                </Grid>
            </CardListItem.AdditionalContent>
            <CardListItem.Status>
                <HStack justifyContent="flex-end">
                    <Tag colorScheme={inactive ? "gray-subtle" : "blue-subtle"}>
                        {inactive ? t("inactive") : t("active")}
                    </Tag>
                </HStack>
            </CardListItem.Status>
        </CardListItem>
    );
};
