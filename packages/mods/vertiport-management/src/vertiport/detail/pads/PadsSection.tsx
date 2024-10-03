import { Button, VStack, useDisclosure } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { SectionHeader } from "@voloiq/text-layouts";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../translations/useVertiportTranslation";
import { AddPadModal } from "./add-pad/AddPadModal";
import { PadsCardList } from "./pad-card-list/PadsCardList";
import { PadTimeScheduler } from "./pad-time-scheduler/PadTimeScheduler";
import { PadTimeSchedulerOld } from "./pad-time-scheduler/PadTimeSchedulerOld";
import { usePads } from "./pads-context/usePads";

type PadsSectionProps = {
    vertiport: Vertiport;
};

export const PadsSection = (props: PadsSectionProps) => {
    const { vertiport } = props;
    const { pads, onRangeUpdate } = usePads();
    const { t } = useVertiportTranslation();
    const { onClose, isOpen, onOpen } = useDisclosure();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <>
            <VStack spacing={3} alignItems="stretch">
                <SectionHeader label={t("fatoStand.heading _name_", { name: vertiport.name })} m={2}>
                    <Button variant="ghost" onClick={() => onOpen()}>
                        {t("buttons.addFatoStand")}
                    </Button>
                </SectionHeader>
                {isFeatureFlagEnabled("vao-1889-timegrid-2.0") ? (
                    <PadTimeScheduler pads={pads} onRangeUpdate={onRangeUpdate} />
                ) : (
                    <PadTimeSchedulerOld pads={pads} />
                )}
                <PadsCardList pads={pads} vertiport={vertiport} />
            </VStack>
            <AddPadModal vertiport={vertiport} onClose={onClose} isOpen={isOpen} />
        </>
    );
};
