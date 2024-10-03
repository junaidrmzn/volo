import type { ValidationStatus, ValueWithStatus } from "@volocopter/tag-select-react";
import type { ParameterValidation, ParameterValidationResponse } from "@voloiq-typescript-api/fti-types";
import { useCallback, useEffect, useState } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useAxiosService } from "@voloiq/service";

export type FtiCodeWithStatus = {
    ftiCode: string;
    status: ValidationStatus;
};

export const useFtiCodesValidation = (options: {
    startDate: string;
}): {
    setFtiCodesWithStatus: (
        value: ((previousState: ValueWithStatus[]) => ValueWithStatus[]) | ValueWithStatus[]
    ) => void;
    resetAllFtiCodesWithStatus: () => void;
    ftiCodesWithStatus: ValueWithStatus[];
} => {
    const { startDate } = options;
    const { axiosPost } = useAxiosService();
    const [ftiCodesWithStatus, setFtiCodesWithStatus] = useState<ValueWithStatus[]>([]);
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const validateFtiCode = useCallback(
        (startDate: string, ftiCode: string) => {
            const path = `/instrumentation-parameters/validate`;
            const baseURL = `${BACKEND_BASE_URL}/ftd/v1`;

            return axiosPost<ParameterValidationResponse, ParameterValidation>({
                path,
                baseURL,
                data: { ftiCode, startDate },
            })
                .then((result) => result.data?.valid ?? false)
                .catch(() => false);
        },
        [axiosPost, isFeatureFlagEnabled]
    );

    const updateFtiCodeWithStatus = (ftiCode: string, status: ValidationStatus) => {
        setFtiCodesWithStatus((previousState) =>
            previousState.map((ftiCodeWithStatus) =>
                ftiCodeWithStatus.value === ftiCode ? { ...ftiCodeWithStatus, status } : ftiCodeWithStatus
            )
        );
    };

    const resetAllFtiCodesWithStatus = () => setFtiCodesWithStatus([]);

    useEffect(() => {
        for (const ftiCodeWithStatus of ftiCodesWithStatus.filter(
            (ftiCodeWithStatus) => ftiCodeWithStatus.status === "unknown"
        )) {
            updateFtiCodeWithStatus(ftiCodeWithStatus.value, "validating");
            validateFtiCode(startDate, ftiCodeWithStatus.value).then((isValid) =>
                updateFtiCodeWithStatus(ftiCodeWithStatus.value, isValid ? "valid" : "invalid")
            );
        }
    }, [startDate, validateFtiCode, ftiCodesWithStatus]);

    return {
        ftiCodesWithStatus,
        resetAllFtiCodesWithStatus,
        setFtiCodesWithStatus,
    };
};
