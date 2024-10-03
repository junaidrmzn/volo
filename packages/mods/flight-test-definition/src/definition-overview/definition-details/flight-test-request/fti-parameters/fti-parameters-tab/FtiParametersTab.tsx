import { Tab } from "@volocopter/design-library-react";
import { useFtiParametersTabTranslation } from "./translations/useFtiParametersTabTranslation";

export type FtiParametersTabProps = {
    ftiParametersCount?: number;
};

export const FtiParametersTab = (props: FtiParametersTabProps) => {
    const { ftiParametersCount } = props;
    const { t } = useFtiParametersTabTranslation();

    return (
        <Tab>
            {t("FTI Parameters")}
            {ftiParametersCount !== undefined && ` (${ftiParametersCount})`}
        </Tab>
    );
};
