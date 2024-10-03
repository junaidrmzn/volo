import { useIdSelectionContext } from "../hooks";
import { BatteryDetails } from "./preview/BatteryPreview";

type BatteryMenuContentProps = {
    refetch: () => void;
};

export const BatteryMenuContent = (props: BatteryMenuContentProps) => {
    const { selectedId } = useIdSelectionContext();
    const { refetch } = props;

    return selectedId ? <BatteryDetails batteryId={selectedId} refetch={refetch} /> : null;
};
