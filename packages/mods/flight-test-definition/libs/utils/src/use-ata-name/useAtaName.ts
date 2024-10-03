import { match } from "ts-pattern";
import { isTranslationKey, useAtaNameTranslation } from "./translations/useAtaNameTranslation";

export const useAtaName = () => {
    const { t } = useAtaNameTranslation();
    const mapAtaToSystemName = (ata: number) =>
        match(`${ata}`)
            .when(isTranslationKey, (ata) => t(ata))
            .otherwise(() => t("Unknown"));

    return { mapAtaToSystemName };
};
