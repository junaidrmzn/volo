/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Esu } from "@voloiq-typescript-api/battery-management-types";
import { match } from "ts-pattern";

// eslint-disable-next-line no-restricted-syntax
export enum TagColor {
    Teal = "teal",
    WarningSubtle = "warning-subtle",
    ErrorSubtle = "error-subtle",
}

export const useDetermineBatteryEsuTagColor = (assignedEsus: Esu[], totalEsuNumber: number | undefined) => {
    const numberOfAssignedEsus = assignedEsus.length;
    const hasNoEsusAssigned = numberOfAssignedEsus === 0;
    const hasNotAllEsusAssigned = numberOfAssignedEsus < totalEsuNumber!;
    const allEsusAssigned = numberOfAssignedEsus === totalEsuNumber;
    const esuColor: TagColor = match({})
        .when(
            () => hasNoEsusAssigned,
            () => TagColor.ErrorSubtle
        )
        .when(
            () => hasNotAllEsusAssigned,
            () => TagColor.WarningSubtle
        )
        .when(
            () => allEsusAssigned,
            () => TagColor.Teal
        )
        .otherwise(() => TagColor.ErrorSubtle);
    return { esuColor };
};
