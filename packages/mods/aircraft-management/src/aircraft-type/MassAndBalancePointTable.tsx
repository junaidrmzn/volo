import { Button, FormControl, FormLabel, HStack, Icon, VStack } from "@volocopter/design-library-react";
import {
    MomentUnitInput,
    MomentValueWithUnit,
    WeightUnitInput,
    WeightValueWithUnit,
} from "@volocopter/unit-inputs-react";
import type { MassAndBalancePoint } from "@voloiq-typescript-api/aircraft-management-types";
import { useCallback, useMemo } from "react";
import { Table } from "@voloiq/table";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";
import { isNumber } from "./utils/number";

type MassAndBalancePointTableProps = {
    heading: string;
    massAndBalancePoints: (MassAndBalancePoint & { editMode: boolean })[];
    massAndBalanceDisplayPoints: { kg: string; m: string }[];
    onAdd: () => void;
    onCheck: (index: number) => void;
    onDelete: (index: number) => void;
    onChange: (index: number, massAndBalancePoint: MassAndBalancePoint) => void;
    isDisabled?: boolean;
};

export const MassAndBalancePointTable = (props: MassAndBalancePointTableProps) => {
    const {
        heading,
        massAndBalancePoints,
        onAdd,
        onChange,
        onCheck,
        onDelete,
        isDisabled,
        massAndBalanceDisplayPoints,
    } = props;

    const { t } = useResourcesTranslation();

    const columns = [
        {
            Header: `${heading}:*`,
            accessor: "cgEnvelopePoints",
            id: "cgEnvelopePoints",
        },
        {
            Header: (
                <HStack justifyContent="flex-end" width="100%">
                    <Button title={t("generic.add button")} onClick={onAdd} isDisabled={isDisabled}>
                        <Icon icon="add" size={6} />
                    </Button>
                </HStack>
            ),
            accessor: "selection",
            id: "selection",
        },
    ];

    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    const isValidMassAndBalancePoint = useCallback(
        (index: number) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return isNumber(massAndBalancePoints[index]!.m ?? "") && isNumber(massAndBalancePoints[index]!.kg ?? "");
        },
        [massAndBalancePoints]
    );

    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    const massAndBalancePointRows = useMemo(() => {
        const rows = massAndBalancePoints.map((point, index) => {
            if (!point.editMode) {
                return {
                    cgEnvelopePoints: (
                        <HStack>
                            <MomentValueWithUnit baseUnit="kgm²" displayUnit="kgm²" baseValue={point?.m} />
                            <WeightValueWithUnit baseUnit="kg" displayUnit="kg" baseValue={point?.kg} />
                        </HStack>
                    ),
                    selection: (
                        <VStack justifyContent="space-evenly" align="flex-start" width="100%" alignItems="end">
                            <Button
                                title={t("generic.edit button")}
                                onClick={() => onCheck(index)}
                                isDisabled={isDisabled}
                            >
                                <Icon icon="edit" size={6} />
                            </Button>
                            <Button
                                title={t("generic.delete button")}
                                onClick={() => onDelete(index)}
                                isDisabled={isDisabled}
                            >
                                <Icon icon="trash" size={6} />
                            </Button>
                        </VStack>
                    ),
                };
            }

            return {
                cgEnvelopePoints: (
                    <HStack>
                        <FormControl>
                            <FormLabel>{t("aircraft-type.model.massAndBalanceData m")}:*</FormLabel>
                            <MomentUnitInput
                                value={massAndBalanceDisplayPoints[index]?.m}
                                onChange={(m) => {
                                    if (massAndBalanceDisplayPoints[index]) {
                                        massAndBalanceDisplayPoints[index] = {
                                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                            ...massAndBalanceDisplayPoints[index]!,
                                            m,
                                        };
                                    }
                                }}
                                displayUnit="kgm²"
                                baseUnit="kgm²"
                                defaultBaseValue={point.m}
                                onBaseValueChange={(m) => {
                                    const data = { ...point, m: m as unknown as number };
                                    onChange(index, data);
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>{t("aircraft-type.model.massAndBalanceData kg")}:*</FormLabel>
                            <WeightUnitInput
                                value={massAndBalanceDisplayPoints[index]?.kg}
                                onChange={(kg) => {
                                    if (massAndBalanceDisplayPoints[index]) {
                                        massAndBalanceDisplayPoints[index] = {
                                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                            ...massAndBalanceDisplayPoints[index]!,
                                            kg,
                                        };
                                    }
                                }}
                                displayUnit="kg"
                                baseUnit="kg"
                                defaultBaseValue={point.kg}
                                onBaseValueChange={(kg) => {
                                    const data = { ...point, kg: kg as unknown as number };
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
                            isDisabled={!isValidMassAndBalancePoint(index) || isDisabled}
                        >
                            <Icon icon="check" size={6} />
                        </Button>
                        <Button
                            title={t("generic.delete button")}
                            onClick={() => onDelete(index)}
                            isDisabled={isDisabled}
                        >
                            <Icon icon="trash" size={6} />
                        </Button>
                    </VStack>
                ),
            };
        });

        return rows;
    }, [
        massAndBalancePoints,
        t,
        massAndBalanceDisplayPoints,
        isValidMassAndBalancePoint,
        isDisabled,
        onCheck,
        onDelete,
        onChange,
    ]);

    return <Table columns={columns} data={massAndBalancePointRows} />;
};
