import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { ArrivalPadActionButtons } from "./ArrivalPadActionButtons";
import { DeparturePadActionButtons } from "./DeparturePadActionButtons";

export type PadActionButtonsProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const PadActionButtons = (props: PadActionButtonsProps) => {
    return (
        <>
            <DeparturePadActionButtons {...props} />
            <ArrivalPadActionButtons {...props} />
        </>
    );
};
