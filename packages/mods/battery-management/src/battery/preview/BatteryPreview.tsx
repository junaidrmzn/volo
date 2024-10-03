import { useGetBattery } from "../../api-hooks/useBatteryService";
import { ServiceStateBoundary } from "../../components";
import { BatteryPreviewContent } from "./BatteryPreviewContent";

export type BatteryDetailsProps = {
    batteryId: string;
    refetch: () => void;
};

export const BatteryDetails = (props: BatteryDetailsProps) => {
    const { batteryId, refetch } = props;
    const { data: battery, error, state } = useGetBattery(batteryId);

    return (
        <ServiceStateBoundary state={state} error={error}>
            {battery && <BatteryPreviewContent battery={battery} refetch={refetch} />}
        </ServiceStateBoundary>
    );
};
