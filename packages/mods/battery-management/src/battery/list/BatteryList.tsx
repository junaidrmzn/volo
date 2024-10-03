import type { Battery } from "@voloiq-typescript-api/battery-management-types";
import { ResourceListLayout } from "../../components";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { BatteryListItem } from "./BatteryListItem";

export type BatteryListProps = {
    batteries: Battery[];
};

export const BatteryList = (props: BatteryListProps) => {
    const { batteries } = props;
    const { t } = useResourcesTranslation();

    return (
        <ResourceListLayout ariaLabel={t("battery.overview.listLabel")}>
            {batteries.map((battery: Battery) => (
                <BatteryListItem key={battery.id} battery={battery} />
            ))}
        </ResourceListLayout>
    );
};
