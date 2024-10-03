import { Tag } from "@volocopter/design-library-react";
import { TechnicalStatus } from "@voloiq-typescript-api/aircraft-management-types";
import { match } from "ts-pattern";
import { useAircraftListItemTranslation } from "./translations/useAircraftListItemTranslation";

export type TechnicalStatusTagProps = {
    technicalStatus: TechnicalStatus;
};
export const TechnicalStatusTag = (props: TechnicalStatusTagProps) => {
    const { technicalStatus } = props;

    const { t } = useAircraftListItemTranslation();

    return match(technicalStatus)
        .with(TechnicalStatus.SERVICEABLE, () => <Tag colorScheme="teal">{t("serviceable")}</Tag>)
        .with(TechnicalStatus.SERVICEABLE_WITH_LIMITATIONS, () => (
            <Tag colorScheme="warning-subtle">{t("limited")}</Tag>
        ))
        .with(TechnicalStatus.UNSERVICEABLE, () => <Tag colorScheme="error-subtle">{t("unserviceable")}</Tag>)
        .exhaustive();
};
