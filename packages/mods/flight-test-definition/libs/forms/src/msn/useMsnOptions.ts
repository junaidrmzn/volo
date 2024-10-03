import type { MSNModel, MasterModel } from "@voloiq/flight-test-definition-api/v2";
import type { SelectOption } from "@voloiq/form";
import { useMsnTranslation } from "./translations/useMsnTranslation";

export const useMsnOptions = () => {
    const { t } = useMsnTranslation();

    const msnOptions: Record<MasterModel, SelectOption<MSNModel>[]> = {
        "2X": [
            { value: "01", label: t("MSN.2X.01") },
            { value: "02", label: t("MSN.2X.02") },
            { value: "03", label: t("MSN.2X.03") },
            { value: "04", label: t("MSN.2X.04") },
            { value: "05", label: t("MSN.2X.05") },
        ],
        "VC2-1": [
            { value: "B0-01", label: t("MSN.VC2-1.B0-01"), isDisabled: true },
            { value: "B0-02", label: t("MSN.VC2-1.B0-02"), isDisabled: true },
            {
                value: "MSN01",
                label: t("MSN.VC2-1.MSN01"),
            },
            {
                value: "MSN03",
                label: t("MSN.VC2-1.MSN03"),
            },
            {
                value: "MSN04",
                label: t("MSN.VC2-1.MSN04"),
            },
            {
                value: "MSN05",
                label: t("MSN.VC2-1.MSN05"),
            },
            {
                value: "MSN06",
                label: t("MSN.VC2-1.MSN06"),
            },
        ],
        VD150: [
            { value: "01", label: t("MSN.VD150.01") },
            { value: "02", label: t("MSN.VD150.02") },
        ],
        SIMX: [{ value: "MSN01", label: t("MSN.SIM.02") }],
        SIMZERO: [{ value: "MSN01", label: t("MSN.SIM.02") }],
    };

    return {
        msnOptions,
    };
};
