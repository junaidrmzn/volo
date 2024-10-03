import { HStack } from "@volocopter/design-library-react";
import type { CrewMember } from "@voloiq-typescript-api/network-scheduling-types";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useMissionTranslations } from "../../translations/useMissionTranslations";

type CrewRowLabelType = {
    crewData: CrewMember;
};
export const CrewRowLabel = (props: CrewRowLabelType) => {
    const { crewData } = props;
    const { t } = useMissionTranslations();

    return (
        <HStack
            boxSize="full"
            justifyContent="space-between"
            p={4}
            columnGap={2}
            spacing={0}
            alignItems="flex-start"
            aria-label={t("crewMember")}
        >
            <TextWithLabel label={t("crewMember")} text={`${crewData.firstName} ${crewData.surName}`} />
        </HStack>
    );
};
