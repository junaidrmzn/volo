import type { InputProps } from "@volocopter/design-library-react";
import { Box, Flex, Input, Pill } from "@volocopter/design-library-react";
import { useExportModalTranslation } from "../translations/useExportModalTranslation";
import type { FtiCodeWithStatus } from "./useFtiCodesValidation";

export type ParameterInputProps = {
    ftiCodesWithStatus: FtiCodeWithStatus[];
    deleteFtiCodeWithStatus: (ftiCode: string) => void;
} & InputProps;

export const ParameterInput = (props: ParameterInputProps) => {
    const { ftiCodesWithStatus, deleteFtiCodeWithStatus, ...inputProps } = props;

    const { t } = useExportModalTranslation();

    const validationColorCodes = {
        unknown: "warning",
        validating: "loading",
        valid: "solid",
        invalid: "error",
    } as const;

    return (
        <Flex flexWrap="wrap" alignItems="center" gap={2} aria-label={t("parameterInput.ariaLabel")}>
            {ftiCodesWithStatus.map((ftiCodeWithStatus) => (
                <Pill
                    key={ftiCodeWithStatus.ftiCode}
                    variant={validationColorCodes[ftiCodeWithStatus.status]}
                    aria-invalid={ftiCodeWithStatus.status === "invalid" ? true : undefined}
                    aria-busy={ftiCodeWithStatus.status === "validating" ? true : undefined}
                    aria-label={t(`parameterInput.validationStatus.${ftiCodeWithStatus.status}`, {
                        ftiCode: ftiCodeWithStatus.ftiCode,
                    })}
                >
                    {ftiCodeWithStatus.ftiCode}
                    <Pill.PillCloseButton onClick={() => deleteFtiCodeWithStatus(ftiCodeWithStatus.ftiCode)} />
                </Pill>
            ))}

            <Box flexGrow={1}>
                <Input placeholder={t("parameterInput.placeholder")} id="parameterInput" {...inputProps} />
            </Box>
        </Flex>
    );
};
