import { Box, Button, Divider, Grid, HStack, Icon, Select, Text, VStack } from "@volocopter/design-library-react";
import type { ParameterGroup } from "@voloiq/flight-test-definition-api/v1";
import { FilterBar } from "@voloiq/flight-test-definition-components";
import type { SelectOption } from "@voloiq/form";
import type { SelectableWorkgroupCardProps } from "./SelectableWorkgroupCard";
import { SelectableWorkgroupCard } from "./SelectableWorkgroupCard";
import type { SelectedWorkgroupSectionProps } from "./SelectedWorkgroupSection";
import { SelectedWorkgroupSection } from "./SelectedWorkgroupSection";
import { useGetFilterBarProperties } from "./filter-properties/useGetFilterBarProperties";
import type { SaveParameterGroupPopoverProps } from "./save-parameter-group-popover/SaveParameterGroupPopover";
import { SaveParameterGroupPopover } from "./save-parameter-group-popover/SaveParameterGroupPopover";
import { useFtiParametersEditFormTranslation } from "./translations/useFtiParametersEditFormTranslation";
import { useFtiWorkgroups } from "./useFtiWorkgroups";

export type FtiParametersEditFormProps = {
    onSearchInputFieldChange: (search: string) => void;
    parameterGroups: ParameterGroup[];
    onDeleteParameterGroup: (data?: SelectOption | null) => void;
    onChangeGroupSelect: (data?: SelectOption | null) => void;
    selectedParameterGroup?: SelectOption | null;
} & SaveParameterGroupPopoverProps &
    Pick<SelectedWorkgroupSectionProps, "selectedFtiParameters" | "onChangeFtiParameterEssentiality"> &
    Pick<SelectableWorkgroupCardProps, "onChangeFtiParameterSelection" | "selectableFtiParameters">;

export const FtiParametersEditForm = (props: FtiParametersEditFormProps) => {
    const {
        onSearchInputFieldChange,
        selectedFtiParameters,
        selectableFtiParameters,
        onChangeFtiParameterSelection,
        onChangeFtiParameterEssentiality,
        parameterGroups,
        onSaveParameterGroup,
        onDeleteParameterGroup,
        onChangeGroupSelect,
        selectedParameterGroup,
    } = props;
    const { t } = useFtiParametersEditFormTranslation();
    const { ftiWorkgroups } = useFtiWorkgroups({
        ftiParameterList: selectableFtiParameters,
    });
    const { ftiWorkgroups: selectedFtiWorkgroups } = useFtiWorkgroups({
        ftiParameterList: selectedFtiParameters,
    });

    const { properties } = useGetFilterBarProperties();

    return (
        <Grid boxSize="full" gap={3} gridTemplateColumns="1fr auto 1fr">
            <VStack spacing={5} alignItems="stretch" flexGrow={1} overflowY="scroll">
                <Text fontSize="sm" fontWeight="bold" lineHeight={6} color="blue400Mono600">
                    {t("All")}
                </Text>
                {/* Box wrapper is used to prevent the top expanded card moving behind the FilterBar */}
                <Box>
                    <FilterBar properties={properties} onFilterChange={onSearchInputFieldChange} />
                </Box>
                <VStack alignItems="stretch">
                    {ftiWorkgroups.length > 0 ? (
                        ftiWorkgroups.map(([workgroup, selectableFtiParameters]) => (
                            <SelectableWorkgroupCard
                                key={workgroup}
                                workgroup={workgroup}
                                selectableFtiParameters={selectableFtiParameters}
                                onChangeFtiParameterSelection={onChangeFtiParameterSelection}
                            />
                        ))
                    ) : (
                        <Text
                            p={2}
                            textAlign="center"
                            fontSize="sm"
                            lineHeight={6}
                            backgroundColor="gray100Gray900"
                            borderRadius="sm"
                        >
                            {t("Search for FTI Code, Aircraft Type, Aircraft Zone, Short Description, or Workgroup")}
                        </Text>
                    )}
                </VStack>
            </VStack>
            <Box borderRightWidth="0.125rem" borderColor="gray300Gray800" my={1} />
            <VStack spacing={5} alignItems="stretch" flexGrow={1}>
                <Text fontSize="sm" fontWeight="bold" lineHeight={6} color="blue400Mono600">
                    {t("Selected ({numberOfSelectedParameters})", {
                        numberOfSelectedParameters: selectedFtiParameters.length,
                    })}
                </Text>
                <Select
                    options={parameterGroups.map((parameterGroup) => ({
                        label: parameterGroup.name,
                        value: parameterGroup.id,
                    }))}
                    onChange={onChangeGroupSelect}
                    value={selectedParameterGroup}
                    placeholder={t("Select from the parameter group")}
                    aria-label={t("Parameter group select")}
                />
                <HStack gap={5} justifyContent="end">
                    <Button
                        variant="ghost"
                        leftIcon={<Icon icon="delete" />}
                        isDisabled={!selectedParameterGroup}
                        onClick={() => selectedParameterGroup && onDeleteParameterGroup(selectedParameterGroup)}
                    >
                        Delete Parameter Group
                    </Button>
                    <SaveParameterGroupPopover onSaveParameterGroup={onSaveParameterGroup}>
                        <Button variant="ghost" leftIcon={<Icon icon="plus" />}>
                            Save as Parameter Group
                        </Button>
                    </SaveParameterGroupPopover>
                </HStack>
                <Divider />
                <VStack alignItems="stretch">
                    {selectedFtiWorkgroups.length > 0 ? (
                        selectedFtiWorkgroups.map(([workgroup, selectedFtiParameters]) => (
                            <SelectedWorkgroupSection
                                key={workgroup}
                                workgroup={workgroup}
                                selectedFtiParameters={selectedFtiParameters}
                                onChangeFtiParameterEssentiality={onChangeFtiParameterEssentiality}
                                onUnselectFtiParameter={(id) => {
                                    onChangeFtiParameterSelection([{ ftiParameterId: id, isSelected: false }]);
                                }}
                            />
                        ))
                    ) : (
                        <Text
                            p={2}
                            textAlign="center"
                            fontSize="sm"
                            lineHeight={6}
                            backgroundColor="gray100Gray900"
                            borderRadius="sm"
                        >
                            {t("No FTI Parameters selected")}
                        </Text>
                    )}
                </VStack>
            </VStack>
        </Grid>
    );
};
