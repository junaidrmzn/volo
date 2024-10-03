import { useGetChargingProfile } from "../../api-hooks/useChargingProfileService";
import { ServiceStateBoundary } from "../../components";
import { ChargingProfilePreviewContent } from "./ChargingProfilePreviewContent";

export type ChargingProfilePreviewProps = {
    chargingProfileId: string;
    refetch: () => void;
};

export const ChargingProfilePreview = (props: ChargingProfilePreviewProps) => {
    const { chargingProfileId, refetch } = props;
    const { data: chargingProfile, error, state } = useGetChargingProfile(chargingProfileId);

    return (
        <ServiceStateBoundary state={state} error={error}>
            <ChargingProfilePreviewContent chargingProfile={chargingProfile} refetch={refetch} />
        </ServiceStateBoundary>
    );
};
