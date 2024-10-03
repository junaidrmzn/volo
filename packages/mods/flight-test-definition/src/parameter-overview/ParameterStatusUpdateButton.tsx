import { Icon } from "@volocopter/design-library-react";
import type { TestPointParameter } from "@voloiq/flight-test-definition-api/v1";
import { useEditParameter } from "@voloiq/flight-test-definition-api/v1";
import { ResourceOverview } from "@voloiq/resource-overview";
import { useParameterOverviewTranslation } from "./translations/useParameterOverviewTranslation";

export type ParameterStatusUpdateButtonProps = { parameter: TestPointParameter; reloadOverview: () => void };
export const ParameterStatusUpdateButton = (props: ParameterStatusUpdateButtonProps) => {
    const { parameter, reloadOverview } = props;
    const { id, isActive } = parameter;
    const { t } = useParameterOverviewTranslation();
    const { editParameter } = useEditParameter(id);
    return (
        <ResourceOverview.PreviewActionButton
            onClick={async () => {
                await editParameter({ data: { isActive: !isActive } });
                reloadOverview();
            }}
            variant="ghost"
            icon={<Icon icon="exchange" />}
        >
            {isActive ? t("SetInactive") : t("SetActive")}
        </ResourceOverview.PreviewActionButton>
    );
};
