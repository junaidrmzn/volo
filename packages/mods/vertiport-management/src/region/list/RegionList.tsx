import React from "react";
import type { Region } from "@voloiq/vertiport-management-api/v1";
import { ResourceListLayout } from "../../components";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";
import { RegionListItem } from "./RegionListItem";

export type RegionListProps = {
    regions: Region[];
};

export const RegionList = (props: RegionListProps) => {
    const { regions } = props;
    const { t } = useVertiportTranslation();

    return (
        <ResourceListLayout ariaLabel={t("region.overview.listLabel")}>
            {regions.map((region: Region) => (
                <RegionListItem key={region.id} region={region} />
            ))}
        </ResourceListLayout>
    );
};
