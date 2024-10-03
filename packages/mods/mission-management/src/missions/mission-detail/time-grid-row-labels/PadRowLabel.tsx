import { HStack } from "@volocopter/design-library-react";
import type { Pad } from "@voloiq-typescript-api/network-scheduling-types";
import { match } from "ts-pattern";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useMissionTranslations } from "../../translations/useMissionTranslations";

type FatoRowLabelType = {
    padData: Pad;
    missionAssignmentKey: string;
};

type MissionAssignmentPadKeyType = "arrivalFato" | "arrivalStand" | "departureStand" | "departureFato";

export const PadRowLabel = (props: FatoRowLabelType) => {
    const { padData, missionAssignmentKey } = props;
    const { t } = useMissionTranslations();

    const getLabelTranslationKey = (message: MissionAssignmentPadKeyType) => {
        return match(message)
            .with("arrivalFato", () => t("arrivalFato"))
            .with("arrivalStand", () => t("arrivalStand"))
            .with("departureStand", () => t("departureStand"))
            .with("departureFato", () => t("departureFato"))
            .exhaustive();
    };

    const label = getLabelTranslationKey(missionAssignmentKey as MissionAssignmentPadKeyType);
    return (
        <HStack boxSize="full" justifyContent="space-between" p={4} columnGap={2} spacing={0} alignItems="flex-start">
            <TextWithLabel label={label} text={`${padData.padKey}`} />
        </HStack>
    );
};
