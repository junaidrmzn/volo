import { Box, ExpandableCard, FormControl, Text, Textarea } from "@volocopter/design-library-react";
import type { WindchillRequirement } from "@voloiq/flight-test-definition-api/v1";
import type { WindchillSelectableRequirementListItemProps } from "./WindchillSelectableRequirementListItem";
import { WindchillSelectableRequirementListItem } from "./WindchillSelectableRequirementListItem";
import { useWindchillRequirementsModalTranslation } from "./translations/useWindchillRequirementsModalTranslation";

type WindchillSelectedRequirementListItemProps = WindchillSelectableRequirementListItemProps & {
    onChangePassOrFailCriteria: (
        requirementId: WindchillRequirement["id"],
        passOrFailCriteria: WindchillRequirement["passOrFailCriteria"]
    ) => void;
    getPassOrFailCriteria: (requirementId: WindchillRequirement["id"]) => WindchillRequirement["passOrFailCriteria"];
};

export const WindchillSelectedRequirementListItem = (props: WindchillSelectedRequirementListItemProps) => {
    const { requirement, onChangePassOrFailCriteria, getPassOrFailCriteria, ...selectableWindchillRequirementProps } =
        props;
    const { t } = useWindchillRequirementsModalTranslation();

    return (
        <WindchillSelectableRequirementListItem {...selectableWindchillRequirementProps} requirement={requirement}>
            <Box w="full" flex={1} pb={1}>
                <ExpandableCard cardLabel={t("Pass / Fail Criteria")}>
                    <ExpandableCard.Title>
                        <Text textAlign="start" fontSize="small">
                            {t("Pass / Fail Criteria")}
                        </Text>
                    </ExpandableCard.Title>
                    <ExpandableCard.Content>
                        <FormControl>
                            <Textarea
                                placeholder={t("Pass / Fail Criteria")}
                                w="full"
                                value={getPassOrFailCriteria(requirement.id)}
                                height="1rem"
                                onChange={(event) => onChangePassOrFailCriteria(requirement.id, event.target.value)}
                                aria-label={t(
                                    "Assigned Windchill Requirement {documentId}-{windchillId} Pass/Fail Criteria",
                                    {
                                        documentId: requirement.documentId,
                                        windchillId: requirement.windchillId,
                                    }
                                )}
                            />
                        </FormControl>
                    </ExpandableCard.Content>
                </ExpandableCard>
            </Box>
        </WindchillSelectableRequirementListItem>
    );
};
