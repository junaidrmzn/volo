import { useIdSelectionContext } from "../hooks";
import { ChargingProfilePreview } from "./preview/ChargingProfilePreview";

type ChargingProfileMenuContentProps = {
    refetch: () => void;
};

export const ChargingProfileMenuContent = (props: ChargingProfileMenuContentProps) => {
    const { selectedId } = useIdSelectionContext();
    const { refetch } = props;

    return selectedId ? <ChargingProfilePreview chargingProfileId={selectedId} refetch={refetch} /> : null;
};
