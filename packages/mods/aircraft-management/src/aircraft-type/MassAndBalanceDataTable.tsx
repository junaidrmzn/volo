import { FormControl, FormLabel, NumberInput } from "@volocopter/design-library-react";
import { WeightUnitInput } from "@volocopter/unit-inputs-react";
import type { MassAndBalanceData } from "@voloiq-typescript-api/aircraft-management-types";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";
import { useMassAndBalanceDataTable } from "./useMassAndBalanceDataTable";

type MassAndBalanceDataTableProps = {
    massAndBalanceData: MassAndBalanceData;
    onChange: (massAndBalanceData: MassAndBalanceData) => void;
    isDisabled?: boolean;
};

export const MassAndBalanceDataTable = (props: MassAndBalanceDataTableProps) => {
    const { massAndBalanceData, onChange, isDisabled } = props;

    const { t } = useResourcesTranslation();
    const { mbData, setMbData, mtomDisplayValue, setMtomDisplayValue, bemDisplayValue, setBemDisplayValue } =
        useMassAndBalanceDataTable(massAndBalanceData);
    return (
        <>
            <FormControl>
                <FormLabel>{t("aircraft-type.model.massAndBalanceData cgPosition x")}:*</FormLabel>
                <NumberInput
                    value={massAndBalanceData?.cgPosition?.x}
                    onChange={(x) => {
                        const data = { ...mbData, cgPosition: { ...mbData?.cgPosition, x: x as unknown as number } };
                        setMbData(data);
                        onChange(data);
                    }}
                    isRequired
                    isDisabled={isDisabled}
                    placeholder="cg position x"
                />
            </FormControl>
            <FormControl>
                <FormLabel>{t("aircraft-type.model.massAndBalanceData cgPosition y")}:*</FormLabel>
                <NumberInput
                    value={mbData?.cgPosition?.y}
                    onChange={(y) => {
                        const data = { ...mbData, cgPosition: { ...mbData.cgPosition, y: y as unknown as number } };
                        setMbData(data);
                        onChange(data);
                    }}
                    isRequired
                    isDisabled={isDisabled}
                    placeholder="cg position y"
                />
            </FormControl>
            <FormControl>
                <FormLabel>{t("aircraft-type.model.massAndBalanceData bem")}:*</FormLabel>
                <WeightUnitInput
                    value={bemDisplayValue}
                    onChange={setBemDisplayValue}
                    displayUnit="kg"
                    baseUnit="kg"
                    defaultBaseValue={mbData.bem}
                    onBaseValueChange={(bem) => {
                        const data = { ...mbData, bem: bem as unknown as number };
                        onChange(data);
                    }}
                    isDisabled={isDisabled}
                />
            </FormControl>
            <FormControl>
                <FormLabel>{t("aircraft-type.model.massAndBalanceData mtom")}:*</FormLabel>
                <WeightUnitInput
                    value={mtomDisplayValue}
                    onChange={setMtomDisplayValue}
                    displayUnit="kg"
                    baseUnit="kg"
                    defaultBaseValue={mbData.mtom}
                    onBaseValueChange={(mtom) => {
                        const data = { ...mbData, mtom: mtom as unknown as number };
                        onChange(data);
                    }}
                    isDisabled={isDisabled}
                />
            </FormControl>
        </>
    );
};
