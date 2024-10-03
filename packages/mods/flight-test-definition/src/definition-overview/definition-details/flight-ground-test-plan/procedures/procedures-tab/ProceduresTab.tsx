import { Tab } from "@volocopter/design-library-react";
import { useProceduresTabTranslation } from "./translations/useproceduresTabTranslation";

export type ProceduresTabProps = {
    proceduresCount?: number;
};

export const ProceduresTab = (props: ProceduresTabProps) => {
    const { proceduresCount } = props;
    const { t } = useProceduresTabTranslation();

    return (
        <Tab>
            {t("Procedures")}
            {proceduresCount !== undefined && ` (${proceduresCount})`}
        </Tab>
    );
};
