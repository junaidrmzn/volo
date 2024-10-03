import { HStack } from "@volocopter/design-library-react";
import type { CrewMember } from "@voloiq-typescript-api/network-scheduling-types";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useMissionTranslations } from "../../translations/useMissionTranslations";

type PilotRowLabelType = {
    pilotData: CrewMember;
};
export const PilotRowLabel = (props: PilotRowLabelType) => {
    const { pilotData } = props;
    const { t } = useMissionTranslations();

    return (
        <HStack
            boxSize="full"
            justifyContent="space-between"
            p={4}
            columnGap={2}
            spacing={0}
            alignItems="flex-start"
            aria-label={t("pilot")}
        >
            <TextWithLabel label={t("pilot")} text={`${pilotData.firstName} ${pilotData.surName}`} />
        </HStack>
    );
};
