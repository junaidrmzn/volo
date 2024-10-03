import { Tab } from "@volocopter/design-library-react";
import { useRequirementsTranslation } from "./translations/useRequirementsTranslation";

type RequirementsTabProps = {
    requirementsCount?: number;
};

export const RequirementsTab = (props: RequirementsTabProps) => {
    const { requirementsCount } = props;
    const { t } = useRequirementsTranslation();

    return (
        <Tab>
            {t("Requirements")}
            {requirementsCount !== undefined && ` (${requirementsCount})`}
        </Tab>
    );
};
