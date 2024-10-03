import type { MassAndBalancePoint } from "@voloiq-typescript-api/aircraft-management-types";
import { useState } from "react";

export const useMassAndBalancePoints = () => {
    const [massAndBalancePoints, setMassAndBalancePoints] = useState<(MassAndBalancePoint & { editMode: boolean })[]>(
        []
    );
    const [massAndBalanceDisplayPoints, setMassAndBalanceDisplayPoints] = useState<{ kg: string; m: string }[]>([]);

    const handleDelete = (index: number) => {
        const newMassAndBalancePoints = [...massAndBalancePoints];
        newMassAndBalancePoints.splice(index, 1);
        setMassAndBalancePoints(newMassAndBalancePoints);
    };

    const toggleEditMode = (index: number) => {
        const newMassAndBalancePoints = [...massAndBalancePoints];
        const displayPoints: { kg: string; m: string }[] = massAndBalancePoints.map((point) => {
            return { kg: point.kg.toString(), m: point.m.toString() };
        });
        setMassAndBalanceDisplayPoints(displayPoints);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        newMassAndBalancePoints[index]!.editMode = !newMassAndBalancePoints[index]!.editMode;
        setMassAndBalancePoints(newMassAndBalancePoints);
    };

    const handleChange = (index: number, massAndBalancePoint: MassAndBalancePoint) => {
        const newMassAndBalancePoints = [...massAndBalancePoints];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        newMassAndBalancePoints[index] = { ...newMassAndBalancePoints[index]!, ...massAndBalancePoint };
        setMassAndBalancePoints(newMassAndBalancePoints);
    };

    const handleAdd = () => {
        setMassAndBalancePoints([
            {
                m: 0,
                kg: 0,
                editMode: true,
            },
            ...massAndBalancePoints,
        ]);
        setMassAndBalanceDisplayPoints([
            {
                kg: "",
                m: "",
            },
            ...massAndBalanceDisplayPoints,
        ]);
    };

    return {
        massAndBalancePoints,
        massAndBalanceDisplayPoints,
        setMassAndBalancePoints,
        handleDelete,
        toggleEditMode,
        handleChange,
        handleAdd,
    };
};
