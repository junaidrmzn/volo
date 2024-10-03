import { HStack, Spacer, Text, VStack } from "@volocopter/design-library-react";
import { P, match } from "ts-pattern";
import { ExpandableSelectableCard } from "@voloiq/flight-test-definition-components";
import { FtiParameterCard } from "./FtiParameterCard";
import { useFtiParametersEditFormTranslation } from "./translations/useFtiParametersEditFormTranslation";
import type { OnChangeFtiParameterSelection } from "./use-fti-parameter-edit-form/useOnChangeFtiParameterSelection";
import type { SelectableFtiParameters } from "./use-fti-parameter-edit-form/useSelectableFtiParameters";

export type SelectableWorkgroupCardProps = {
    workgroup: string;
    selectableFtiParameters: SelectableFtiParameters;
    onChangeFtiParameterSelection: OnChangeFtiParameterSelection;
};

export const SelectableWorkgroupCard = (props: SelectableWorkgroupCardProps) => {
    const { workgroup, selectableFtiParameters, onChangeFtiParameterSelection } = props;

    const { t } = useFtiParametersEditFormTranslation();

    const selectState = match(selectableFtiParameters)
        .with(P.array({ isSelected: true }), () => "selected" as const)
        .with(P.array({ isSelected: false }), () => "unselected" as const)
        .otherwise(() => "indeterminate" as const);

    return (
        <ExpandableSelectableCard
            isSelectable
            cardLabel={workgroup}
            checkboxLabel={
                selectState === "selected"
                    ? t("Unselect all {workgroup} FTI Parameters", { workgroup })
                    : t("Select all {workgroup} FTI Parameters", { workgroup })
            }
            selectState={selectState}
            onChange={(isSelected) =>
                onChangeFtiParameterSelection(
                    selectableFtiParameters.map((selectableFtiParameter) => ({
                        ftiParameterId: selectableFtiParameter.ftiParameter.id,
                        isSelected,
                    }))
                )
            }
        >
            <ExpandableSelectableCard.Title>
                <HStack>
                    <Text fontSize="sm" lineHeight={6}>
                        {workgroup}
                    </Text>
                    <Spacer />
                    <Text fontSize="sm" lineHeight={6}>
                        {selectableFtiParameters.length === 1
                            ? t("1 FTI Parameter")
                            : t("{numberOfFtiParameters} FTI Parameters", {
                                  numberOfFtiParameters: selectableFtiParameters.length,
                              })}{" "}
                        -{" "}
                        {t("{numberOfFtiParameters} selected", {
                            numberOfFtiParameters: selectableFtiParameters.filter(
                                (selectableFtiParameters) => selectableFtiParameters.isSelected
                            ).length,
                        })}
                    </Text>
                </HStack>
            </ExpandableSelectableCard.Title>
            <ExpandableSelectableCard.Content>
                <VStack spacing={1} alignItems="stretch">
                    {selectableFtiParameters.map((selectableFtiParameter) => (
                        <FtiParameterCard
                            key={selectableFtiParameter.ftiParameter.id}
                            ftiParameter={selectableFtiParameter.ftiParameter}
                            onChange={(isSelected) =>
                                onChangeFtiParameterSelection([
                                    { ftiParameterId: selectableFtiParameter.ftiParameter.id, isSelected },
                                ])
                            }
                            isSelected={selectableFtiParameter.isSelected}
                        />
                    ))}
                </VStack>
            </ExpandableSelectableCard.Content>
        </ExpandableSelectableCard>
    );
};
