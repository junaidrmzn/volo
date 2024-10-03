import { Button, FormControl, FormLabel, HStack, Icon, VStack } from "@volocopter/design-library-react";
import {
    DirectionUnitInput,
    DirectionValueWithUnit,
    EnergyUnitInput,
    EnergyValueWithUnit,
} from "@volocopter/unit-inputs-react";
import { useMemo } from "react";
import { Table } from "@voloiq/table";
import type { GoAroundEnergy } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";
import { useGoAroundEnergiesTable } from "./useGoAroundEnergiesTable";

type GoAroundEnergiesTableProps = {
    heading: string;
    goAroundEnergies: (GoAroundEnergy & { editMode: boolean })[];
    goAroundEnergiesDisplayValues: {
        direction: string;
        goAroundEnergy: string;
    }[];
    onAdd: () => void;
    onCheck: (index: number) => void;
    onDelete: (index: number) => void;
    onChange: (index: number, goAroundEnergies: GoAroundEnergy) => void;
};

export const GoAroundEnergiesTable = (props: GoAroundEnergiesTableProps) => {
    const { heading, goAroundEnergies, onAdd, onChange, onCheck, onDelete, goAroundEnergiesDisplayValues } = props;
    const { t } = useVertiportTranslation();
    const { isValidGoAroundEnergy } = useGoAroundEnergiesTable({ goAroundEnergies });
    const columns = [
        {
            Header: `${heading}:*`,
            accessor: "goAroundEnergies",
            id: "goAroundEnergies",
        },
        {
            Header: (
                <HStack justifyContent="flex-end" width="100%">
                    <Button title={t("generic.add button")} onClick={onAdd} isDisabled={goAroundEnergies.length >= 2}>
                        <Icon icon="add" size={6} />
                    </Button>
                </HStack>
            ),
            accessor: "selection",
            id: "selection",
        },
    ];

    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    const goAroundEnergyRows = useMemo(() => {
        const rows = goAroundEnergies.map((energy, index) => {
            if (!energy.editMode) {
                return {
                    goAroundEnergies: (
                        <HStack>
                            <DirectionValueWithUnit
                                displayUnit="degree"
                                baseUnit="radian"
                                baseValue={energy.direction}
                            />
                            <EnergyValueWithUnit displayUnit="kWh" baseUnit="kWh" baseValue={energy.goAroundEnergy} />
                        </HStack>
                    ),
                    selection: (
                        <VStack justifyContent="space-evenly" align="flex-start" width="100%" alignItems="end">
                            <Button title={t("generic.edit button")} onClick={() => onCheck(index)}>
                                <Icon icon="edit" size={6} />
                            </Button>
                            <Button
                                title={t("generic.delete button")}
                                isDisabled={goAroundEnergies.length <= 1}
                                onClick={() => onDelete(index)}
                            >
                                <Icon icon="trash" size={6} />
                            </Button>
                        </VStack>
                    ),
                };
            }

            return {
                goAroundEnergies: (
                    <HStack>
                        <FormControl>
                            <FormLabel>{t("vertiport.model.direction")}:*</FormLabel>
                            <DirectionUnitInput
                                value={goAroundEnergiesDisplayValues[index]?.direction}
                                onChange={(direction) => {
                                    if (goAroundEnergiesDisplayValues[index]) {
                                        goAroundEnergiesDisplayValues[index] = {
                                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                            ...goAroundEnergiesDisplayValues[index]!,
                                            direction,
                                        };
                                    }
                                }}
                                displayUnit="degree"
                                baseUnit="radian"
                                defaultBaseValue={energy.direction}
                                onBaseValueChange={(_direction, direction) => {
                                    const data = { ...energy, direction };
                                    onChange(index, data);
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>{t("vertiport.model.goAroundEnergy")}:*</FormLabel>
                            <EnergyUnitInput
                                value={goAroundEnergiesDisplayValues[index]?.goAroundEnergy}
                                onChange={(goAroundEnergy) => {
                                    if (goAroundEnergiesDisplayValues[index]) {
                                        goAroundEnergiesDisplayValues[index] = {
                                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                            ...goAroundEnergiesDisplayValues[index]!,
                                            goAroundEnergy,
                                        };
                                    }
                                }}
                                displayUnit="kWh"
                                baseUnit="kWh"
                                defaultBaseValue={energy.goAroundEnergy}
                                onBaseValueChange={(_goAroundEnergy, goAroundEnergy) => {
                                    const data = { ...energy, goAroundEnergy };
                                    onChange(index, data);
                                }}
                            />
                        </FormControl>
                    </HStack>
                ),
                selection: (
                    <VStack justifyContent="space-evenly" align="flex-start" width="100%" alignItems="end">
                        <Button
                            title={t("generic.create button")}
                            onClick={() => onCheck(index)}
                            isDisabled={!isValidGoAroundEnergy(index)}
                        >
                            <Icon icon="check" size={6} />
                        </Button>
                        <Button
                            title={t("generic.delete button")}
                            isDisabled={goAroundEnergies.length <= 1}
                            onClick={() => onDelete(index)}
                        >
                            <Icon icon="trash" size={6} />
                        </Button>
                    </VStack>
                ),
            };
        });

        return rows;
    }, [goAroundEnergies, goAroundEnergiesDisplayValues, isValidGoAroundEnergy, onChange, onCheck, onDelete, t]);

    return <Table columns={columns} data={goAroundEnergyRows} />;
};
