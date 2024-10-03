import type { Esu } from "@voloiq-typescript-api/battery-management-types";
import { ResourceListLayout } from "../../components";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { EsuListItem } from "./EsuListItem";

export type EsuListProps = {
    esus: Esu[];
};

export const EsuList = (props: EsuListProps) => {
    const { esus } = props;
    const { t } = useResourcesTranslation();

    return (
        <ResourceListLayout ariaLabel={t("esu.overview.listLabel")}>
            {esus.map((esu: Esu) => (
                <EsuListItem key={esu.id} esu={esu} />
            ))}
        </ResourceListLayout>
    );
};
