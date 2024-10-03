import { Button, FormControl, FormLabel, HStack, Icon, VStack } from "@volocopter/design-library-react";
import { DirectionUnitInput, DirectionValueWithUnit } from "@volocopter/unit-inputs-react";
import { useMemo } from "react";
import { Table } from "@voloiq/table";
import type { ApproachDirection } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";
import { useApproachDirectionsTable } from "./useApproachDirectionsTable";

type ApproachDirectionsTableProps = {
    heading: string;
    approachDirections: (ApproachDirection & { editMode: boolean })[];
    approachDirectionsDisplayValues: {
        direction: string;
    }[];
    onAdd: () => void;
    onCheck: (index: number) => void;
    onDelete: (index: number) => void;
    onChange: (index: number, approachDirections: ApproachDirection) => void;
};

export const ApproachDirectionsTable = (props: ApproachDirectionsTableProps) => {
    const { heading, approachDirections, onAdd, onChange, onCheck, onDelete, approachDirectionsDisplayValues } = props;
    const { t } = useVertiportTranslation();
    const { isValidApproachDirection } = useApproachDirectionsTable({ approachDirections });
    const columns = [
        {
            Header: `${heading}:*`,
            accessor: "approachDirections",
            id: "approachDirections",
        },
        {
            Header: (
                <HStack justifyContent="flex-end" width="100%">
                    <Button title={t("buttons.addApproachDirection")} onClick={onAdd}>
                        <Icon icon="add" size={6} />
                    </Button>
                </HStack>
            ),
            accessor: "selection",
            id: "selection",
        },
    ];

    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    const approachDirectionRows = useMemo(() => {
        const rows = approachDirections.map((approachDirection, index) => {
            if (!approachDirection.editMode) {
                return {
                    approachDirections: (
                        <HStack>
                            <DirectionValueWithUnit
                                displayUnit="degree"
                                baseUnit="radian"
                                baseValue={approachDirection.direction}
                            />
                        </HStack>
                    ),
                    selection: (
                        <VStack justifyContent="space-evenly" align="flex-start" width="100%" alignItems="end">
                            <Button title={t("buttons.editApproachDirection")} onClick={() => onCheck(index)}>
                                <Icon icon="edit" size={6} />
                            </Button>
                            <Button
                                title={t("buttons.deleteApproachDirection")}
                                isDisabled={approachDirections.length <= 1}
                                onClick={() => onDelete(index)}
                            >
                                <Icon icon="trash" size={6} />
                            </Button>
                        </VStack>
                    ),
                };
            }

            return {
                approachDirections: (
                    <HStack>
                        <FormControl>
                            <FormLabel>{t("vertiport.model.direction")}:*</FormLabel>
                            <DirectionUnitInput
                                value={approachDirectionsDisplayValues[index]?.direction}
                                onChange={(direction) => {
                                    if (approachDirectionsDisplayValues[index]) {
                                        approachDirectionsDisplayValues[index] = {
                                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                            ...approachDirectionsDisplayValues[index]!,
                                            direction,
                                        };
                                    }
                                }}
                                displayUnit="degree"
                                baseUnit="radian"
                                defaultBaseValue={approachDirection.direction}
                                onBaseValueChange={(_direction, direction) => {
                                    const data = { ...approachDirection, direction };
                                    onChange(index, data);
                                }}
                            />
                        </FormControl>
                    </HStack>
                ),
                selection: (
                    <VStack justifyContent="space-evenly" align="flex-start" width="100%" alignItems="end">
                        <Button
                            title={t("buttons.checkApproachDirection")}
                            onClick={() => onCheck(index)}
                            isDisabled={!isValidApproachDirection(index)}
                        >
                            <Icon icon="check" size={6} />
                        </Button>
                        <Button
                            title={t("buttons.deleteApproachDirection")}
                            isDisabled={approachDirections.length <= 1}
                            onClick={() => onDelete(index)}
                        >
                            <Icon icon="trash" size={6} />
                        </Button>
                    </VStack>
                ),
            };
        });

        return rows;
    }, [approachDirections, approachDirectionsDisplayValues, isValidApproachDirection, onChange, onCheck, onDelete, t]);

    return <Table columns={columns} data={approachDirectionRows} />;
};
