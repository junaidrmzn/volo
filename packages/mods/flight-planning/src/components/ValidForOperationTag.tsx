import { Tag } from "@volocopter/design-library-react";
import { useFlightPlanningTranslation } from "../translations";

type ValidForOperationTagProps = {
    validForOperation?: boolean;
};

export const ValidForOperationTag = (props: ValidForOperationTagProps) => {
    const { validForOperation } = props;
    const { t } = useFlightPlanningTranslation();
    if (validForOperation) return <Tag colorscheme="teal">{t("routeOption.metaInfo.valid")}</Tag>;
    return <Tag colorScheme="error">{t("routeOption.metaInfo.invalid")}</Tag>;
};
