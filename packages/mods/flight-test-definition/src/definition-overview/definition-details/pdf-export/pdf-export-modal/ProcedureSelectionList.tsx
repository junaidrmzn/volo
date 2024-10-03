import { Button, HStack, Icon, Text, VStack } from "@volocopter/design-library-react";
import type { ProcedureRead } from "@voloiq/flight-test-definition-api/v1";
import { ActionsPopoverButton, ProcedureIdentifier, SelectableCard } from "@voloiq/flight-test-definition-components";
import { usePdfExportModalTranslation } from "./translations/usePdfExportModalTranslation";

export type ProcedureSelectionListProps = {
    selectAllProcedures: () => void;
    clearAllProcedures: () => void;
    proceduresWithSelection: (ProcedureRead & { isSelected: boolean })[];
    onSelectProcedure: (procedureId: string, isSelected: boolean) => void;
};

export const ProcedureSelectionList = (props: ProcedureSelectionListProps) => {
    const { clearAllProcedures, onSelectProcedure, proceduresWithSelection, selectAllProcedures } = props;

    const { t } = usePdfExportModalTranslation();

    return (
        <VStack width="full" alignItems="stretch">
            <HStack>
                <Text flex={1} fontSize="sm" lineHeight={6} fontWeight="bold">
                    {t("Selected Procedures ({procedureCount})", {
                        procedureCount: proceduresWithSelection.filter(
                            (procedureWithSelection) => procedureWithSelection.isSelected
                        ).length,
                    })}
                </Text>
                <ActionsPopoverButton
                    renderActionButtons={(onClosePopover) => (
                        <VStack spacing={3} alignItems="start">
                            <Button
                                variant="ghost"
                                size="md"
                                leftIcon={<Icon icon="edit" size={4} />}
                                onClick={() => {
                                    selectAllProcedures();
                                    onClosePopover();
                                }}
                            >
                                {t("Select All")}
                            </Button>
                            <Button
                                variant="ghost"
                                size="md"
                                leftIcon={<Icon icon="xMark" size={4} />}
                                onClick={() => {
                                    clearAllProcedures();
                                    onClosePopover();
                                }}
                            >
                                {t("Clear All")}
                            </Button>
                        </VStack>
                    )}
                />
            </HStack>
            <VStack alignItems="stretch">
                {proceduresWithSelection.map((procedureWithSelection, index) => (
                    <SelectableCard
                        key={procedureWithSelection.id}
                        isSelected={procedureWithSelection.isSelected}
                        onSelect={(isSelected) => onSelectProcedure(procedureWithSelection.id, isSelected)}
                        checkboxLabel={t("Select Procedure {procedureId}", {
                            procedureId: procedureWithSelection.procedureId,
                        })}
                    >
                        <ProcedureIdentifier {...procedureWithSelection} procedureIndex={index + 1} />
                    </SelectableCard>
                ))}
            </VStack>
        </VStack>
    );
};
