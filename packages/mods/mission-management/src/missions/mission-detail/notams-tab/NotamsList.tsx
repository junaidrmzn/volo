import { VStack } from "@volocopter/design-library-react";
import type { Notam } from "@voloiq/network-schedule-management-api/v1";
import { IconCard, InfoCard } from "@voloiq/network-scheduling-components";
import { NotamsListItem } from "./NotamsListItem";
import { useNotamsTabTranslation } from "./translations/useNotamsTabTranslation";

type NotamsListProps = {
    notam?: Notam;
    getHeading: (numberOfRoutes: number) => string;
};

export const NotamsList = (props: NotamsListProps) => {
    const { notam, getHeading } = props;
    const { t } = useNotamsTabTranslation();

    if (!notam || notam.features.length === 0)
        return (
            <IconCard
                label={t("No NOTAMs found")}
                helpText={t("Sorry, we couldn't find any NOTAMs for this mission")}
            />
        );

    return (
        <VStack alignItems="stretch">
            <InfoCard
                headerLabel={getHeading(notam.features.length)}
                tagLabel={t("limitations")}
                tagType="warning"
                actions={null}
                bodyContent={<NotamsListItem notam={notam} />}
            />
        </VStack>
    );
};
