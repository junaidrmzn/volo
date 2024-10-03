import { masterModels } from "@voloiq/flight-test-definition-api/v2";
import { useMasterModelTranslation } from "./translations/useMasterModelTranslation";

export const useMasterModelOptions = () => {
    const { t } = useMasterModelTranslation();
    const masterModelOptions = masterModels.map((model) => ({
        label: t(`Master Model.${model}`),
        value: model,
    }));
    return {
        masterModelOptions,
    };
};
