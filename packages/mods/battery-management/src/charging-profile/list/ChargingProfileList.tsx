import type { ChargingProfile } from "@voloiq-typescript-api/battery-management-types";
import { ResourceListLayout } from "../../components";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { ChargingProfileListItem } from "./ChargingProfileListItem";

export type ChargingProfilesListProps = {
    chargingProfiles: ChargingProfile[];
};

export const ChargingProfileList = (props: ChargingProfilesListProps) => {
    const { chargingProfiles } = props;
    const { t } = useResourcesTranslation();

    return (
        <ResourceListLayout ariaLabel={t("charging-profile.overview.listLabel")}>
            {chargingProfiles.map((chargingProfile: ChargingProfile) => (
                <ChargingProfileListItem key={chargingProfile.id} chargingProfile={chargingProfile} />
            ))}
        </ResourceListLayout>
    );
};
