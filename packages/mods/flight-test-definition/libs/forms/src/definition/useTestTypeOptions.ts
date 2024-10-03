import { TestTypeEnum } from "@voloiq-typescript-api/ftd-types";
import { useDefinitionFormTranslation } from "./translations/useDefinitionFormTranslation";

export const useTestTypeOptions = () => {
    const { t } = useDefinitionFormTranslation();

    return {
        testTypeOptions: [
            { label: t("Test Type.Ground"), value: TestTypeEnum.GROUND },
            { label: t("Test Type.Flight"), value: TestTypeEnum.FLIGHT },
        ],
    };
};
