import type { MassAndBalanceData } from "@voloiq-typescript-api/aircraft-management-types";
import { useState } from "react";

export const useMassAndBalanceData = () => {
    const [massAndBalanceData, setMassAndBalanceData] = useState<MassAndBalanceData>({
        cgPosition: { x: 0, y: 0 },
        bem: 0,
        mtom: 0,
        longCgEnvelopePoints: [],
        latCgEnvelopePoints: [],
    });

    const handleChange = (data: MassAndBalanceData) => {
        setMassAndBalanceData(data);
    };

    return {
        massAndBalanceData,
        setMassAndBalanceData,
        handleChange,
    };
};
