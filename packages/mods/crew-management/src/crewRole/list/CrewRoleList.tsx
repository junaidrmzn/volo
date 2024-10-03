import type { CrewRole } from "@voloiq-typescript-api/crew-api-types";
import React from "react";
import { ResourceListLayout } from "../../components";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";
import { CrewRoleListItem } from "./CrewRoleListItem";

export type CrewRoleListProps = {
    crewRoles: CrewRole[];
};

export const CrewRoleList = (props: CrewRoleListProps) => {
    const { crewRoles } = props;
    const { t } = useCrewApiTranslation();

    return (
        <ResourceListLayout ariaLabel={t("crewRole.overview.listLabel")}>
            {crewRoles.map((crewRole: CrewRole) => (
                <CrewRoleListItem key={crewRole.id} crewRole={crewRole} />
            ))}
        </ResourceListLayout>
    );
};
