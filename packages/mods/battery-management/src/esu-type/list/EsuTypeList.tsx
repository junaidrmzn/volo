import type { EsuType } from "@voloiq-typescript-api/battery-management-types";
import { ResourceListLayout } from "../../components";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { EsuTypeListItem } from "./EsuTypeListItem";

export type EsuTypeListProps = {
    esuTypes: EsuType[];
};

export const EsuTypeList = (props: EsuTypeListProps) => {
    const { esuTypes } = props;
    const { t } = useResourcesTranslation();

    return (
        <ResourceListLayout ariaLabel={t("esu-type.overview.listLabel")}>
            {esuTypes.map((esuType: EsuType) => (
                <EsuTypeListItem key={esuType.id} esuType={esuType} />
            ))}
        </ResourceListLayout>
    );
};
