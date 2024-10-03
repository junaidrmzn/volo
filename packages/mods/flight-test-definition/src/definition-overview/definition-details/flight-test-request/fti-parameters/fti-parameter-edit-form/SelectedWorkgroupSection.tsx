import { Button, HStack, Icon, Text, VStack } from "@volocopter/design-library-react";
import { ActionsPopoverButton } from "@voloiq/flight-test-definition-components";
import { FtiParameterCard } from "./FtiParameterCard";
import { useFtiParametersEditFormTranslation } from "./translations/useFtiParametersEditFormTranslation";
import type { OnChangeFtiParameterEssentiality } from "./use-fti-parameter-edit-form/useOnChangeFtiParameterEssentiality";
import type { SelectedFtiParameter } from "./use-fti-parameter-edit-form/useSelectedFtiParameters";

export type SelectedWorkgroupSectionProps = {
    workgroup: string;
    selectedFtiParameters: SelectedFtiParameter[];
    onUnselectFtiParameter: (id: string) => void;
    onChangeFtiParameterEssentiality: OnChangeFtiParameterEssentiality;
};

export const SelectedWorkgroupSection = (props: SelectedWorkgroupSectionProps) => {
    const { selectedFtiParameters, workgroup, onUnselectFtiParameter, onChangeFtiParameterEssentiality } = props;
    const { t } = useFtiParametersEditFormTranslation();

    const changeEssentialityForAllFtiParameters = (isEssential: boolean) =>
        onChangeFtiParameterEssentiality(
            selectedFtiParameters.map((selectedFtiParameter) => ({
                ftiParameterId: selectedFtiParameter.ftiParameter.id,
                isEssential,
            }))
        );

    return (
        <VStack key={workgroup} px={3} py={2} alignItems="stretch" bgColor="decorative1Muted" borderRadius="md">
            <HStack spacing={2} justify="space-between">
                <Text fontSize="sm" lineHeight={6}>
                    {workgroup}
                </Text>
                <ActionsPopoverButton
                    buttonLabel={t("Actions for {workgroup}", { workgroup })}
                    renderActionButtons={(onClosePopover) => (
                        <VStack spacing={3} alignItems="start">
                            <Button
                                variant="ghost"
                                size="md"
                                leftIcon={<Icon icon="alert" size={4} />}
                                onClick={() => {
                                    changeEssentialityForAllFtiParameters(true);
                                    onClosePopover();
                                }}
                            >
                                {t("Make all essential")}
                            </Button>
                            <Button
                                variant="ghost"
                                size="md"
                                leftIcon={<Icon icon="heart" size={4} />}
                                onClick={() => {
                                    changeEssentialityForAllFtiParameters(false);
                                    onClosePopover();
                                }}
                            >
                                {t("Make all desirable")}
                            </Button>
                        </VStack>
                    )}
                />
            </HStack>
            {selectedFtiParameters.map((selectedFtiParameter) => (
                <FtiParameterCard
                    key={selectedFtiParameter.ftiParameter.id}
                    ftiParameter={selectedFtiParameter.ftiParameter}
                    onChange={(isSelected) => {
                        if (!isSelected) {
                            onUnselectFtiParameter(selectedFtiParameter.ftiParameter.id);
                        }
                    }}
                    withEssentialToggle
                    isEssential={selectedFtiParameter.isEssential}
                    onToggleEssential={(isEssential) => {
                        onChangeFtiParameterEssentiality([
                            { ftiParameterId: selectedFtiParameter.ftiParameter.id, isEssential },
                        ]);
                    }}
                />
            ))}
        </VStack>
    );
};
