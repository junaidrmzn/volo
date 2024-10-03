import { Grid, HStack, Switch, Text } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import type { ApplicableRequirement } from "@voloiq-typescript-api/ftd-types";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useApplicableRequirementsSectionTranslation } from "./translations/useApplicableRequirementsSectionTranslation";

type WithSwitchProps = {
    withSwitch: true;
    onSwitchApplicableRequirement: (isEnabled: boolean) => void;
    isEnabled?: boolean;
};
type WithoutSwitchProps = {
    withSwitch?: never;
    onSwitchApplicableRequirement?: never;
    isEnabled?: never;
};

export type ApplicableRequirementCardProps = {
    applicableRequirement: ApplicableRequirement;
} & (WithSwitchProps | WithoutSwitchProps);

export const ApplicableRequirementCard = (props: ApplicableRequirementCardProps) => {
    const { applicableRequirement, onSwitchApplicableRequirement, withSwitch, isEnabled } = props;
    const { t } = useApplicableRequirementsSectionTranslation();
    const { content, passOrFailCriteria, title } = applicableRequirement;

    return (
        <Grid
            gap={6}
            gridTemplateColumns="200px 1fr 1fr"
            background="gray100Gray900"
            borderRadius="sm"
            p={3}
            alignItems="flex-start"
        >
            <HStack spacing={2} alignItems="flex-start">
                {withSwitch && (
                    <Switch
                        aria-label={
                            isEnabled
                                ? t("Disable {applicableRequirement}", { applicableRequirement: title })
                                : t("Enable {applicableRequirement}", { applicableRequirement: title })
                        }
                        isChecked={isEnabled}
                        onChange={(event) => onSwitchApplicableRequirement?.(event.target.checked)}
                    />
                )}
                <Text fontSize="sm" lineHeight={6} fontWeight="bold">
                    {title}
                </Text>
            </HStack>
            <TextWithLabel
                size="small"
                unknownValueText="-"
                label={t("Content")}
                text={<EditorTextDisplay document={content} />}
            />
            <TextWithLabel
                size="small"
                unknownValueText="-"
                label={t("Pass / Fail Criteria")}
                text={<EditorTextDisplay document={passOrFailCriteria} />}
            />
        </Grid>
    );
};
