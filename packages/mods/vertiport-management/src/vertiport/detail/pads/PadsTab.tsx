import { Tab } from "@volocopter/design-library-react";
import { useVertiportTranslation } from "../../../translations/useVertiportTranslation";
import { usePads } from "./pads-context/usePads";

export const PadsTab = () => {
    const { t } = useVertiportTranslation();
    const { padsCount } = usePads();
    return (
        <Tab>
            {t("detail.tabs.fatosStand")}
            {padsCount !== undefined && ` (${padsCount})`}
        </Tab>
    );
};
