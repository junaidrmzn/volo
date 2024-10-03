import type { MassAndBalanceData } from "@voloiq-typescript-api/aircraft-management-types";
import { useEffect, useState } from "react";

export const useMassAndBalanceDataTable = (massAndBalanceData: MassAndBalanceData) => {
    const [mbData, setMbData] = useState(massAndBalanceData);
    const [mtomDisplayValue, setMtomDisplayValue] = useState(massAndBalanceData.mtom.toString());
    const [bemDisplayValue, setBemDisplayValue] = useState(massAndBalanceData.bem.toString());

    useEffect(() => {
        if (!massAndBalanceData) {
            return;
        }
        setMbData(massAndBalanceData);
    }, [massAndBalanceData]);

    return { mbData, setMbData, mtomDisplayValue, setMtomDisplayValue, bemDisplayValue, setBemDisplayValue };
};
